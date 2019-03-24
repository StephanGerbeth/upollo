<template>
  <div>
    <button
      :disabled="disabled"
      @click="onClick"
    >
      GEO
    </button>
    <span v-show="disabledMessage">
      {{ status.message }}
    </span>
  </div>
</template>

<script>
import { STATUS, isAvailable, getCurrentPosition } from '@/utils/geolocation';
// import { getElevation, getElevationAlongPath } from '@/service/google/elevation';
// import { getGeocode, getAddressLookup, getGeocodeByPlaceId } from '@/service/google/geocoder';

export default {

  props: {
    options: {
      type: Object,
      default () {
        return {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: Infinity
        };
      }
    }
  },

  data () {
    return {
      status: isAvailable()
    };
  },

  computed: {
    disabled () {
      return (this.status.code === STATUS.UNAVAILABLE);
    },

    disabledMessage () {
      return !!this.status.message;
    }
  },

  mounted () {
    this.$axios('https://extreme-ip-lookup.com/json/').then((result) => {
      console.log(result.data);

      // getGeocode('Reussensteinstr. 33, Fellbach').then((result) => {
      //   console.log(result);
      // });
    });
    // getElevation([{ lat: 39.7391536, lng: -104.9847034 }]).then((result) => {
    //   console.log(result);
    // });

    // getElevationAlongPath([
    //   { lat: 36.579, lng: -118.292 },  // Mt. Whitney
    //   { lat: 36.606, lng: -118.0638 },  // Lone Pine
    //   { lat: 36.433, lng: -117.951 },  // Owens Lake
    //   { lat: 36.588, lng: -116.943 },  // Beatty Junction
    //   { lat: 36.34, lng: -117.468 },  // Panama Mint Springs
    //   { lat: 36.24, lng: -116.832 }
    // ], 2).then((result) => {
    //   console.log(result);
    // });

    // getGeocode('Reussensteinstr. 33, Fellbach').then((result) => {
    //   console.log(result);
    // });

    // getAddressLookup({ lat: 39.7391536, lng: -104.9847034 }).then((result) => {
    //   console.log(result);
    // });

    // getGeocodeByPlaceId('ChIJrTLr-GyuEmsRBfy61i59si0').then((result) => {
    //   console.log(result);
    // });
  },

  methods: {
    onClick () {
      this.status = STATUS.PROCESSING;
      getCurrentPosition(this.options)
        .then((e) => {
          this.status = e;
          console.log(e.data);
        })
        .catch((e) => {
          this.status = e;
        });
    }
  }
};
</script>

<style lang="postcss" scoped>
</style>
