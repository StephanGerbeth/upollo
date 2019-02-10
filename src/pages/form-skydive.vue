<template>
  <form>
    <input-date />
    <input-number />
  </form>
</template>

<script>
import InputDate from '@/components/atoms/input/Date';
import InputNumber from '@/components/atoms/input/Number';

export default {
  nuxtI18n: {
    paths: {
      en: '/form-skydive',
      de: '/form-skydive'
    }
  },
  components: {
    InputDate,
    InputNumber
  }
};
</script>

<style scoped>
</style>
