<template>
  <input
    type="number"
    :value="value"
  >
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0
    }
  }
};
</script>


<style lang="postcss" scoped>
</style>


