<template>
  <div class="Home">
    <div class="leftSide">
      <h1>欢迎我的汉字测试</h1>
      <p>Welcome to my hanzi test!</p>
      <button @click="handleClick">开始</button>
    </div>
    <div class="rightSide">
      <div class="HSKInfo">
        <h1 class="HSKTittle">What is HSK?</h1>
        <p>
          The Hanyu Shuiping Kaoshi (HSK) is the official standardized test of
          Standard Chinese language proficiency for non-native speakers.
        </p>
      </div>
      <div class="Instructions">
        <h1 class="instructionsGame">Instructions of the game:</h1>
        <p>
          You will be given a random Chinese word and you will have to choose,
          from the sentences given, the one where the word is correctly used. 16
          seconds will be given to answer each question.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import "../styles/Home.css";
export default {
  name: "Home",
  methods: {
    handleClick() {
      //this.$router.push("/chooseHSK");
      this.$router.push("/FlashCardsGame");
      console.log("Start app!");
    },
  },
};
</script>
