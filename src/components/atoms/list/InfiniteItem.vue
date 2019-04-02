<template>
  <li>{{ content }}</li>
</template>

<script>
import { viewportObserver } from '@/service/viewport';
import { getPositionInViewport, getPositionInParentElement, getDimension } from '@/utils/element';
import { Victor } from '@js-basics/vector';

export default {
  props: {
    currentIndex: {
      type: Number,
      default () {
        return 0;
      }
    },
    max: {
      type: Victor,
      default () {
        return new Victor(1, 1);
      }
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
      content: null,
      offset: 0,
      position: {
        inParent: null,
        inViewport: null
      },
      dimension: null
    };
  },

  computed: {
    num () {
      return this.index + this.offset * this.max.x * this.max.y;
    },
    index () {
      return this.$vnode.key;
    }
  },

  watch: {
    currentIndex: {
      handler (value) {
        // calc own relative index from current index (-x < currentIndex > +x)
        const relativeIndex = this.num - value;
        this.repo.total().then((total) => {
          // calc own offset to place element on right position
          this.offset = this.offset + getRelativeOffset(this.num, relativeIndex, this.max, this.offset, total);

          // set offset by css variable
          this.$el.style.setProperty('--offset', this.offset * this.max.y);
        });
      }
    },

    num: {
      handler (value) {
        this.repo.get(value)
          .then((content) => {
            this.content = content;
          });
      },
      immediate: true
    }
  },

  mounted () {
    this.subscriber = viewportObserver.subscribe(([dimension]) => {
      // if (intersects(this.$el)) {
      this.dimension = getDimension(this.$el);
      this.position.inViewport = getPositionInViewport(this.$el);
      this.position.inParent = getPositionInParentElement(this.$el);

      this.intersection = new Victor(() => (this.position.inViewport + this.dimension) / (dimension + this.dimension) * 2 - 1);
      this.$emit('onIntersectionUpdate', this);
      // }
    });
  },

  destroyed () {
    this.subscriber.unsubscribe();
  }
};

// detect if element have to be repositioned
function getRelativeOffset (index, relativeIndex, max, offset, total) {
  const siblings = max.x * max.y - max.x;

  const halfOfSiblings = siblings / 2;
  const offsetBefore = halfOfSiblings + max.x - 1;
  const offsetAfter = -halfOfSiblings;

  // const halfOfMaxSiblings = maxSiblings / 2;
  // const offsetBefore = halfOfMaxSiblings + itemsInRow + 2;
  // const offsetAfter = -halfOfMaxSiblings + 2;

  // check if the balance of the number of elements before and after the current element in the viewport center is disturbed
  if (relativeIndex < offsetAfter && (index + siblings) < total) {
    // also check if the end of the list is accomplished
    return 1;
  } else if (relativeIndex > offsetBefore && offset > 0) {
    // also check if the beginning of the list is accomplished
    return -1;
  } else {
    return 0;
  }
}
</script>

<style lang="postcss" scoped>
li {
  --offset: 0;

  display: inline-block;
  width: 100%;
  height: 5em;
  transform: translateY(calc(var(--offset) * 100%));

  @media (--xs) {
    width: 50%;
  }

  @media (--sm) {
    width: 33%;
  }

  @media (--md) {
    width: 25%;
  }

  @media (--lg) {
    width: 20%;
  }
}
</style>
