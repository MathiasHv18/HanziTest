<template>
  <div class="game-over-screen">
    <h1>Game Over</h1>
    <p>Your final score is: {{ this.$route.params.finalScore }}</p>
    <button @click="homePage">Go to home page</button>
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
