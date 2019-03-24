<template>
  <label>
    <span class="description">
      {{ title }}
    </span>
    <slot />
  </label>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default () {
        return 'Title';
      }
    }
  }
};
</script>

<style lang="postcss">
span {
  display: block;
}
</style>
