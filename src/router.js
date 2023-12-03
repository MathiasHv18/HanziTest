import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/Home.vue";
import chooseHSK from "./components/ChooseHSK.vue";
import flashCardsGame from "./components/FlashCardsGame.vue";
import finalScoreGame from "./components/FinalScoreGame.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/chooseHSK", component: chooseHSK },
  {
    path: "/flashCardsGame/:hsk/:difficulty",
    name: "FlashCardsGame",
    component: flashCardsGame,
  },
];

const router = createRouter({ history: createWebHistory(), routes });

export default router;
