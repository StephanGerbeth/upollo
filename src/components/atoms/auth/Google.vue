<template>
  <a
    href="#"
    @click="createUser"
  >
    <span v-show="!auth">
      Google Login
    </span>
    <span v-show="auth">
      <img :src="image"><span>Google Logout</span>
    </span>
    <span v-show="idle">
      checking ...
    </span>
    <span>{{ name }}</span>
  </a>
</template>

<script>
import { authorize, unauthorize, observer, user } from '@/service/firebase/auth';

export default {

  data () {
    return {
      user: user,
      idle: true
    };
  },

  computed: {
    name () {
      return this.user.getName();
    },
    image () {
      return this.user.getImage();
    },
    auth () {
      return this.user.valid;
    }
  },

  mounted () {
    observer.subscribe((result) => {
      this.user = result;
      this.idle = false;
    });
  },

  methods: {
    createUser (e) {
      e.preventDefault();
      this.idle = true;
      if (this.auth) {
        unauthorize().catch(console.error);
      } else {
        authorize().catch(console.error);
      }
    }
  }
};
</script>

<style lang="postcss" scoped>
</style>
