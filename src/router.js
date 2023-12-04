import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/Home.vue";
import chooseHSK from "./components/ChooseHSK.vue";
import flashCardsGame from "./components/FlashCardsGame.vue";
import finalScoreGame from "./FinalScoreGame.vue";
const routes = [
  { path: "/", component: Home },
  { path: "/chooseHSK", component: chooseHSK },
  {
    path: "/flashCardsGame/:hsk/:difficulty",
    name: "FlashCardsGame",
    component: flashCardsGame,
  },
  {
    path: "/finalScoreGame/:finalScore",
    name: "FinalScoreGame",
    component: finalScoreGame,
  },
];

const router = createRouter({ history: createWebHistory(), routes });

export default router;
