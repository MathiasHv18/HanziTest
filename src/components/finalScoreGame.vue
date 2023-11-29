<template>
  <div class="game-over-screen">
    <h1>Game Over</h1>
    <p>Your final score is: {{ finalScore }}</p>
    <button @click="restartGame">Play Again</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      finalScore: 0, // Replace this with the actual final score
    };
  },
  methods: {
    restartGame() {
      // Logic to restart the game goes here
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
  text-align: center;
}

h1 {
  font-size: 3em;
}

p {
  font-size: 2em;
}

button {
  padding: 1em 2em;
  font-size: 1em;
  margin-top: 2em;
}
</style>
