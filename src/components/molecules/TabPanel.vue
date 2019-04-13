<template>
  <div class="red">
    <template v-for="(item, index) in list">
      <input
        :id="$vnode.tag +'_input_'+ index"
        :key="$vnode.tag +'_input_'+ index"
        :value="index"
        :checked="(index === 0) ? 'checked': ''"
        name="tabs"
        type="radio"
      >
      <label
        :key="$vnode.tag +'_label_'+ index"
        :for="$vnode.tag +'_input_'+ index"
        @click="onClick"
      >
        <slot
          name="tab"
          :item="item"
        />
      </label>
      <section :key="$vnode.tag +'_section_'+ index">
        <article>
          <slot
            name="panel"
            :item="item"
          />
        </article>
      </section>
    </template>
  </div>
</template>

<script>
import { getBounds } from '@/utils/element';
import { resizeObserver } from '@/service/window';

export default {
  props: {
    list: {
      type: Array,
      default () {
        Array.from(Array(12)).fill({}).map((item, index) => {
          return {
            checked: (index === 0) ? 'checked' : '',
            title: index
          };
        });
      }
    }
  },

  mounted () {
    resizeObserver.subscribe(() => {
      this.update(this.$el.querySelector(('input:checked + label + section')));
    });
  },

  methods: {
    onClick (e) {
      this.$nextTick(() => {
        this.update(e.target.nextElementSibling);
      });
    },

    update (checkedElement) {
      this.$el.querySelectorAll('section').forEach((item) => {
        let height = 0;
        if (checkedElement === item) {
          height = getBounds(item.querySelector('article')).height;
        }
        item.style.setProperty('--height', height);
      });
    }
  }
};
</script>

<style lang="postcss" scoped>
div {
  display: flex;
  flex-wrap: wrap;
  width: 100%;

  & > section {
    --height: 0;

    position: relative;
    width: 100%;
    height: calc(var(--height) * 1px);
    overflow: hidden;
    transition-duration: 350ms;
    transition-property: height;
    will-change: height;

    @media (--sm) {
      order: 1;
      transition-duration: unset;
      transition-property: unset;
      will-change: unset;
    }

    & > article {
      position: absolute;
      top: 0;
      left: 0;
      height: 0;
    }
  }

  & > input {
    position: absolute;
    opacity: 0;

    &:checked + label + section > article {
      height: auto;
    }
  }

  & label {
    width: 100%;
    padding: 20px;

    @media (--sm) {
      order: 0;
      width: auto;
    }
  }
}
</style>
