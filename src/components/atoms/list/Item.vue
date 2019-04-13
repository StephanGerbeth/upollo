<template>
  <li>
    <label
      :for="$vnode.key"
      @click="onClick"
    >
      {{ content }}
    </label>
    <input
      :id="$vnode.key"
      v-model="model.checked"
      type="radio"
      :name="name"
      :value="$vnode.key"
      @change="onChange"
    >
    <section ref="container">
      <article
        ref="content"
        class="item-content"
      >
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
        Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
        Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
        Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer
      </article>
    </section>
  </li>
</template>

<script>
import { getBounds } from '@/utils/element';
import { resizeObserver } from '@/service/window';
import { getScrollPos } from '@/service/scroll';
import { Victor } from '@js-basics/vector';

export default {
  props: {
    name: {
      type: String,
      default () {
        return 'radio';
      }
    },
    model: {
      type: Object,
      default () {
        return {
          checked: ''
        };
      }
    },
    content: {
      type: Number,
      default () {
        return 0;
      }
    }
  },

  data () {
    return {
      value: this.$vnode.key
    };
  },

  watch: {
    'model.checked': {
      handler () {
        this.onChange();
      }
    }
  },

  mounted () {
    resizeObserver.subscribe(this.onChange);
  },

  methods: {
    onClick () {
      if (this.model.checked === this.$vnode.key) {
        this.model.checked = '';
      }
    },

    onChange () {
      if (this.model.checked === this.$vnode.key) {
        this.$refs.container.style.setProperty('--height', `${getBounds(this.$refs.content).height}px`);
        setTimeout(() => {
          const bounds = getBounds(this.$el);
          const boundsVector = new Victor(bounds.left, bounds.top);
          const scrollPos = new Victor(() => getScrollPos() + boundsVector);
          global.scrollTo({
            top: scrollPos.y,
            behavior: 'smooth'
          });
        }, 350);

      } else {
        this.$refs.container.style.setProperty('--height', 0);
      }
    }
  }
};
</script>

<style lang="postcss" scoped>
li {
  box-sizing: border-box;
  display: inline-block;
  width: 100%;
  margin: 10px;
  vertical-align: top;
  background-color: red;

  & label {
    display: block;
    height: 50px;
  }

  & input {
    display: none;
  }

  & section {
    --height: 0;

    width: 100%;
    height: var(--height);
    transition-duration: 350ms;
    transition-property: height;
    will-change: height;

    & article {
      position: absolute;
      left: 0;
      height: 0;
      overflow: hidden;
      opacity: 0;
      transition-delay: 350ms;
      transition-duration: 350ms;
      transition-property: opacity;
      will-change: opacity;
    }
  }

  & input:checked + section > article.item-content {
    height: auto;
    opacity: 1;
  }

  @media (--xs) {
    width: 40%;
  }

  @media (--sm) {
    width: 20%;
  }
}
</style>
