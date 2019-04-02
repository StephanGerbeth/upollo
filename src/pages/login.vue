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
    <tile-wall />
    <h1>LOGIN</h1>
    <p>{{ $t('text') }}</p>
    <google-auth />
    <auto-complete
      :service="getAirports()"
      title="Airport"
    />
    <auto-complete
      :service="getAircrafts()"
      title="Aircraft"
    />
    <number />
    <input-switch />
    <range-slider-circle />
    <geolocation />
    <jumping-off-point />
  </div>
</template>

<script>
import { getFirebaseService } from '@/service/firebase';
import { airports, aircrafts } from '@/service/firebase/database';
import GoogleAuth from '@/components/atoms/auth/Google';
import AutoComplete from '@/components/atoms/input/AutoComplete';
import Number from '@/components/atoms/input/Number';
import InputSwitch from '@/components/atoms/input/Switch';
import RangeSliderCircle from '@/components/atoms/input/RangeSliderCircle';
import Geolocation from '@/components/atoms/input/Geolocation';
import JumpingOffPoint from '@/components/molecules/JumpingOffPoint';
import TileWall from '@/components/molecules/TileWall';


export default {
  components: {
    GoogleAuth,
    AutoComplete,
    Number,
    InputSwitch,
    RangeSliderCircle,
    Geolocation,
    JumpingOffPoint,
    TileWall
  },
  head () {
    return {
      title: 'title of page'
    };
  },
  data () {

    return {

    };
  },

  mounted () {
    getFirebaseService('auth').then((auth) => {
      console.log(auth);
    });
    getFirebaseService('app').then((app) => {
      console.log(app());
    });

  },
  methods: {
    getAirports () {
      return airports;
    },

    getAircrafts () {
      return aircrafts;
    },

    autocompleteChange (e) {
      console.log(e);
    }
  }
};
</script>
