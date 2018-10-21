<template>
  <div class="info-block">
    Info block
  </div>
</template>

<style lang="less">
  @import "../less/variables.less";

  .info-block {
    position: fixed;
    z-index: 4;

    top: 0;
    left: @sidebar-width;
    height: auto;
    max-height: 60vh;
    width: @info-block-width;
    padding: @sections-padding;
    background: rgba(255, 255, 255, .5);
  }
</style>
