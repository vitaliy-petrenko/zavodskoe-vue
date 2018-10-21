<template>
  <path :d="path.way" :stroke="stroke" :fill="fill" class="svg-way" :title="path.distance" @mouseover="mouse"></path>
</template>

<style lang="less" scoped="">
  .svg-way {
    opacity: 0;
    stroke-width: 2px;
    will-change: opacity;
    animation: show .6s ease-in-out forwards;
  }

  @keyframes show {
    to {
      opacity: 1;
    }
  }
</style>

<script>
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
      mouse() {
        console.log(this.path.distance);
        console.log(...arguments);
      }
    }
  };
</script>
