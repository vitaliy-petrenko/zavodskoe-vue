<template>
  <path :d="path.way" :stroke="stroke" :fill="fill" class="svg-way" :title="path.distance" @mouseover="mouseOver" @mouseout="mouseOut"></path>
</template>

<style lang="less" scoped="">
  .svg-way {
    opacity: .7;
    stroke-width: 1;
    will-change: opacity;
    animation: show .4s ease-in-out forwards;
    cursor: pointer;
    transition: stroke-width .1s, opacity .1s;
    position: relative;
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
  const TOOLTIP_SHOW_TIME = 1000;

  export default {
    props: ['path'],

    data() {
      const color = `rgb(${this.path.color})`;

      return {
        stroke: color,
        fill: color
      };
    },

    methods: {
      mouseOver() {
        console.log(this.path.distance);
        console.log(...arguments);
      },

      mouseOut() {
        console.log('out');
      }
    }
  };
</script>
