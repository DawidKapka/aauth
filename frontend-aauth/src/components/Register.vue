<template>
  <div class="register">
    <div class="register-container">
      <aa-input :error="false" placeholder="Username" type="text"/>
      <aa-input :error="false" placeholder="Email" type="email"/>
      <aa-input :error="false" placeholder="Password" type="password"/>
      <aa-input :error="false" placeholder="Repeat Password" type="password"/>
      <aa-button text="Login" :loading="false" @click="register"/>
    </div>
  </div>
</template>
<script lang="ts">

import Component from "vue-class-component";
import Vue from "vue";
import InputComponent from "@/components/input/Input.vue";
import ButtonComponent from '@/components/button/Button.vue'

@Component({
  components: {
    AaInput: InputComponent,
    AaButton: ButtonComponent
  }
})
export default class RegisterComponent extends Vue {

  private register(): void {
    console.log('register')
  }
}
</script>
<style scoped lang="scss">
.register {
  display: flex;
  justify-content: space-around;

  .register-container {
    margin: 2em 0 0 0;
    width: 75%
  }
}
</style>
