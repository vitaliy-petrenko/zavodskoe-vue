<template>
  <div class="container" @click="click">
    <sidebar></sidebar>
    <info-block :selected="selectedData"></info-block>
    <main-frame :buildings="buildings" :selected="selected" :select="select"></main-frame>
  </div>
</template>

<script>
  import Sidebar from './components/Sidebar';
  import MainFrame from './components/MainFrame';
  import InfoBlock from './components/InfoBlock';
  import { estateBuildings } from './utils/data';

  export default {
    name: 'App',

    data() {
      const buildings = [...estateBuildings];

      return ({
        buildings,
        selected: null
      });
    },

    methods: {
      select(id) {
        this.selected = id;
      },

      click() {
        this.select(null);
      }
    },

    computed: {
      selectedData() {
        return this.buildings[this.selected];
      }
    },

    components: {
      Sidebar,
      InfoBlock,
      MainFrame
    },
  };
</script>
