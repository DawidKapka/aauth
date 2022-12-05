<template>
  <button class="button shadow-3d-black-left-small" :class="{'loading': loading}" @click="onClick">
    <span v-if="!loading">{{ text }}</span>
    <img v-if="loading" src="../../assets/spinner.gif" class="spinner">
  </button>
</template>
<script lang="ts">
import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";

@Component
export default class ButtonComponent extends Vue {
  @Prop()
  text = ''
  @Prop()
  loading = false

  private onClick(): void {
    this.$emit('click')
  }
}
</script>
<style lang="scss">
@import '../../style/colors.scss';
@import '../../style/shadows.scss';

.button {
  height: 48px;
  width: 100%;
  border-radius: 6px;
  border: none;
  background-color: $color-green-main;
  font-size: 24px;
  box-sizing: border-box;
  padding: 0 10px 0 10px;
  margin: 12px;
  color: $color-white;
  cursor: pointer;

  &:active {
    background-color: $color-green-main-active;
    box-shadow: none;
    transform: translate(-4px, 4px);
  }
}

.spinner {
  height: 32px;
  width: 32px;
  margin-top: 6px;
  mix-blend-mode: multiply;
}

.loading {
  background-color: $color-green-main-active;
  transform: translate(-4px, 4px);
  box-shadow: none !important;
  pointer-events: none;
}


</style>
