<template>
  <elem-label :title="title">
    <input
      :name="name"
      :checked="checked"
      type="checkbox"
    >
    <span class="handle" />
  </elem-label>
</template>

<script>
import ElemLabel from '@/components/atoms/Label';

export default {
  components: {
    ElemLabel
  },

  props: {
    name: {
      type: String,
      default () {
        return 'switch';
      }
    },
    checked: {
      type: Boolean,
      default () {
        return false;
      }
    },
    title: {
      type: String,
      default () {
        return 'title of switch';
      }
    }
  },

  data () {
    return {

    };
  },

  mounted () {

  }
};
</script>

<style lang="postcss" scoped>
input {
  display: none;
}

label {
  display: inline-block;

  & span.handle {
    box-sizing: content-box;
    display: block;
    width: 4em;
    height: 2em;
    background-color: green;
    border: 1px solid black;
    border-radius: 2em;
    transition-duration: 350ms;
    transition-property: background-color;
    will-change: background-color;

    &::before {
      box-sizing: border-box;
      display: block;
      width: 2em;
      height: 2em;
      background-color: white;
      border: 1px solid black;
      border-radius: 50%;
      transition-duration: 350ms;
      transition-property: transform;
      will-change: transform;
    }
  }
}

label input:checked + span.handle {
  background-color: red;

  &::before {
    transform: translateX(100%);
  }
}
</style>

