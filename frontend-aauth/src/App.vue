<template>
  <div id="app">
    <div class="green-bg"></div>
    <div class="form-box shadow-3d-black-left">
      <router-view/>
    </div>
    <svg width="393" height="852" viewBox="0 0 393 852" fill="none" xmlns="http://www.w3.org/2000/svg" class="logo-phone shadow-3d-black-right">
      <rect width="393" height="852" rx="40" fill="black"/>
      <rect x="16" y="16" width="361" height="820" rx="30" fill="#FAFAFA"/>
      <g class="svg-logo">
        <rect x="69" y="298" width="256" height="256" fill="#FAFAFA"/>
        <rect x="179.298" y="332.133" width="31.6734" height="192.517" transform="rotate(24 179.298 332.133)" fill="black"/>
        <rect x="181" y="332" width="32" height="32" fill="black"/>
        <rect x="213" y="332" width="2" height="2" fill="black"/>
        <rect x="179" y="332" width="2" height="2" fill="black"/>
        <rect x="185.76" y="345.016" width="31.6842" height="192.506" transform="rotate(-24 185.76 345.016)" fill="black"/>
        <path d="M197 402L239.435 508.02H154.565L197 402Z" fill="#20B58B"/>
        <rect x="99" y="508" width="196" height="14" fill="#FAFAFA"/>
      </g>
      <g class="nav">
        <rect x="133" y="818" width="128" height="6" rx="3" fill="black" class="home-btn"/>
        <text fill="black" x="160" y="800" class="switch-text" v-if="isLogin()" @click="toggleMode()">Register</text>
        <text fill="black" x="170" y="800" class="switch-text" v-if="!isLogin()" @click="toggleMode()">Login</text>
        <image x="180" y="740" height="32" width="32" fill="black" href="./assets/arrow-up.png" class="up-arrow" @click="toggleMode()"></image>
      </g>
      <rect x="149" y="32" width="96" height="24" rx="12" fill="black"/>

    </svg>

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

  private isLogin() {
    return this.$route.name === 'login'
  }

  private toggleMode() {
    this.$router.push(this.$route.name === 'login' ? '/register' : '/login')
  }
}
</script>

<style lang="scss">
@import './style/colors.scss';
@import './style/shadows.scss';

::selection {
  color: $color-green-main;
  background: $color-white;
}

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

.nav {
  animation: slight-hover 2000ms infinite;
}

.up-arrow {
  cursor: pointer;
}

.switch-text {
  font-size: 20px;
  cursor: pointer;
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
  box-shadow: 2px 2px 20px $color-gray;
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

@keyframes slight-hover {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-2px);
  }
  100% {
    transform: translateY(0);
  }
}

@media screen and (max-width: 1600px) {
  .logo-phone {
    animation: none;
    margin: 50vh 0 0 50vw;
    transition: all 600ms;
    transform: translate(-50%, -50%) scale(1.2) rotate3d(-1, 1, 0, 20deg);
  }

  .form-box {
    animation: none;
    margin: 52vh 0 0 50vw;
    transition: all 600ms;
    z-index: 10000;
    transform: translate(-50%, -50%) scale(0.8) rotate3d(-1, 1, 0, 20deg);
    box-shadow: none;
    background: none;
  }

  .svg-logo {
    transform: translateY(-12em);
  }
}

@media screen and (max-width: 680px) {
  .logo-phone {
    transform: translate(-50%, -50%) scale(1.85);
  }

  .form-box {
    transform: translate(-50%, -50%) scale(1.15);
  }
}
</style>
