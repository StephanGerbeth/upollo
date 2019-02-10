<template>
  <a
    href="#"
    @click="createUser"
  >
    Google Sign In
  </a>
</template>

<script>
import firebase from 'firebase';

export default {
  mounted () {
    this.$fireAuth.getRedirectResult().then((result) => {
      console.log(result);
    });
  },
  methods: {
    async createUser (e) {
      e.preventDefault();

      try {

        let test = await this.$fireAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider()).then(() => {
          console.log('HUCH');
        });
        console.log(test);
        // this.$fireAuth.GoogleAuthProvider();
      } catch (e) {
        alert(e);
      }
    }
  }
};
</script>

<style lang="postcss" scoped>
</style>
