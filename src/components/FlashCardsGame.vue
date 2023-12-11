<template>
  <div class="game">
    <div class="flashCard">
      <div class="header">
        <button @click="goBack" class="goBack">Go back</button>
        <span>{{ usedIndices.length }}/{{ hskData.length }}</span>
      </div>
      <div class="Info">
        <div class="displayScore">Score: {{ score }}</div>
        <div class="displayTime">Time left: {{ timeRemaining }}</div>
      </div>
      <div class="triesLeft">
        <img
          class="heartIMG"
          src="../assets/heartMC.png"
          alt="triesLeft"
          v-for="(heart, index) in heartsLeft"
        />
      </div>
      <div v-if="hskData.length > 0">
        <p>{{ hskData[currentIndex].simplified }}</p>
      </div>
      <div class="bottomFlashCard">
        <button class="skip-button" @click="skipWord">Skip</button>
        <p v-if="showPinyin == true">{{ hskData[currentIndex].pinyin }}</p>
        <p v-else>&nbsp</p>
        <button
          class="showPinyin"
          @click="togglePinyin"
          v-bind:class="{
            'button-green': showPinyin,
            'button-red': !showPinyin,
          }"
        >
          Show pinyin
        </button>
      </div>
    </div>
    <div class="options">
      <button
        class="optionButton"
        @click="handleSubmit(index)"
        v-for="(option, index) in options"
        :key="index"
        :style="{
          backgroundColor:
            selectedIndex === index && selectedIndex !== correctIndex
              ? 'red'
              : '',
        }"
      >
        {{ option }}
      </button>
    </div>
  </div>
</template>

<script>
import HSK1 from "../json/HSK1.json";
import HSK2 from "../json/HSK2.json";
import HSK3 from "../json/HSK3.json";
import HSK4 from "../json/HSK4.json";
import HSK5 from "../json/HSK5.json";
import HSK6 from "../json/HSK6.json";

export default {
  data() {
    return {
      hskData: null,
      showDefinition: false,
      showPinyin: false,
      currentIndex: 0,
      selectedIndex: null,
      correctIndex: null,
      options: [],
      usedIndices: [],
      heartsLeft: [1, 2, 3, 4],
      score: 0,
      timeRemaining: 0,
    };
  },
  watch: {
    $route() {
      if (this.timer) {
        clearInterval(this.timer);
      }
    },
  },
  beforeRouteLeave(to, from, next) {
    if (this.timer) {
      clearInterval(this.timer);
    }
    next();
  },

  created() {
    const hsk = this.$route.params.hsk;
    if (hsk === "1") {
      this.hskData = HSK1;
    } else if (hsk === "2") {
      this.hskData = HSK2;
    } else if (hsk === "3") {
      this.hskData = HSK3;
    } else if (hsk === "4") {
      this.hskData = HSK4;
    } else if (hsk === "5") {
      this.hskData = HSK5;
    } else if (hsk === "6") {
      this.hskData = HSK6;
    }
    this.currentIndex = Math.floor(Math.random() * this.hskData.length);
    this.setOptions();
  },
  methods: {
    toggleDefinition() {
      this.showDefinition = !this.showDefinition;
    },

    togglePinyin() {
      this.showPinyin = !this.showPinyin;
    },

    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    },

    setOptions() {
      const randomIncorrectAnswers = [];
      const correctAnswer = this.hskData[this.currentIndex].english;
      const incorrectAnswers = this.hskData
        .filter((item) => item.english !== correctAnswer)
        .map((item) => item.english);
      for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * incorrectAnswers.length);
        randomIncorrectAnswers.push(incorrectAnswers[randomIndex]);
        incorrectAnswers.splice(randomIndex, 1);
      }
      this.options = [...randomIncorrectAnswers, correctAnswer];
      this.options = this.shuffleArray(this.options);
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(this.skipWord, this.getTimeout(this.difficulty));
      this.startTimer();
    },

    detectGameOver() {
      if (this.heartsLeft.length === 0) {
        this.$router.push({
          name: "FinalScoreGame",
          params: { finalScore: this.score },
        });
        console.log("Game over!");
      } else if (this.usedIndices.length === this.hskData.length) {
        this.$router.push({
          name: "FinalScoreGame",
          params: { finalScore: this.score },
        });
        console.log("WIN!");
      }
    },

    isCorrect(selectedIndex) {
      this.selectedIndex = selectedIndex;
      this.correctIndex = this.options.indexOf(
        this.hskData[this.currentIndex].english
      );
      if (this.selectedIndex === this.correctIndex) {
        this.score = this.score + 20;
        this.detectGameOver();
        return true;
      } else {
        this.heartsLeft.pop();
        this.detectGameOver();
      }
    },

    handleSubmit(selectedIndex) {
      if (this.isCorrect(selectedIndex)) {
        console.log("Correct answer!");
        this.currentIndex = Math.floor(Math.random() * this.hskData.length);
        while (this.usedIndices.includes(this.currentIndex)) {
          this.currentIndex = Math.floor(Math.random() * this.hskData.length);
        }
        this.usedIndices.push(this.currentIndex);
        this.setOptions();
      } else {
        console.log("Incorrect answer!");
      }
      if (this.timer) {
        clearInterval(this.timer);
      }
      this.startTimer();
    },

    skipWord() {
      if (this.usedIndices.length === this.hskData.length) {
        this.detectGameOver();
      } else {
        this.currentIndex = Math.floor(Math.random() * this.hskData.length);
        while (this.usedIndices.includes(this.currentIndex)) {
          this.currentIndex = Math.floor(Math.random() * this.hskData.length);
        }
        this.usedIndices.push(this.currentIndex);
        this.setOptions();
      }
      if (this.timer) {
        clearInterval(this.timer);
      }
      this.startTimer();
    },

    goBack() {
      this.$router.push("/chooseHSK");
    },

    getTimeout() {
      switch (this.$route.params.difficulty) {
        case "Easy":
          return 8000;
        case "Normal":
          return 5000;
        case "Hard":
          return 3000;
        default:
          return 13000;
      }
    },
    startTimer() {
      if (this.timer) {
        clearInterval(this.timer);
      }
      this.timeRemaining = this.getTimeout() / 1000;
      this.timer = setInterval(() => {
        this.timeRemaining--;
        if (this.timeRemaining <= -19000) {
          this.heartsLeft.pop();
          this.detectGameOver();
          this.skipWord();
        }
      }, 1000);
    },
  },
};
</script>

<style scoped>
.flashCard {
  font-size: 23px;
  font-family: "Noto Serif SC", serif;
  background-color: #2f4f4f;
  border: 1px solid #ccc;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 80%;
  width: 100%;
  position: relative; /* Change this from fixed to relative */
}

.game {
  display: flex;
  justify-content: space-between; /* This will place items at the beginning and end of the container */
  align-items: center; /* This will center items vertically */
  height: 100vh;
  padding: 0 2%; /* Add horizontal padding to prevent items from touching the edges */
}
.options {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  height: 50%;
}

.optionButton {
  margin: 0px;
  width: 40%; /* This will make the buttons take up approximately half the width of .options, allowing for two buttons per row. Adjust as needed. */
  height: 25%;
  background-color: #134b15; /* Green background */
  border: none; /* No border */
  color: rgb(255, 251, 251); /* White text */
  text-align: center; /* Centered text */
  font-size: 30px;
  cursor: pointer; /* Pointer/hand icon */
  border-radius: 12px; /* Rounded corners */
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2); /* 3D effect */
  transition-duration: 0.4s; /* Transition effects */
}

.bottomFlashCard {
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
}
.bottomFlashCard > p {
  text-align: center;
}

.displayScore,
.displayInfo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100%;
}
.Info {
  display: flex;
  justify-content: space-between;
  gap: 40px;
  margin: 20px;
}
.goBack,
.showDefinition,
.showPinyin,
.Submit {
  background-color: rgb(175, 9, 17); /* Green background */
  border: none; /* No border */
  color: white; /* White text */
  text-align: center; /* Centered text */
  text-decoration: none; /* No underline */
  font-size: 20px;
  margin: 4px;
  cursor: pointer; /* Pointer/hand icon */
  border-radius: 12px; /* Rounded corners */
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2); /* 3D effect */
  transition-duration: 0.4s; /* Transition effects */
  height: 50px;
  width: 130px;
  vertical-align: middle; /* Align buttons vertically */
}

.goBack {
  float: left;
  display: inline-block;
}
.header {
  width: 100%;
  text-align: right;
}
.flashCard p:first-child {
  font-size: 8em;
  margin-bottom: auto;
}

.showDefinition:hover,
.Submit:hover,
.showPinyin:hover {
  background-color: #45a049; /* Darker green when mouse hovers over */
}
.button-green {
  background-color: green;
}

.button-red {
  background-color: red;
  color: black;
}
.heartIMG {
  height: 30px;
}

.triesLeft {
  margin: 0px;
  padding: 0px;
}
.options-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.option {
  flex: 1 0 200px; /* Ajusta este valor según tus necesidades */
  margin: 10px;
}
@media (max-width: 900px) {
  .game {
    flex-direction: column;
    height: 100%;
    font-size: 15px;
  }
  .flashCard {
    margin-top: 5px;
    height: 60%;
    width: 100%;
    font-size: 10px;
  }
  .options {
    height: 40%;
    width: 100%;
    font-size: 30px;
  }
  .options button {
    height: 20%;
    font-size: 20px; /* Ajusta este valor según tus necesidades */
  }
}
</style>
