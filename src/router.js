import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/Home.vue";
import chooseHSK from "./components/chooseHSK.vue";
import flashCardsGame from "./components/flashCardsGame.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/chooseHSK", component: chooseHSK },
  { path: "/flashCardsGame", component: flashCardsGame },
];

const router = createRouter({ history: createWebHistory(), routes });

export default router;
