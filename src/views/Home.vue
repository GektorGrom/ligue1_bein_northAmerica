<template>
  <div class="home">
    <img class="img-full-width logo-img" src="../assets/naming-ligue-1-lfp-1.png">
    <MatchesTable v-bind:matches="matches" v-bind:isLoading="isLoading" />
  </div>
</template>

<script>
// @ is an alias to /src
import MatchesTable from '@/components/MatchesTable.vue';
import axios from 'axios';

export default {
  name: 'home',
  components: {
    MatchesTable,
  },
  data() {
    return {
      matches: [],
      isLoading: true,
    };
  },
  mounted() {
    axios.get('https://9t48n1rvwl.execute-api.us-west-2.amazonaws.com/dev/schedule?date=2018-02-10T20%3A55%3A04-07%3A00')
      .then(({ data }) => {
        this.matches = data.Items.sort((a, b) => a.start - b.start);
        this.isLoading = false;
      });
  },
};
</script>

<style>
  .img-full-width {
    width: 100%;
  }
  body {
    background-color: #dbde3b;
  }
  .logo-img {
    max-width: 450px;
  }
</style>
