<template>
  <div class="container">
    <button @click="goBack" class="goBack">Go back</button>
    <div class="difficulty-selector">
      <button @click="decreaseDifficulty">←</button>
      <div>{{ difficulty }}</div>
      <button @click="increaseDifficulty">→</button>
    </div>
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
export default {
  data() {
    return {
      dificullty: "0",
      finalHSK: "",
      difficulty: "Normal",
      difficulties: ["Easy", "Normal", "Hard"],
    };
  },
  name: "ChooseHSK",
  methods: {
    goBack() {
      this.$router.push("/");
    },
    decreaseDifficulty() {
      const index = this.difficulties.indexOf(this.difficulty);
      if (index > 0) {
        this.difficulty = this.difficulties[index - 1];
      }
    },
    increaseDifficulty() {
      const index = this.difficulties.indexOf(this.difficulty);
      if (index < this.difficulties.length - 1) {
        this.difficulty = this.difficulties[index + 1];
      }
    },
    getHSK(hsk) {
      this.finalHSK = hsk;
      console.log(this.finalHSK);
      this.$router.push({
        name: "FlashCardsGame",
        params: { hsk: this.finalHSK, difficulty: this.difficulty },
      });
    },
  },
};
</script>

<style scoped>
.difficulty-selector {
  display: flex;
  justify-content: center;
  align-items: center;
}

.difficulty-selector button {
  margin: 0 10px; /* Add horizontal margin */
}
.container {
  background-color: #2c3e50; /* Dark blue like a chalkboard */
  padding: 40px; /* Increased padding */
  border-radius: 10px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.19), 0px 6px 6px rgba(0, 0, 0, 0.23);
  max-width: 800px; /* Increased max-width */
  margin: 0 auto; /* Changed margin to 0 auto */
  color: rgb(0, 0, 0); /* Light color for text */
  position: absolute; /* Changed from relative to absolute */
  top: 50%; /* Center vertically */
  left: 50%; /* Center horizontally */
  transform: translate(-50%, -50%); /* Correct the position */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 35vh;
}

.button-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 20px;
}

.button-container button {
  flex: 1 0 30%;
  padding: 10px 20px;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  background-color: #000000; /* Blue */
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.button-container button:hover {
  background-color: #2980b9; /* Darker blue */
}

h1 {
  margin: 10px;
  text-align: center;
}

.goBack {
  position: absolute;
  top: 20px;
  left: 20px;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  background-color: rgb(219, 52, 52); /* Blue */
  color: white;
  cursor: pointer;
  transition: transform 0.3s ease;
}

button:hover {
  transform: scale(1.1);
}
</style>
