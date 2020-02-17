<template>
  <div>
    <div bp="grid 4">
      <div><h5 class="text-left">{{dayName}}</h5></div>
      <div><button
        v-if="isRerun"
        v-on:click="liveOnly = !liveOnly"
        class="btn btn-rerun">{{liveOnly ? 'Show' : 'Hide'}} Rerun</button></div>
      <div><h5 class="text-right">{{today}}</h5></div>
    </div>

    <div bp="grid 12 vertical-center" class="matches-block-loading" v-if="noMatches">
      <h1>No matches available for this day {{today}}</h1>
    </div>
    <transition name="fade" :duration="2500">
      <div bp="grid 12" class="matches-block" v-if="showMatches">
        <div bp="grid vertical-center" class="match-row" v-bind:class="{ muted: match.isLive === 'false' }" v-bind:key="match.id" v-for="match in filteredMatches">
          <div bp="6" v-if="match.isLigueShow !== 'true'">
            <div bp="grid vertical-center">
              <ClubLogo v-bind:team="match.home"/>
              <span bp="2 2@sm"><h2>vs</h2></span>
              <ClubLogo v-bind:team="match.away"/>
            </div>
          </div>
          <div bp="6" v-if="match.isLigueShow === 'true'">
            <div bp="grid vertical-center">
              <img bp="3 hide show@md" class="ligue-one-show__img" src="https://ligue1.jesse.co.ua/images/club-logo/football.svg" alt="Ligue 1 Show logo">
              <h2 bp="9@md" class="text-left">{{match.title}}</h2>
            </div>
          </div>
          <div bp="3" class="demo"><h2>{{parseTime(match.start)}}</h2></div>
          <div bp="3" class="text-left">
            <ChanelLogo v-bind:chanel="match.chanel" />
          </div>
        </div>
      </div>
    </transition>
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
import parseISO from 'date-fns/parseISO';
import parse from 'date-fns/parse';
import format from 'date-fns/format';
import addDays from 'date-fns/addDays'
import SwipeListener from 'swipe-listener';

import ClubLogo from '@/components/ClubLogo.vue';
import ChanelLogo from '@/components/ChanelLogo.vue';

export default {
  name: 'MatchesTable',
  components: {
    ClubLogo,
    ChanelLogo,
  },
  data() {
    return {
      today: format(parseISO(this.$route.params.date || new Date().toISOString()), 'yyyy-MM-dd'),
      dayName: format(parseISO(this.$route.params.date || new Date().toISOString()), 'EEEE'),
      matches: [],
      isRerun: false,
      liveOnly: false,
      isLoading: true,
      prevLink: '/matches/' + format(addDays(parseISO(this.$route.params.date || new Date().toISOString()), -1), 'yyyy-MM-dd'),
      nextLink: '/matches/' + format(addDays(parseISO(this.$route.params.date || new Date().toISOString()), 1), 'yyyy-MM-dd')
    };
  },
  methods: {
    parseTime: (epoch) => {
      return format(parse(epoch, 'T', new Date()), 'HH:mm');
    },
  },
  mounted() {
    fetch(`https://svbiszik4b.execute-api.us-west-2.amazonaws.com/dev/ligue1/schedule/${this.$route.params.date || format(new Date, 'yyyy-MM-dd')}?tz=${encodeURIComponent(new Intl.DateTimeFormat().resolvedOptions().timeZone)}`, {
      mode: 'cors',
      headers: {
        Accept: 'application/json',
      }
    })
      .then((res) => res.json())
      .then((data) => {
        this.matches = data;
        this.isRerun = data.some(el => el.isLive === 'false');
        this.isLoading = false;
      });
    addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        this.$router.push(this.prevLink);
        return;
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        this.$router.push(this.nextLink);
        return;
      }
    });
    const container = document.getElementById('app');
    SwipeListener(container);
    // todo remove event listener before destroy
    container.addEventListener('swipe', (e) => {
      try {
        if (e.detail.touch) {
          if (e.detail.directions.left) {
            e.preventDefault();
            this.$router.push(this.nextLink);
          }
          if (e.detail.directions.right) {
            e.preventDefault();
            this.$router.push(this.prevLink);
          }
        }
      } catch (e) {
        console.log(e.message);
      }

    });
  },
  computed: {
    showMatches: function () {
      return !this.isLoading && this.matches.length > 0;
    },
    noMatches: function () {
      return !this.isLoading && this.matches.length === 0;
    },
    filteredMatches: function () {
      return this.matches.filter(match => {
        return !this.liveOnly || match.isLive !== 'false'
      })
    }
  },
  watch: {
    '$route' (to) {
      this.isLoading = true;
      this.matches = [];
      this.today = format(parseISO(this.$route.params.date), 'yyyy-MM-dd');
      this.dayName = format(parseISO(this.$route.params.date), 'EEEE');
      this.prevLink = format(addDays(parseISO(to.params.date), -1), 'yyyy-MM-dd');
      this.nextLink = format(addDays(parseISO(to.params.date), 1), 'yyyy-MM-dd');
      fetch(`https://svbiszik4b.execute-api.us-west-2.amazonaws.com/dev/ligue1/schedule/${to.params.date}?tz=${encodeURIComponent(new Intl.DateTimeFormat().resolvedOptions().timeZone)}`, {
        mode: 'cors',
      })
        .then(res => res.json())
        .then((data) => {
          this.isRerun = data.some(el => el.isLive === 'false');
          this.matches = data;
          this.isLoading = false;
        });

    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
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
  position: sticky;
  background-color: #dbde3b;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0 25px;
}
@media (prefers-color-scheme: dark) {
  .container-footer {
    background-color: #353535;
  }
  .match-row {
    border-top-color: rgba(106, 106, 106, 0.39);
  }
}
a {
  text-decoration: none;
  color: #673ab7a3;
  text-shadow: 2px 2px 3px rgba(103, 58, 183, 0.18);
  font-weight: 700;
}
.matches-block {
  /*min-height: 500px;*/
  margin-bottom: 10px;
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

@media (prefers-color-scheme: dark) {
  .muted {
    background-color: rgba(99, 99, 99, 0.17);
    border-top-color: rgba(106, 106, 106, 0.39);
  }

  .muted::before {
    border-right-color: rgba(106, 106, 106, 0.39);
    border-top-color: rgba(106, 106, 106, 0.39);
  }

  .muted::after {
    border-right-color: rgba(106, 106, 106, 0.39);
    border-top-color: rgba(106, 106, 106, 0.39);
  }

  a {
    color: #c7c7c7;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 2.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.btn {
  font-size: 0.83em;
  width: 100%;
  height: 100%;
  font-weight: 700;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #2c3e50;
  background-color: transparent;
  border: none;
  outline: transparent;
}
.ligue-one-show__img {
  margin: 0 auto;
  width: 100%;
  padding: 0 15px;
}

</style>

<style>
  @media (prefers-color-scheme: dark) {
    img {
      filter: brightness(80%);
    }

    .btn {
      color: #c7c7c7;
    }
  }
</style>
