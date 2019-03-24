<template>
  <elem-label :title="title">
    <input
      type="number"
      :value="value"
    >
  </elem-label>
</template>

<script>
import ElemLabel from '@/components/atoms/Label';

export default {
  components: {
    ElemLabel
  },

  props: {
    title: {
      type: String,
      default () {
        return 'title of number';
      }
    },

    value: {
      type: Number,
      default () {
        return 0;
      }
    }
  },

  data () {
    return {

    };
  }
};
</script>


<style lang="postcss" scoped>
input {
  width: 20em;
  height: 5em;
}
</style>


