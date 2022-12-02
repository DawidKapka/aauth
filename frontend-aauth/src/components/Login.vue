<template>
  <div class="login">
    <div class="login-container">
      <aa-input />
      <aa-input />
    </div>
  </div>
</template>
<script lang="ts">

import Component from "vue-class-component";
import Vue from "vue";
import InputComponent from "@/components/input/Input.vue";

@Component({
  components: {
    AaInput: InputComponent
  }
})
export default class LoginComponent extends Vue {

}
</script>
<style scoped lang="scss">
.login {
  display: flex;
  justify-content: space-around;

  .login-container {
    margin: 2em 0 0 0;
    width: 75%
  }
}
</style>
