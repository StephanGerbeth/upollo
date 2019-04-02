<template>
  <ul>
    <item
      v-for="(items, index) in entries"
      :key="index"
    />
  </ul>
</template>

<script>
import Item from '@/components/atoms/list/Item';

export default {
  components: {
    Item
  },

  data () {
    return {
      entries: Array.from(Array(20))
    };
  }
};
</script>

<style lang="postcss" scoped>
ul {
  position: relative;
  padding: 0;
  margin: 0;
}
</style>
