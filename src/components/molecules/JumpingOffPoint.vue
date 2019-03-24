<template>
  <div>
    <google-maps
      :marker-position="markerPosition"
      @marker:position:change="markerPositionChange"
    />
    <google-maps-autocomplete
      :address="address"
      @change="autocompleteChange"
    />
    <google-maps-place-info :places="places" />
  </div>
</template>

<script>
import GoogleMaps from '@/components/atoms/GoogleMaps';
import GoogleMapsAutocomplete from '@/components/atoms/googleMaps/Autocomplete';
import GoogleMapsPlaceInfo from '@/components/atoms/googleMaps/PlaceInfo';

export default {
  components: {
    GoogleMaps,
    GoogleMapsAutocomplete,
    GoogleMapsPlaceInfo
  },

  data () {
    return {
      markerPosition: [],
      address: '',
      places: []
    };
  },

  mounted () {
    setTimeout(() => {
      this.address = 'Stuttgart, Germany';
    }, 2000);
  },

  methods: {
    autocompleteChange (e) {
      this.markerPosition = e;
      this.places = e;
    },

    markerPositionChange (e) {
      this.places = e;
    }
  }
};


</script>

<style lang="postcss" scoped>
</style>
