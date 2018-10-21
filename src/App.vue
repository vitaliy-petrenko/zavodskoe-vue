<template>
  <div class="container">
    <sidebar></sidebar>
    <main-frame :buildings="buildings" :selected="selected" :select="select"></main-frame>
  </div>
</template>

<script>
  import Sidebar from './components/Sidebar';
  import MainFrame from './components/MainFrame';
  import store from './utils/store';

  export default {
    name: 'App',

    data() {
      const buildings = store.estateBuildings;

      return ({
        buildings,
        selected: null
      });
    },

    methods: {
      select(id) {
        this.selected = id;
      }
    },

    components: {
      Sidebar,
      MainFrame
    },
  };
</script>
