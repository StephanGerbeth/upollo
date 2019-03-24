<template>
  <ul>
    <infinite-item
      v-for="(item, index) in entries"
      :key="index"
      :repo="repo"
      :max-siblings="maxSiblings"
      :current-index="currentIndex"
      @onIntersectionUpdate="onIntersectionUpdate"
    />
  </ul>
</template>

<script>
import InfiniteItem from '@/components/atoms/list/InfiniteItem';
import { viewportObserver } from '@/service/viewport';
import { Victor } from '@js-basics/vector';

export default {
  components: {
    InfiniteItem
  },

  props: {
    maxSiblings: {
      type: Number,
      default () {
        return 10;
      },
    },
    repo: {
      type: Object,
      default () {
        return {};
      }
    }
  },

  data () {
    return {
      entries: Array.from(Array(this.maxSiblings)),
      currentSibling: null,
      lastSibling: null,
      currentIndex: 0
    };
  },

  mounted () {
    // the total count is essential to detect the right end of the list
    this.repo.total().then(() => {
      viewportObserver.subscribe(() => {
        this.$nextTick(this.updateCurrentIndex);
      });
      this.$nextTick(this.updateCurrentIndex);
    });
  },

  methods: {
    updateCurrentIndex () {
      if (this.currentSibling) {
        // publish the new current index to all list elements
        this.currentIndex = this.currentSibling.num;
      }
      if (this.lastSibling) {
        // update the current height of our list dom element
        const listDimension = new Victor(() => this.lastSibling.position.inParent + this.lastSibling.dimension);
        this.$el.style.setProperty('--height', listDimension.y);
      }
      // reset the relevant siblings
      this.lastSibling = null;
      this.currentSibling = null;
    },

    onIntersectionUpdate (e) {
      // check if the element is nearest one to the viewport center
      if (!this.currentSibling || Math.abs(e.intersection.y) < Math.abs(this.currentSibling.intersection.y)) {
        this.currentSibling = e;
      }
      // check if the element is the last one in the browser view (not dom view)
      if (!this.lastSibling || e.num >= this.lastSibling.num) {
        this.lastSibling = e;
      }
    }
  }
};
</script>

<style lang="postcss" scoped>
ul {
  --height: 0;

  position: relative;
  height: calc(var(--height) * 1px);
  padding: 0;
  margin: 0;
}

li {
  height: 5em;
}
</style>
