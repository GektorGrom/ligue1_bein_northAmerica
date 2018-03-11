<template>
  <div class="home">
    <img class="img-full-width logo-img" src="../assets/naming-ligue-1-lfp-1.png">
    <MatchesTable />
  </div>
</template>

<script>
// @ is an alias to /src
import MatchesTable from '@/components/MatchesTable.vue';

export default {
  name: 'home',
  components: {
    MatchesTable,
  }
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
  .ellipsis {
    word-wrap: unset;
    white-space: nowrap;
    overflow: hidden !important;
    text-overflow: ellipsis;
  }
</style>
