<template>
  <div class="Home">
    <div class="leftSide">
      <div class="textContainerLeft">
        <h1>欢迎我的汉字测试</h1>
        <p>Welcome to my hanzi test!</p>
      </div>
      <button class="startButton" @click="handleClick">{{ message }}</button>
    </div>
    <div class="rightSide">
      <div class="textContainerRight">
        <div class="HSKInfo">
          <h1 class="HSKTittle">What is HSK?</h1>
          <p>
            The Hanyu Shuiping Kaoshi (HSK) is the official standardized test of
            Standard Chinese language proficiency for non-native speakers.
          </p>
        </div>
        <div class="Instructions">
          <h1 class="instructionsGame">Instructions of the game:</h1>
          <p>
            You will be given a random Chinese word and you will have to choose,
            from the words given, the correct one. The duration you have will
            depend on the difficulty you choose.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      message: "开始",
    };
  },
  mounted() {
    setInterval(() => {
      this.message = this.message === "开始" ? "Start" : "开始";
    }, 1000);
  },
  methods: {
    handleClick() {
      this.$router.push("/chooseHSK");
      //this.$router.push("/FlashCardsGame");
      console.log("Start app!");
    },
  },
};
</script>

<style scoped>
.leftSide {
  background: url("../assets/leftSide2.jpg");
  -webkit-background-size: 100% 100%;
  -moz-background-size: 100% 100%;
  -o-background-size: 100% 100%;
  background-size: 100% 100%;
  color: #fff; /* Change this to the color you want for your text */
  width: 100%; /* Set the width to 50% of the screen */
  height: 100%;
}

.rightSide {
  background: url("../assets/rightSide.jpg");
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  color: #fff;
  width: 50%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
  background-color: #000;
}

h1 {
  font-size: 3.2em;
  line-height: 1.1;
  margin: 0px;
}

p {
  font-size: 1.2em;
  margin: 0;
}

.Home {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  width: 100%; /* Take up the full width */
  height: 100vh; /* Set the height to 100% of the viewport height */
}

.leftSide,
.rightSide {
  margin: 0;
  padding: 0;
  width: 50%;
  height: 100vh;
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  flex-direction: column;

  .textContainerLeft {
    padding: 20px;
    border: 2px solid #fff;
    border-radius: 10px;
    background-color: rgb(0, 0, 0);
    text-align: center;
    transition: all 0.5s ease;
  }

  .textContainerLeft:hover {
    box-shadow: 0px 0px 30px 0px rgba(255, 255, 255, 0.75);
  }

  .textContainerRight {
    width: auto; /* Ajusta esto según tus necesidades */
    word-wrap: break-word;
    overflow: auto;
    padding: 20px;
    border: 2px solid #fff;
    border-radius: 10px;
    background-color: rgb(0, 0, 0);
    text-align: center;
    transition: all 0.5s ease;
    box-shadow: 0px 0px 15px 0px rgba(255, 255, 255, 0.75);
  }

  .startButton {
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

  .startButton:hover {
    background-color: #7c3014;
  }

  .textContainerLeft,
  .textContainerRight {
    width: 50%;
  }

  @media screen and (max-width: 900px) {
    .textContainerLeft h1,
    .textContainerRight h1 {
      font-size: 1.2em;
      line-height: 1.1;
      margin: 0px;
    }
    .textContainerLeft,
    .textContainerRight {
      width: 90%;
    }

    .textContainerLeft p,
    .textContainerRight p {
      font-size: 0.9em;
      margin: 0;
    }
  }
}
</style>
