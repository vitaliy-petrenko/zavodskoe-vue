<template>
  <div class="sidebar">
    Sidebar
  </div>
</template>

<style lang="less">
  @import "../less/variables.less";

  .sidebar {
    position: fixed;
    background: @sidebar-bg;
    left: 0;
    top: 0;
    width: @sidebar-width;
    height: 100%;
    padding: @sections-padding;
  }
</style>
