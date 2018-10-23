<template>
  <div class="main" ref="scrollerElement">
    <svg-index :buildings="buildings" :selected="selected" :select="select"></svg-index>
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
  import SvgIndex from './svg/SvgIndex.vue';

  export default {
    props: ['buildings', 'selected', 'select'],

    components: {
      SvgIndex
    },
  };
</script>
