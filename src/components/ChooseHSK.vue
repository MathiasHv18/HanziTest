<template>
  <div>
    <button @click="goBack">Go back</button>
    <h1>Choose your HSK level!</h1>
    <div class="button-container">
      <button class="HSK1">HSK1</button>
      <button class="HSK2">HSK2</button>
      <button class="HSK3">HSK3</button>
      <button class="HSK4">HSK4</button>
      <button class="HSK5">HSK5</button>
      <button class="HSK6">HSK6</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChooseHSK",
  methods: {
    goBack() {
      this.$router.push("/");
    },
  },
};
</script>
