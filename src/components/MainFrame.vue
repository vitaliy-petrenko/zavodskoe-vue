<template>
  <div class="main">
    <info-block></info-block>

    <svg-index></svg-index>
  </div>
</template>

<style lang="less">
  @import "../less/variables.less";

  .main {
    position: fixed;
    height: 100%;
    left: @sidebar-width;
    right: 0;
    overflow: auto;
  }

</style>

<script>
  import InfoBlock from './InfoBlock';
  import SvgIndex from './svg/SvgIndex.vue';
  import { getEstateBuildings } from '../utils/store';

  export default {
    components: {
      InfoBlock,
      SvgIndex
    }
  };
</script>
