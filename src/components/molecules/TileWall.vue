<template>
  <ul>
    <item
      v-for="(items, index) in entries"
      :key="index"
      :name="$vnode.tag"
      :model="model"
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
      entries: Array.from(Array(20)),
      model: {
        checked: ''
      }
    };
  },

  mounted () {
    console.log(this);
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
