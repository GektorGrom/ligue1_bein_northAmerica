<template>
  <div bp="5" class="logo-wrapper">
    <img v-bind:src="getLogoSrc" :alt="team">
  </div>
</template>

<script>
import getClubLogo from '../libs/getClubLogo';

export default {
  name: 'ClubLogo',
  props: {
    team: {
      type: String,
      default: 'none'
    },
  },
  computed: {
    getLogoSrc: function() {
      return `https://s3-us-west-2.amazonaws.com/ligue1-us-schedule/images/club-logo/${getClubLogo(this.team)}`
    }
  }
};
</script>

<style scoped>
  img {
    width: 100%;
    height: 100%;
  }
  /*.logo-wrapper {*/
    /*border-radius: 50%;*/
    /*background-color: #fff;*/
    /*height: 100%;*/
  /*}*/
</style>
