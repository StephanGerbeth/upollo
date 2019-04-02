<i18n>
{
  "de": {
    "text": "Ich bin die Startseite12"
  },
  "en": {
    "text": "I'm the homepage"
  }
}
</i18n>

<template>
  <div class="content">
    <infinite-list :repo="repo" />
    <br>
    <br><br><br><br><br><br><br><br><br><br><br>
  </div>
</template>

<script>
import repo from '@/repo/demo';
import InfiniteList from '@/components/molecules/InfiniteList';

export default {
  components: {
    InfiniteList
  },

  head () {
    return {
      title: 'title of page'
    };
  },

  data () {
    return {
      repo: repo
    };
  }
};
</script>
