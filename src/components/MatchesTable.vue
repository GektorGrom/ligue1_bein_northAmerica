<template>
  <div>
    <div bp="grid 6">
      <div><h5 class="text-left">{{dayName}}</h5></div>
      <div><h5 class="text-right">{{today}}</h5></div>
    </div>

    <div bp="grid vertical-center" class="matches-block-loading" v-if="isLoading">
      <radar-spinner
        :animation-duration="1500"
        :size="120"
        class="block-center"
        color="#ff1d5e"
        bp="12"
      />
    </div>
    <div bp="grid 12 vertical-center" class="matches-block-loading" v-if="noMatches">
      <h1>No matches available for this day {{today}}</h1>
    </div>
    <div bp="grid 12" class="matches-block" v-if="showMatches">
      <div bp="grid vertical-center" class="match-row" v-bind:class="{ muted: match.isLive === 'false' }" v-bind:key="match.id" v-for="match in matches">
        <div bp="6">
          <div bp="grid vertical-center">
            <ClubLogo v-bind:team="match.home"/>
            <span bp="2 2@sm"><h2>vs</h2></span>
            <ClubLogo v-bind:team="match.away"/>
          </div>
        </div>
        <div bp="3" class="demo"><h2>{{parseTime(match.start)}}</h2></div>
        <div bp="3" class="text-left">
          <ChanelLogo v-bind:chanel="match.chanel" />
        </div>
      </div>
    </div>
    <div class="container container-footer">
      <div bp="grid 6">
        <div class="text-left">
          <h2><router-link :to="prevLink">PREV</router-link></h2>
        </div>
        <div class="text-right"><h2><router-link :to="nextLink">NEXT</router-link></h2></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import parse from 'date-fns/parse';
import format from 'date-fns/format';
import addDays from 'date-fns/add_days'
import { RadarSpinner  } from 'epic-spinners';

import ClubLogo from '@/components/ClubLogo.vue';
import ChanelLogo from '@/components/ChanelLogo.vue';

export default {
  name: 'MatchesTable',
  components: {
    ClubLogo,
    ChanelLogo,
    RadarSpinner
  },
  data() {
    return {
      today: format(parse(this.$route.params.date || new Date), 'YYYY-MM-DD'),
      dayName: format(parse(this.$route.params.date || new Date), 'dddd'),
      matches: [],
      isLoading: true,
      prevLink: '/matches/' + format(addDays(parse(this.$route.params.date || new Date), -1), 'YYYY-MM-DD'),
      nextLink: '/matches/' + format(addDays(parse(this.$route.params.date || new Date), 1), 'YYYY-MM-DD')
    };
  },
  methods: {
    parseTime: (epoch) => {
      return format(parse(epoch), 'HH:mm');
    },
  },
  mounted() {
    axios.get(`https://9t48n1rvwl.execute-api.us-west-2.amazonaws.com/dev/schedule?date=${this.$route.params.date || format(new Date, 'YYYY-MM-DD')}`)
      .then(({ data }) => {
        this.matches = data.Items.sort((a, b) => a.start - b.start);
        this.isLoading = false;
      });
  },
  computed: {
    showMatches: function () {
      return !this.isLoading && this.matches.length > 0;
    },
    noMatches: function () {
      return !this.isLoading && this.matches.length === 0;
    }
  },
  watch: {
    '$route' (to) {
      this.isLoading = true;
      this.matches = [];
      this.today = format(parse(this.$route.params.date), 'YYYY-MM-DD'),
      this.dayName = format(parse(this.$route.params.date), 'dddd'),
      this.prevLink = format(addDays(parse(to.params.date), -1), 'YYYY-MM-DD');
      this.nextLink = format(addDays(parse(to.params.date), 1), 'YYYY-MM-DD');
      axios.get(`https://9t48n1rvwl.execute-api.us-west-2.amazonaws.com/dev/schedule?date=${to.params.date}`)
        .then(({ data }) => {
          this.matches = data.Items.sort((a, b) => a.start - b.start);
          this.isLoading = false;
        });

    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.match-row {
  padding-top: 15px;
  border-top: 1px solid #5c6bc099;
}
.container {
  display: block;
  max-width: 980px;
  margin: 0 auto 0;
}
.container-footer {
  position: fixed;
  background-color: #dbde3b;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0 25px;
}
a {
  text-decoration: none;
  color: #673ab7a3;
  text-shadow: 2px 2px 3px rgba(103, 58, 183, 0.18);
  font-weight: 700;
}
.matches-block {
  /*min-height: 500px;*/
  margin-bottom: 100px;
}
.matches-block-loading {
  height: calc( 100vh - 50vh );
}
.muted {
  background-color: #f5f5f540;
  border-top-color: #bdbdbd85;
  position: relative;
}
.muted::before,
.muted::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  border-color: transparent;
  border-style: solid;
}

.muted::before {
  border-width: 1.5em;
  border-right-color: #f5f5f540;
  border-top-color: #f5f5f540;
}

.muted::after {
  border-width: 1.5em;
  border-right-color: #bdbdbd85;
  border-top-color: #bdbdbd85;
}
</style>
