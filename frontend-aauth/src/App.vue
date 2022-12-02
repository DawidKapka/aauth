<template>
  <div id="app">
    <div class="green-bg"></div>
    <div class="form-box shadow-3d-black-left">
      <router-view/>
    </div>
    <img src="./assets/logo-phone.svg" class="logo-phone shadow-3d-black-right"/>

  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import LoginComponent from "@/components/Login.vue";
import Vue from "vue";

@Component({
  components: {
    AaLogin: LoginComponent
  }
})
export default class AppComponent extends Vue {

}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #000000;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

body {
  margin: 0;
}

.form-box {
  width: 40em;
  min-height: 20em;
  background: #fafafa;
  position: absolute;
  margin: 50vh 0 0 calc(50vw - 189px);
  transform: translate(-50%, -50%) rotate3d(1, 1, 0, 20deg);
  border-radius: 20px;
  padding: 2em;
  animation: hover-left 4000ms infinite;
}

.green-bg {
  position: absolute;
  background: #8AEACE;
  height: 100vh;
  width: 50vw;
}

.logo-phone {
  positon: absolute;
  margin-top: 50vh;
  margin-left: 75vw;
  transform: translate(-50%, -50%) rotate3d(-1, 1, 0, 20deg);
  border-radius: 40px;
  animation: hover-right 4000ms infinite, slide-in-from-bottom 1000ms;
  transition: all 1000ms;
}

.shadow-3d-black-right {
  box-shadow: 1px 1px 1px #242424,
  2px 2px 1px #242424,
  3px 3px 1px #242424,
  4px 4px 1px #242424,
  5px 5px 1px #242424,
  6px 6px 1px #242424,
  7px 7px 1px #242424,
  8px 8px 1px #242424,
  9px 9px 1px #242424,
  10px 10px 1px #242424,
  10px 18px 6px rgba(16,16,16,0.4),
  10px 22px 10px rgba(16,16,16,0.2),
  10px 25px 35px rgba(16,16,16,0.2),
  10px 30px 60px rgba(16,16,16,0.4);
  }

.shadow-3d-black-left {
  box-shadow: -1px 1px 1px #242424,
  -2px 2px 1px #242424,
  -3px 3px 1px #242424,
  -4px 4px 1px #242424,
  -5px 5px 1px #242424,
  -6px 6px 1px #242424,
  -7px 7px 1px #242424,
  -8px 8px 1px #242424,
  -9px 9px 1px #242424,
  -10px 10px 1px #242424,
  -10px 18px 6px rgba(16,16,16,0.4),
  -10px 22px 10px rgba(16,16,16,0.2),
  -10px 25px 35px rgba(16,16,16,0.2),
  -10px 30px 60px rgba(16,16,16,0.4),
  inset 20px 20px 60px #fafafa,
  inset -20px -20px 60px #ffffff;;
}

@keyframes slide-in-from-bottom {
  0% {
    transform: translate(-50%, 0) rotate3d(0, 1, 0, 90deg);
    margin-top: 100vh;
  }

  100% {
    transform: translate(-50%, -50.5%) rotate3d(-1, 1, 0, 17deg);
    margin-top: 50vh;
  }
}

@keyframes hover-right {
  0% {
    transform: translate(-50%, -49.5%) rotate3d(-1, 1, 0, 20deg);
  }

  50% {
    transform: translate(-50%, -50.5%) rotate3d(-1, 1, 0, 17deg);
  }

  100% {
    transform: translate(-50%, -49.5%) rotate3d(-1, 1, 0, 20deg);
  }
}

@keyframes hover-left {
  0% {
    transform: translate(-50%, -49.5%) rotate3d(1, 1, 0, 20deg);
  }

  50% {
    transform: translate(-50%, -50.5%) rotate3d(1, 1, 0, 17deg);
  }

  100% {
    transform: translate(-50%, -49.5%) rotate3d(1, 1, 0, 20deg);
  }
}

@media screen and (max-width: 1600px) {
  .logo-phone {
    display: none;
  }
}
</style>
