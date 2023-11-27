<template>
  <div class="flashCard">
    <div v-if="hskData.length > 0">
      <p>{{ hskData[currentIndex].simplified }}</p>
      <p v-if="showDefinition == true">{{ hskData[currentIndex].english }}</p>
      <p v-else>&nbsp</p>
      <p v-if="showPinyin == true">{{ hskData[currentIndex].pinyin }}</p>
      <p v-else>&nbsp</p>
      <button class="showDefinition" @click="toggleDefinition">
        Show definition
      </button>
      <button class="showPinyin" @click="togglePinyin">Show pinyin</button>
      <button class="nextCard" @click="nextCard">Next</button>
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
      showDefinition: false,
      showPinyin: false,
    };
  },
  methods: {
    nextCard() {
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
  },
};
</script>
