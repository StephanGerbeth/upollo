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
    <input-number :value="currentValue" />
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
    circumference: {
      type: Number,
      default: Math.PI * 2
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
      return Math.round(this.min + (this.max - this.min) * this.progress.current / this.circumferenceFactor);
    },
    circumferenceFactor () {
      return this.circumference / (Math.PI * 2);
    }
  },

  methods: {
    onStart () {
      this.active = true;
    },
    onTick (e) {
      if (this.active) {
        const normVector = calcNormalizedLocalPointerVector(e, this.$el.getBoundingClientRect());
        const elemRad = getRotation(window.getComputedStyle(this.$el).transform);
        const vector = rotateVectorByRad(normVector, -elemRad);
        const rad = calcRad(vector);

        const radNormalized = rad / (this.circumference);
        if (Math.abs(radNormalized - this.progress.current) < 0.5) {
          this.progress.before = this.progress.current;
          this.progress.current = clamp(radNormalized) * this.circumferenceFactor;
          this.$el.style.setProperty('--rad', clamp(rad, this.circumference));
        }
      }
    },
    onEnd () {
      this.active = false;
    }
  }
};

function calcNormalizedLocalPointerVector (e, boundingClientRect) {
  const { x, y, width, height } = boundingClientRect;
  const elemPos = new Victor(x, y);
  const elemHalfSize = new Victor(() => new Victor(width, height) / 2);
  const touchPos = new Victor(e.x, e.y);
  return new Victor(() => (touchPos - elemPos - elemHalfSize) / elemHalfSize);
}

function calcRad (vector) {
  return Math.atan2(vector.y, vector.x) + Math.PI;
}

// source: https://matthew-brett.github.io/teaching/rotation_2d.html
function rotateVectorByRad (vector, rad) {
  const x = Math.cos(rad) * vector.x - Math.sin(rad) * vector.y;
  const y = Math.sin(rad) * vector.x + Math.cos(rad) * vector.y;
  return new Victor(x, y);
}

function clamp (value, min = 1) {
  return Math.min(min, value);
}

function getRotation (matrix) {
  let m = new DOMMatrix(matrix);
  return Math.atan2(m.b, m.a);
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
  transform: rotate(90deg);

  & svg {
    width: 100%;
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

  & label {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-90deg);
  }
}
</style>

