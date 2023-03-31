<template>
  <div class="login">
    <div class="login-container">
      <aa-input :error="loginError" placeholder="Login" type="text" @input="loginValueChange($event)"/>
      <aa-input :error="passwordError" placeholder="Password" type="password" @input="passwordValueChange($event)"/>
      <aa-button text="Login" :loading="loading" @click="login"/>
      <h4 v-for="error of errors" v-bind:key="error" class="error-message">{{ error }}</h4>
    </div>

  </div>
</template>
<script lang="ts">

import Component from "vue-class-component";
import Vue, {inject} from "vue";
import InputComponent from "@/components/input/Input.vue";
import ButtonComponent from '@/components/button/Button.vue'
import { login, getRedirectUrl } from "@/services/HttpService";

@Component({
  components: {
    AaInput: InputComponent,
    AaButton: ButtonComponent
  }
})
export default class LoginComponent extends Vue {

  private loginValue!: string;
  private passwordValue!: string;
  private loginError = false;
  private passwordError = false;
  private loading = false;
  private errors: string[] = []

  public mounted() {
    this.checkForCookies()
  }

  private checkForCookies() {
    if (document.cookie) {
      const cookies = document.cookie.split('; ').map(cookie => ({name: cookie.split('=')[0], value: cookie.split('=')[1]}));
      const hasAccessToken = !!(cookies.find(cookie => cookie.name === 'accessToken'))
      const hasRefreshToken = !!(cookies.find(cookie => cookie.name === 'refreshToken'))
      if (hasAccessToken && hasRefreshToken) {
        this.redirectToUrl()
      }
    }
  }

  private loginValueChange(value: string) {
    this.loginValue = value;
  }

  private passwordValueChange(value: string) {
    this.passwordValue = value;
  }

  private login(): void {
    this.errors = []
    this.loginError = false;
    this.passwordError = false;
    if (!this.loginValue) this.loginError = true;
    if (!this.passwordValue) this.passwordError = true;

    if (this.loginValue && this.passwordValue) {
      this.loading = true;
      login({email: this.loginValue, password: this.passwordValue}).then(() => {
        this.loading = false;
        this.checkForCookies();
      }).catch(e => {
        this.errors.push(e.message);
        this.loading = false;
      })
    }
  }

  private redirectToUrl() {
    this.$emit('redirect')
  }
}
</script>
<style scoped lang="scss">
@import '../style/colors.scss';

.login {
  display: flex;
  justify-content: space-around;

  .login-container {
    margin: 2em 0 0 0;
    width: 75%
  }

  .error-message {
    color: $color-error;
    margin: 1em 0 0 1em
  }
}
</style>
