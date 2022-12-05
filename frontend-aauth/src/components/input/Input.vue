<template>
  <input :type="type" class="input shadow-3d-black-left-small" :class="{'error': error}" :placeholder="placeholder"/>
</template>
<script lang="ts">
import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {InputType} from "@/components/input/InputType";

@Component
export default class InputComponent extends Vue {
  @Prop()
  error = false;
  @Prop()
  placeholder = '';
  @Prop()
  type: InputType = 'text'
}

</script>
<style lang="scss">
@import '../../style/colors.scss';
@import '../../style/shadows.scss';

.input {
  height: 48px;
  width: 100%;
  border-radius: 6px;
  outline: none !important;
  border: 2px solid $color-green-main;
  font-size: 24px;
  box-sizing: border-box;
  padding: 0 10px 0 10px;
  margin: 12px;

  &:focus {
    border: 2px solid $color-green-main-active;
  }
}

.error {
  border: 2px solid $color-error;
  animation: shake 200ms;

  &:focus {
    border: 2px solid $color-error-active;
  }
}

@keyframes shake {
  0% {
    transform: translateX(-2px);
  }

  20% {
    transform: translateX(2px);
  }

  40% {
    transform: translateX(-2px);
  }

  60% {
    transform: translateX(2px);
  }

  80% {
    transform: translateX(-2px);
  }

  100% {
    transform: translateX(0)
  }
}
</style>
