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
    <h1>LOGIN</h1>
    <p>{{ $t('text') }}</p>
    <google-auth />
  </div>
</template>

<script>
import GoogleAuth from '@/components/atoms/auth/Google';

export default {
  components: {
    GoogleAuth
  },
  head () {
    return {
      title: 'title of page'
    };
  }
};
</script>
