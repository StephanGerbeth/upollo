<template>
  <input
    v-model="value"
    type="text"
  >
</template>

<script>
import { maps } from '@/service/google';
import { getGeocodeByPlaceId } from '@/service/google/geocoder';

export default {
  props: {
    address: {
      type: String,
      default: 'Deutschland'
    }
  },

  data () {
    return {
      value: ''
    };
  },

  watch: {
    address: {
      handler (value) {
        if (value) {
          this.value = value;
          this.requestRelevantPlaces();
        }
      },
      immediate: true
    }
  },

  mounted () {
    maps().then((maps) => {
      var autocomplete = new maps.places.SearchBox(this.$el);
      autocomplete.addListener('places_changed', () => {
        this.requestRelevantPlaces();
      });
    });
  },

  methods: {
    requestRelevantPlaces () {
      maps().then((maps) => {
        var service = new maps.places.AutocompleteService();
        service.getQueryPredictions({ input: this.value }, (e) => {
          if (e.length) {
            getGeocodeByPlaceId(e[0].place_id).then((result) => {
              this.$emit('change', result);
            });
          }
        });
      }
      );
    }
  }
};
</script>

<style lang="postcss" scoped>
</style>
