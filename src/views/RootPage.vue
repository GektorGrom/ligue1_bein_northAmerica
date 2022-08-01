<template>
  <div class="home">
    <MatchesTable/>
  </div>
</template>

<script>
// @ is an alias to /src
import MatchesTable from '@/components/MatchesTable.vue';

export default {
  components: {
    MatchesTable,
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

@media (prefers-color-scheme: dark) {
  body {
    background-color: #353535;
  }
}

.logo-img {
  max-width: 150px;
}

.ellipsis {
  word-wrap: unset;
  white-space: nowrap;
  overflow: hidden !important;
  text-overflow: ellipsis;
}

.adaptive-logo img:first-child {
  display: inline-block;
  filter: brightness(100%);
}

.adaptive-logo img:last-child {
  display: none;
  filter: brightness(100%);
}

@media (prefers-color-scheme: dark) {
  .adaptive-logo img:first-child {
    display: none;
  }

  .adaptive-logo img:last-child {
    display: inline-block;
  }
}
</style>
