<template>
  <div class="game">
    <div class="flashCard">
      <div v-if="hskData.length > 0">
        <p>{{ hskData[currentIndex].simplified }}</p>
        <p v-if="showDefinition == true">{{ hskData[currentIndex].english }}</p>
        <p v-else>&nbsp</p>
        <p v-if="showPinyin == true">{{ hskData[currentIndex].pinyin }}</p>
        <p v-else>&nbsp</p>
        <button
          class="showDefinition"
          @click="toggleDefinition"
          v-bind:class="{
            'button-green': showDefinition,
            'button-red': !showDefinition,
          }"
        >
          Show definition
        </button>
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
    <button class="optionButton" v-for="(option, index) in options" :key="index">
      {{ option }}
    </button>
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
    };
  },
  created() {
    this.setOptions();
  },
  methods: {
    Submit() {
      if (this.currentIndex < this.hskData.length - 1) {
        this.currentIndex++;
      } else {
        this.currentIndex = 0;
      }
    },
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

    handleSubmit(){
      this.Submit();
      this.setOptions();
    }
  },
};
</script>
