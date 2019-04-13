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
    <tab-panel :list="tabContainer">
      <template
        slot="tab"
        slot-scope="slotProps"
      >
        {{ slotProps.item.label }}
      </template>
      <template
        slot="panel"
        slot-scope="slotProps"
      >
        <h2>{{ slotProps.item.content.headline }}</h2>
        <p>{{ slotProps.item.content.text }}</p>
      </template>
    </tab-panel>
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
import TabPanel from '@/components/molecules/TabPanel';

export default {
  components: {
    GoogleAuth,
    AutoComplete,
    Number,
    InputSwitch,
    RangeSliderCircle,
    Geolocation,
    JumpingOffPoint,
    TileWall,
    TabPanel
  },
  head () {
    return {
      title: 'title of page'
    };
  },
  data () {

    return {
      tabContainer: [
        {
          label: 'Lorem ipsum',
          content: {
            headline: 'Lorem ipsum',
            text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, '
          }
        }, {
          label: 'Wortberge',
          content: {
            headline: 'Hinter den Wortbergen',
            text: 'Weit hinten, hinter den Wortbergen, fern der Länder Vokalien und Konsonantien leben die Blindtexte. Abgeschieden wohnen sie in Buchstabhausen an der Küste des Semantik, eines großen Sprachozeans. Ein kleines Bächlein namens Duden fließt durch ihren Ort und versorgt sie mit den nötigen Regelialien. Es ist ein paradiesmatisches Land, in dem einem gebratene Satzteile in den Mund fliegen. Nicht einmal von der allmächtigen Interpunktion werden die Blindtexte beherrscht – ein geradezu unorthographisches Leben. Eines Tages aber beschloß eine kleine Zeile Blindtext, ihr Name war Lorem Ipsum, hinaus zu gehen in die weite Grammatik. Der große Oxmox riet ihr davon ab, da '
          }
        }, {
          label: 'Trapattoni',
          content: {
            headline: 'Trapattoni \'98',
            text: 'Es gibt im Moment in diese Mannschaft, oh, einige Spieler vergessen ihnen Profi was sie sind. Ich lese nicht sehr viele Zeitungen, aber ich habe gehört viele Situationen. Erstens: wir haben nicht offensiv gespielt. Es gibt keine deutsche Mannschaft spielt offensiv und die Name offensiv wie Bayern. Letzte Spiel hatten wir in Platz drei Spitzen: Elber, Jancka und dann Zickler. Wir müssen nicht vergessen Zickler. Zickler ist eine Spitzen mehr, Mehmet eh mehr Basler. Ist klar diese Wörter, ist möglich verstehen, was ich hab gesagt? Danke. Offensiv, offensiv ist wie machen wir in Platz. Zweitens: ich habe erklärt mit diese '
          }
        }
      ],
      routes: [
        { name: 'hello' },
        { name: 'world' }
      ]
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
