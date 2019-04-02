<template>
  <li>
    <label :for="$vnode.key">
      {{ content }}
    </label>
    <input
      :id="$vnode.key"
      type="checkbox"
      @change="onChange"
    >
    <section ref="container">
      <article ref="content">
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

export default {
  props: {
    content: {
      type: Number,
      default () {
        return 0;
      }
    }
  },

  data () {
    return {
      active: false
    };
  },

  mounted () {
    console.log(this.$vnode);
  },

  methods: {
    onChange (e) {
      if (e.target.checked) {
        const bounds = getBounds(this.$refs.content);
        this.$refs.container.style.setProperty('--height', `${bounds.height}px`);
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

    & article {
      position: absolute;
      left: 0;
      height: 0;
      overflow: hidden;
    }
  }

  & input:checked + section > article {
    height: auto;
  }

  @media (--xs) {
    width: 40%;
  }

  @media (--sm) {
    width: 20%;
  }
}
</style>
