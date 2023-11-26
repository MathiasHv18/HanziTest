<template>
  <div>
    <input type="text" v-model="inputValue" />
    <br />Developed by: {{ inputValue }}
  </div>
</template>

<script>
import { ref } from "vue";
let inputValue = ref("");

export default {
  data() {
    return {
      inputValue,
    };
  },
};
</script>
