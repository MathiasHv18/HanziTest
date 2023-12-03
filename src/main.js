import { createApp } from "vue";
import { createStore } from "vuex";
import App from "./App.vue";
import router from "./router";
import "./style.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faArrowRight);

const store = createStore({
  state: {
    difficulty: "Normal", // Or whatever your default difficulty is
    // Other state properties...
  },
  // Mutations, actions, getters...
});

const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(router, store).mount("#app");

router.push("/");
