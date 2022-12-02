<template>
  <input type="text" class="input shadow-3d-black-left-small"/>
</template>
<script lang="ts">
import Component from "vue-class-component";
import Vue from "vue";

@Component
export default class InputComponent extends Vue {

}

</script>
<style lang="scss">
.input {
  height: 48px;
  width: 100%;
  border-radius: 6px;
  outline: none !important;
  border: 2px solid #20B58B;
  font-size: 24px;
  box-sizing: border-box;
  padding: 0 10px 0 10px;
  margin: 12px;

  &:focus {
    border: 2px solid #1C9C78;
  }
}

.shadow-3d-black-left-small {
  box-shadow: -1px 1px 1px #242424,
  -2px 2px 1px #242424,
  -3px 3px 1px #242424,
  -5px 5px 6px rgba(16,16,16,0.4),
}
</style>
