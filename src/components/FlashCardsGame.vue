<template>
  <div class="game">
    <div class="flashCard">
      <div class="displayScore">{{ score }}</div>
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
import "../styles/flashCards.css";
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
      heartsLeft: [1, 2, 3],
      score: 0,
    };
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
    },

    detectGameOver() {
      if (this.heartsLeft.length === 0) {
        this.$router.push({
          name: "finalScoreGame",
          params: { finalScore: this.score },
        });
        console.log("Game over!");
        return true;
      }
    },

    isCorrect(selectedIndex) {
      this.selectedIndex = selectedIndex;
      this.correctIndex = this.options.indexOf(
        this.hskData[this.currentIndex].english
      );

      if (this.selectedIndex === this.correctIndex) {
        this.score = this.score + 20;
        return true;
      } else {
        this.heartsLeft.pop();
        this.detectGameOver();

        return false;
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
    },
  },
};
</script>
