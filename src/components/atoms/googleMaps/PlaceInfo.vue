<template>
  <div>
    <span>{{ address }}</span><i v-show="idle">
      loading...
    </i>
  </div>
</template>

<script>
const RELEVANCE = ['airport', 'street_address', 'establishment', 'point_of_interest', 'locality'].reverse();

export default {
  props: {
    places: {
      type: Array,
      default () {
        return [];
      }
    }
  },

  data () {
    return {
      address: '',
      idle: false
    };
  },

  watch: {
    places: {
      handler (list) {
        this.address = sortByRelevance(list.slice(0), RELEVANCE)[0].formatted_address;
      }
    }
  }
};

function sortByRelevance (arr, order) {
  return arr.sort(function (a, b) {
    let aI = findIndexOfMostRelevantType(order, a.types);
    let bI = findIndexOfMostRelevantType(order, b.types);

    if (aI < bI) {
      return 1;
    } else if (aI > bI) {
      return -1;
    } else {
      return 0;
    }
  });
}

function findIndexOfMostRelevantType (order, types) {
  return types.map((type) => {
    return order.indexOf(type);
  }).sort().reverse()[0];
}
</script>

<style lang="postcss" scoped>
</style>
