<template>
  <div class="game-over-screen">
    <h1>Game Over</h1>
    <p>Your final score is: {{ this.$route.params.finalScore }}</p>
    <button @click="restartGame">Play Again</button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    restartGame() {
      // Logic to restart the game goes here
    },
  },
};
</script>
