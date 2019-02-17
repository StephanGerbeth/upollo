<template>
  <div class="autocomplete">
    <input
      v-model="search"
      type="text"
      @input="onChange"
      @keydown.down="onArrowDown"
      @keydown.up="onArrowUp"
      @keydown.enter="onEnter"
    >
    <span v-show="loading">
      loading ...
    </span>
    <ul
      v-show="open"
      class="results"
    >
      <li
        v-for="(result, i) in results"
        :key="i"
        class="entry"
        :class="{'is-active': i === currentIndex}"
        @click="onClick(result)"
      >
        {{ convertToString(result) }}
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  props: {
    max: {
      type: Number,
      default: 10
    },

    service: {
      type: Function,
      default: function () {
        return [];
      }
    }
  },
  data () {
    return {
      search: '',
      results: [],
      loading: false,
      open: false,
      index: -1
    };
  },

  computed: {
    currentIndex () {
      return this.index % this.results.length;
    }
  },

  methods: {
    onChange () {
      this.open = true;
      this.index = -1;
      this.loading = true;
      this.service(this.search.split(' | ')[0], this.max).then((results) => {
        this.loading = false;
        this.results = results;
      });
    },

    onArrowDown () {
      this.index++;
    },

    onArrowUp () {
      this.index--;
    },

    onEnter () {
      this.search = this.convertToString(this.results[this.currentIndex]);
      this.open = false;
    },

    onClick (result) {
      this.search = this.convertToString(result);
      this.open = false;
    },

    convertToString (result) {
      return `${result.id} | ${result.name}`;
    }
  }
};
</script>


<style lang="postcss" scoped>
.autocomplete {
  position: relative;
  width: 130px;

  & input {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  & .results {
    height: 120px;
    padding: 0;
    margin: 0;
    overflow: auto;
    border: 1px solid #eee;

    & .entry {
      padding: 4px 2px;
      overflow: hidden;
      text-align: left;
      text-overflow: ellipsis;
      white-space: nowrap;
      list-style: none;
      cursor: pointer;

      &:hover,
      &.is-active {
        color: white;
        background-color: #4aae9b;
      }
    }
  }
}
</style>


