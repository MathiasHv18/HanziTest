<template>
  <div class="flashCard">
    <div v-if="hskData.length > 0">
      <p>{{ hskData[currentIndex].simplified }}</p>
      <p v-if="showDefinition == true">{{ hskData[currentIndex].english }}</p>
      <button @click="toggleDefinition">Show definition</button>
      <button @click="nextCard">Next</button>
    </div>
  </div>
</template>

<script>
import HSK from "../json/HSK1.json";

export default {
  data() {
    return {
      hskData: HSK,
      currentIndex: 0,
      showDefinition: false,
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
  },
};
</script>
