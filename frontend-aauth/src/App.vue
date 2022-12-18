<template>
  <div id="app">
    <div class="green-bg"></div>
    <div class="form-box shadow-3d-black-left">
      <div class="title" :class="{'title-reg': !isLogin()}"><span>Authenticate to use</span> <br> <span class="redirect-title">{{ redirectTitle }}<div class="type-symbol"></div></span></div>
      <router-view :class="{'transition': transitioning}" class="view" @redirect="redirect()"/>
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
      <g class="nav-wrapper">
        <g class="nav">
          <rect x="133" y="818" width="128" height="6" rx="3" fill="black" class="home-btn"/>
          <text fill="black" x="160" y="800" class="switch-text" v-if="isLogin()" @click="toggleMode()">Register</text>
          <text fill="black" x="170" y="800" class="switch-text" v-if="!isLogin()" @click="toggleMode()">Login</text>
          <image x="180" y="740" height="32" width="32" fill="black" href="./assets/arrow-up.png" class="up-arrow" @click="toggleMode()"></image>
        </g>
      </g>
      <rect x="149" y="32" width="96" height="24" rx="12" fill="black"/>

    </svg>

  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import LoginComponent from "@/components/Login.vue";
import Vue from "vue";
import {getRedirectUrl, saveRedirectTitle, saveRedirectUrl, getRedirectTitle } from "./services/HttpService";

@Component({
  methods: {
    getRedirectTitle() {
      return getRedirectTitle
    }
  },
  components: {
    AaLogin: LoginComponent
  }
})
export default class AppComponent extends Vue {

  private transitioning = false;
  private redirectTitle = '';

  private mounted() {
    saveRedirectTitle(this.$route.query.title as string);
    saveRedirectUrl(this.$route.query.redirectUrl as string);
    this.animateTitle()
  }

  private animateTitle() {
    const interval = setInterval(() => {
      const length = this.redirectTitle.length + 1;
      this.redirectTitle = ''
      for (let i = 0; i < length; i++) {
        if (this.redirectTitle.length !== getRedirectTitle().length) {
          this.redirectTitle += getRedirectTitle()[i]
        } else {
          clearInterval(interval)
        }
      }
    }, 200)
  }

  private isLogin() {
    return this.$route.name === 'login'
  }

  private toggleMode() {
    this.transitioning = true;
    setTimeout(() => {
      this.$router.push({
        name: this.$route.name === 'login' ? 'register' : 'login',
        query: {
          redirectUrl: getRedirectUrl(),
          title: getRedirectTitle()
        }
      })
      this.transitioning = false;
    }, 500)
  }

  private redirect() {
    console.log(getRedirectUrl());
  }
}
</script>

<style lang="scss">
@import './style/colors.scss';
@import './style/shadows.scss';
@import './style/keyframes.scss';
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap');

::selection {
  color: $color-white;
  background: $color-green-main;
}

.title {
  position: absolute;
  font-size: 48px;
  font-weight: 500;
  font-family: 'Open Sans', sans-serif;
  transform: translateY(-5em);

  .redirect-title {
    color: $color-green-main;
    font-weight: 700;
    text-shadow: 1px 1px 1px $color-gray;
    display: flex;
  }

  .type-symbol {
    width: 8px;
    height: 48px;
    background-color: $color-green-main;
    margin: 0.1em 0 0 4px;
    animation: blink 800ms infinite;
  }
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #000000;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  font-weight: 400;
  font-family: 'Open Sans', sans-serif;
}

body {
  overflow: hidden;
}

.view {
  animation: transition-appear 500ms;
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
  height: auto;
  min-height: 20em;
  background: #fafafa;
  position: absolute;
  margin: 50vh 0 0 calc(50vw - 189px);
  transform: translate(-50%, -50%) rotate3d(1, 1, 0, 20deg);
  border-radius: 20px;
  padding: 2em;
  animation: hover-left 4000ms infinite;
  transition: height 0.5s;
}

.transition {
  animation: transition-disappear 500ms;
}

.green-bg {
  position: absolute;
  background: #8AEACE;
  height: 100vh;
  width: 50vw;
  box-shadow: 2px 2px 20px $color-gray;
}

.logo-phone {
  position: absolute;
  margin-top: 50vh;
  margin-left: 75vw;
  transform: translate(-50%, -50%) rotate3d(-1, 1, 0, 20deg);
  border-radius: 40px;
  animation: hover-right 4000ms infinite, slide-in-from-bottom 1000ms;
  transition: all 1000ms;
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

    .title {
      align-content: center;
      transform: translateY(-13em);
      margin-left: 5.5em;
      font-size: 32px;

      .redirect-title {
        display: flex;
        justify-content: center;
      }
    }

    .type-symbol {
      height: 32px;
      margin: 0.2em 0 0 4px;
    }
  }

  .svg-logo {
    transform: translate(2.5em,-5em) scale(0.8);
  }
}

@media screen and (max-width: 680px) {
  .logo-phone {
    transform: translate(-50%, -50%) scale(1.55);
  }

  .view {
    transform: scale(0.8);
    margin-left: -1em;
  }

  .form-box {
    transform: translate(-50%, -50%) scale(1.15);

    .title {
      align-content: center;
      transform: translate(0.5em, 8em) scale(0.8);
      margin-left: 5em;
      font-size: 32px;
    }

    .title-reg {
      transform: translate(0.5em, 11em) scale(0.8);
    }
  }

  .nav-wrapper {
    transform: translate(6.2em, 13em) scale(0.5)
  }
}

@media screen and (max-width: 600px) {
  .form-box {
    transform: translate(-50%, -50%) scale(1)
  }
}
</style>
