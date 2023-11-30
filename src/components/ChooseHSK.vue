<template>
  <div class="container">
    <button @click="goBack" class="goBack">Go back</button>
    <h1>Choose your HSK level!</h1>
    <div class="button-container">
      <button class="HSK1" @click="getHSK(1)">HSK1</button>
      <button class="HSK2" @click="getHSK(2)">HSK2</button>
      <button class="HSK3" @click="getHSK(3)">HSK3</button>
      <button class="HSK4" @click="getHSK(4)">HSK4</button>
      <button class="HSK5" @click="getHSK(5)">HSK5</button>
      <button class="HSK6" @click="getHSK(6)">HSK6</button>
    </div>
  </div>
</template>

<script>
import "../styles/chooseHSK.css";
export default {
  data() {
    return {
      dificullty: "0",
      finalHSK: "",
    };
  },
  name: "ChooseHSK",
  methods: {
    goBack() {
      this.$router.push("/");
    },
    getHSK(hsk) {
      this.finalHSK = hsk;
      console.log(this.finalHSK);
      this.$router.push({
        name: "FlashCardsGame",
        params: { hsk: this.finalHSK },
      });
    },
  },
};
</script>

<style scoped>
button:hover {
  
  transform: scale(1.1);
}
</style>
