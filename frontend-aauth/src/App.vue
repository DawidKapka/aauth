<template>
  <div id="app">
    <div class="green-bg"></div>
    <img src="./assets/logo-phone.svg" class="logo-phone"/>
    <router-view/>
  </div>
</template>

<script>

</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #000000;
}

body {
  margin: 0;
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
  transform: translate(-50%, -50%);
  animation: hover 4000ms infinite, slide-in-from-bottom 1000ms;
  transition: all 1000ms;
}

@keyframes slide-in-from-bottom {
  0% {
    transform: translate(-50%, 0) rotate3d(0, 1, 0, 90deg);
    margin-top: 100vh;
  }

  100% {
    transform: translate(-50%, -50%) rotate3d(0, 1, 0, 0deg);
    margin-top: 50vh;
  }
}

@keyframes hover {
  0% {
    transform: translate(-50%, -50%) rotate3d(0, 1, 0, 0deg);
  }

  25% {
    transform: translate(-50%, -50.5%) rotate3d(0, 1, 0, 5deg);
  }

  50% {
    transform: translate(-50%, -51%) rotate3d(0, 1, 0, 0deg);
  }

  75% {
    transform: translate(-50%, -50.5%) rotate3d(0, 1, 0, -5deg);
  }
}
</style>
