<template>
  <div
    class="range-slider-circle"
    touch-action="none"
    @pointermove="onTick"
    @pointerup="onEnd"
  >
    <svg-circle :progress="progress.current" />
    <div class="handle">
      <div
        class="knob"
        @pointerdown="onStart"
      />
    </div>
    <input-number
      class="value"
      :value="currentValue"
    />
  </div>
</template>

<script>
import SvgCircle from '../svg/Circle';
import InputNumber from './Number';
import { Victor } from '@js-basics/vector';

export default {
  components: {
    SvgCircle,
    InputNumber
  },

  props: {
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    maxRad: {
      type: Number,
      default: Math.PI * 2
    },
    rotation: {
      type: Number,
      default: Math.PI / 2
    }
  },

  data () {
    return {
      active: false,
      progress: {
        before: 0,
        current: 0
      }
    };
  },

  computed: {
    currentValue () {
      return Math.round(this.min + (this.max - this.min) * this.progress.current);
    }
  },

  methods: {
    onStart () {
      this.active = true;
    },
    onTick (e) {
      if (this.active) {
        const vector = calcNormalizedPointerPosition(e, this.$el.getBoundingClientRect());
        const rad = calcRad(vector);
        const radNormalized = rad / (this.maxRad);

        if (Math.abs(radNormalized - this.progress.current) < 0.5 && Math.abs(radNormalized) < 1) {
          this.progress.before = this.progress.current;
          this.progress.current = radNormalized * (this.maxRad / (Math.PI * 2));
          this.$el.style.setProperty('--rad', rad);
        }
      }
    },
    onEnd () {
      this.active = false;
    }
  }
};

function calcNormalizedPointerPosition (e, boundingClientRect) {
  const { x, y, width, height } = boundingClientRect;
  const elemPos = new Victor(x, y);
  const elemSize = new Victor(() => new Victor(width, height) / 2);
  const touchPos = new Victor(e.x, e.y);
  return new Victor(() => (touchPos - elemPos - elemSize) / elemSize);
}

function calcRad (vector) {
  return Math.atan2(vector.y, vector.x) + Math.PI;
}
</script>

<style>
* {
  box-sizing: border-box;
}
</style>
<style lang="postcss" scoped>
.range-slider-circle {
  --rad: 0;
  --padding: 20px;

  position: relative;
  padding: var(--padding);
  overflow: hidden;

  /* transform: rotate(90deg); */

  & svg {
    /* width: 80%; */
  }

  & input.value {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 20em;
    height: 5em;
    margin: auto;
  }

  & .handle {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: rotate(calc(var(--rad) * 1rad));

    & .knob {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 50px;
      height: 50px;
      margin-left: -50%;
      border: 1px solid black;
      border-radius: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>

