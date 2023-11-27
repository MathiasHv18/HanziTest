<template>
  <div class="game">
    <div class="flashCard">
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
        <button class="Submit" @click="handleSubmit">Submit</button>
      </div>
    </div>
    <div class="options">
      <button
        class="optionButton"
        @click="handleSubmit(index)"
        v-for="(option, index) in options"
        :key="index"
      >
        {{ option }}
      </button>
    </div>
  </div>
</template>

<script>
import "../styles/flashCards.css";
import HSK from "../json/HSK1.json";

export default {
  data() {
    return {
      hskData: HSK,
      currentIndex: 0,
      showDefinition: true,
      showPinyin: true,
      options: [],
      usedIndices: [],
    };
  },
  created() {
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

    handleSubmit(selectedIndex) {
      const correctIndex = this.options.indexOf(
        this.hskData[this.currentIndex].english
      );
      if (selectedIndex === correctIndex) {
        console.log("Correct answer!");
      } else {
        console.log("Incorrect answer!");
      }
      this.currentIndex = Math.floor(Math.random() * this.hskData.length);
      while (this.usedIndices.includes(this.currentIndex)) {
        this.currentIndex = Math.floor(Math.random() * this.hskData.length);
      }
      this.usedIndices.push(this.currentIndex);
      this.setOptions();
    },
  },
};
</script>
