<template>
  <div class="game-over-screen">
    <h1>Game Over</h1>
    <p>Your final score is: {{ this.$route.params.finalScore }}</p>
    <button @click="homePage">Home page</button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    homePage() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.game-over-screen {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.game-over-screen h1 {
  font-size: 3.5em; /* Adjust this value as needed */
}

.game-over-screen p {
  font-size: 2.5em; /* Adjust this value as needed */
}

button {
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  margin: 10px;
  padding: 20px;
  border: none;
  border-radius: 5px;
  background-color: #3f0606;
  color: #fff;
  font-size: 1.2em;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #7c3014;
}
</style>
