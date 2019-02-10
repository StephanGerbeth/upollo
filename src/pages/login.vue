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
    <auto-complete :service="getAirports()" />
    <auto-complete :service="getAircrafts()" />
  </div>
</template>

<script>
import { airports, aircrafts } from '@/service/firebase';
import GoogleAuth from '@/components/atoms/auth/Google';
import AutoComplete from '@/components/atoms/input/AutoComplete';

export default {
  components: {
    GoogleAuth,
    AutoComplete
  },
  head () {
    return {
      title: 'title of page'
    };
  },
  methods: {
    getAirports () {
      return airports;
    },

    getAircrafts () {
      return aircrafts;
    }
  }
};
</script>
