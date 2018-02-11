<template>
  <img class="chanel-logo-img" v-bind:src="getLogoSrc" alt="bein">
</template>

<script>
import getChanelLogo from '../libs/getChanelLogo';

export default {
  name: 'ChanelLogo',
  props: {
    chanel: {
      type: String,
      default: 'hd'
    },
  },
  computed: {
    getLogoSrc: function() {
      return `https://ligue1.jesse.co.ua/images/Chanel-logos/${getChanelLogo(this.chanel)}`
    }
  }
};
</script>

<style scoped>
.chanel-logo-img {
  width: 100%;
  max-width: 120px;
}
.chanel-logo-img[src*=Global] {
  width: 55%;
  max-width: 85px;
}
  @media (min-width: 900px) {
    .chanel-logo-img {
      width: 80%;
      max-width: 180px
    }
    .chanel-logo-img[src*=Global] {
      width: 55%;
      max-width: 120px;
    }
  }
</style>
