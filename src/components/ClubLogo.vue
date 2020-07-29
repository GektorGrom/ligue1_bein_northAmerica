<template>
  <div bp="5@sm 4" class="logo-wrapper">
    <div v-if="clubLogo">
      <div class="unknown-club-name hide-small">{{team}}</div>
      <img class="narrow-img hide-small" v-bind:src="getLogoSrc" :alt="team">
      <h2 class="hide-large ellipsis">{{team}}</h2>
    </div>
    <img v-else v-bind:src="getLogoSrc" :alt="team">
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
    clubLogo: function() {
      return getClubLogo(this.team) === 'unknown.svg'
    },
    getLogoSrc: function() {
      return `/assets/club-logos/${getClubLogo(this.team)}`
    }
  }
};
</script>

<style scoped>
  img {
    width: 100%;
    height: 100%;
  }
  .narrow-img {
    width: 60%;
    height: 60%;
  }
  .unknown-club-name {
    font-weight: 700;
    font-size:18px;
  }
  @media (max-width: 480px) {
    .hide-small {
      display: none;
    }
  }
  @media (min-width: 480px) {
    .hide-large {
      display: none;
    }
  }

  /*.logo-wrapper {*/
    /*border-radius: 50%;*/
    /*background-color: #fff;*/
    /*height: 100%;*/
  /*}*/
</style>
