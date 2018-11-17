<template>
  <div class="container" @click="click">
    <sidebar :toggleFilter="toggleFilter" :changeFilter="changeFilter" :filters="filters"></sidebar>
    <info-block :selected="selected"></info-block>
    <main-frame :buildings="buildings" :selected="selected" :select="select" :filters="filters"></main-frame>
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
  import { estateBuildings, ADMIN_TYPES, MIN_MAX_DISTANCES } from './utils/data';
  import locale from './utils/locale';
  import { deepCloneCollection } from './utils/other';

  const
    initialFilters = Object.entries(ADMIN_TYPES).reduce((result, [type, key]) => {
      const
        maxValue = Math.ceil(MIN_MAX_DISTANCES[type].max),
        minValue = Math.ceil(MIN_MAX_DISTANCES[type].min);

      result[type] = {
        type,
        key,
        text: locale.types[key],
        minValue: minValue,
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
      select(id) {
        this.selected = this.buildings[id];
      },

      click() {
        this.select(null);
      },

      toggleFilter(type) {
        const oldValue = this.filters[type].isActive;
        this.filters[type].isActive = !oldValue;
      },

      changeFilter(filter) {
        this.filters[filter.type] = { ...filter };
      }
    },

    components: {
      Sidebar,
      InfoBlock,
      MainFrame
    },
  };
</script>
