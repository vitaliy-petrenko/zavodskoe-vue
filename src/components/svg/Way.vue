<template>
  <path :d="path.way" :stroke="path.color" class="svg-way" @mouseover="mouseOver" @mouseout="mouseOut"></path>
</template>

<style lang="less" scoped="">
  .svg-way {
    opacity: .7;
    stroke-width: 1.5;
    will-change: opacity;
    animation: show .4s ease-in-out forwards;
    cursor: pointer;
    transition: stroke-width .1s, opacity .1s;
    position: relative;
    fill: transparent;
    stroke-linecap: round;

    &:hover {
      stroke-width: 3;
    }
  }

  .svg-way-shadow {
    stroke: transparent;
    fill: transparent
  }

  @keyframes show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>

<script>
  export default {
    props: ['path', 'showTooltip', 'hideTooltip'],

    methods: {
      mouseOver({ pageX = 0, pageY = 0 } = {}) {
        this.showTooltip(pageX, pageY, this.path.distance, this.path.color);
      },

      mouseOut() {
        this.hideTooltip();
      }
    }
  };
</script>
