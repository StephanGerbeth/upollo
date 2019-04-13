<template>
  <ul>
    <infinite-item
      v-for="(item, index) in entries"
      :key="index"
      :repo="repo"
      :max="max"
      :current-index="currentIndex"
      @onIntersectionUpdate="onIntersectionUpdate"
    />
  </ul>
</template>

<script>
import InfiniteItem from '@/components/atoms/list/InfiniteItem';
// import { viewportObserver } from '@/service/viewport';
import { resizeObserver, scrollObserver } from '@/service/window';
import { getBounds } from '@/utils/element';
import { Victor } from '@js-basics/vector';

export default {
  components: {
    InfiniteItem
  },

  props: {
    repo: {
      type: Object,
      default () {
        return {};
      }
    }
  },

  data () {
    return {
      entries: Array.from(Array(1)),
      max: new Victor(1, 1),
      currentSibling: null,
      lastSibling: null,
      currentIndex: 0
    };
  },

  mounted () {
    // the total count is essential to detect the right end of the list
    this.repo.total().then(() => {
      resizeObserver.subscribe((viewport) => {
        // console.log('RESIZE');
        this.max = getMaxSiblings(this.$el, viewport);

        this.entries = Array.from(Array(this.max.x * this.max.y));
        this.$nextTick(() => this.updateCurrentIndex(true));

        // this.$el.scrollIntoView({ block: 'start', behavior: 'auto' });
      });

      scrollObserver.subscribe(() => {
        // console.log('VIEWPORT');
        this.$nextTick(() => this.updateCurrentIndex(false));
      });
    });
  },

  methods: {
    updateCurrentIndex () {
      if (this.currentSibling) {
        // console.log('UPDATE', this.currentSibling.num, this.currentSibling.num / this.max.x);
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
      // console.log('INTERSECTION UPDATE', e.index);
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

function getMaxSiblings (el, viewport) {
  const child = getBounds(el.firstChild);
  const parent = getBounds(el);

  const dimensionChild = new Victor(child.width, child.height, 1);
  // use the y-dimension of the viewport for scrolling on y-axis
  const dimensionParent = new Victor(parent.width, viewport.y, 1);
  // round the float numbers of rows and columns to an integer value
  const max = new Victor(() => Math.round(dimensionParent / dimensionChild * 1e0) / 1e0);
  // the number of rows must be odd
  return new Victor(max.x, max.y + (1 + -max.y % 2), 0);
}
</script>

<style lang="postcss" scoped>
ul {
  --height: 0;

  position: relative;
  width: 100%;
  height: calc(var(--height) * 1px);
  padding: 0;
  margin: 0;
}
</style>
