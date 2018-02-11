<template>
  <div>
    <div bp="grid 12">
      <div bp="grid vertical-center" class="match-row" v-bind:key="match.id" v-for="match in matches">
        <div bp="6">
          <div bp="grid vertical-center">
            <ClubLogo v-bind:team="match.home"/>
            <span bp="2"><h2>vs</h2></span>
            <ClubLogo v-bind:team="match.away"/>
          </div>
        </div>
        <div bp="3" class="demo"><h2>{{parseTime(match.start)}}</h2></div>
        <div bp="3" class="text-left">
          <ChanelLogo v-bind:chanel="match.chanel" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import parse from 'date-fns/parse';
import format from 'date-fns/format';

import ClubLogo from '@/components/ClubLogo.vue';
import ChanelLogo from '@/components/ChanelLogo.vue';

export default {
  name: 'MatchesTable',
  components: {
    ClubLogo,
    ChanelLogo
  },
  props: {
    matches: Array,
    isLoading: Boolean,
  },
  methods: {
    parseTime: (epoch) => {
      console.log(epoch);
      return format(parse(epoch), 'hh:mm');
    },
  },
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
</style>
