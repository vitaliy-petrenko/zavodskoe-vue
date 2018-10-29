<template>
  <div class="container" @click="click">
    <sidebar :toggleFilter="toggleFilter" :applyFilter="applyFilter" :filters="filters"></sidebar>
    <info-block :selected="selectedData"></info-block>
    <main-frame :buildings="buildings" :selected="selected" :select="select"></main-frame>
  </div>
</template>

<style lang="less">
  .container {
    user-select: none;
  }
</style>

<script>
  import Sidebar from './components/Sidebar';
  import MainFrame from './components/MainFrame';
  import InfoBlock from './components/InfoBlock';
  import { estateBuildings, ADMIN_TYPES, MAX_DISTANCES } from './utils/data';
  import locale from './utils/locale';
  import { deepCloneCollection } from './utils/other';

  const
    filter = (buildings, filters) => {
      return buildings;
    },

    initialFilters = Object.entries(ADMIN_TYPES).reduce((result, [type, key]) => {
      const maxValue = Math.ceil(MAX_DISTANCES[type]);

      result[type] = {
        type,
        key,
        text: locale.types[key],
        minValue: 0,
        maxValue: maxValue,
        isActive: false,
        value: maxValue
      };

      return result;
    }, {});

  export default {
    name: 'App',

    data() {
      return ({
        buildings: deepCloneCollection(estateBuildings),
        selected: null,
        filters: { ...initialFilters }
      });
    },

    methods: {
      filterBuildings() {
        this.buildings = filter(deepCloneCollection(this.buildings), this.filters);
      },

      select(id) {
        this.selected = id;
      },

      click() {
        this.select(null);
      },

      toggleFilter(filter) {
        console.log('toggle', filter);
      },

      applyFilter(filter, minValue, maxValue) {
        console.log('apply', ...arguments);
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
