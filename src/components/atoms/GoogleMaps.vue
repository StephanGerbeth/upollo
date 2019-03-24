<template>
  <div class="google-maps">
    hello
  </div>
</template>

<script>
import {
  createMap,
  getDirection,
  getGeoJSONFromDirection,
  updateMapBounds,
  createMarker,
  updateMarkerOnMap,
  fromEvent
} from '@/service/google/maps';
import { maps } from '@/service/google';
import { getAddressLookup } from '@/service/google/geocoder';
import { debounceTime } from 'rxjs/operators';

export default {
  props: {
    markerPosition: {
      type: Array,
      default () {
        return [];
      }
    }
  },

  data () {
    return {
      marker: null
    };
  },

  watch: {
    markerPosition (value) {
      this.updatePosition(value);
    }
  },

  mounted () {
    getDirection().then((result) => {
      console.log(getGeoJSONFromDirection(result));
      maps().then((maps) => {
        var polyline = new maps.Polyline({
          path: maps.geometry.encoding.decodePath(result.routes[0].overview_polyline)
        });
        console.log('polyLine', polyline.getPath().getArray());
      });
    });
    this.getMarker().then((marker) => {
      fromEvent(marker, 'position_changed')
        .pipe(debounceTime(500))
        .subscribe(() => {
          getAddressLookup(marker.getPosition().toJSON())
            .then((list) => {
              this.$emit('marker:position:change', list);
            });
        });
    });
  },

  methods: {
    getMap () {
      if (!this.map) {
        this.map = createMap(this.$el);
      }
      return this.map;
    },

    getMarker () {
      return this.getMap().then((map) => {
        if (!this.marker) {
          this.marker = createMarker(map);
        }
        return this.marker;
      });
    },

    updatePosition (list) {
      this.getMarker().then((marker) => {
        list.forEach((item) => {
          updateMapBounds(marker.map, item);
          updateMarkerOnMap(marker, item.geometry.location);
        });
      });

    }
  }
};
</script>

<style lang="postcss" scoped>
.google-maps {
  height: 200px;
}
</style>

