<template>
  <g>
    <polygon v-bind:points='points' class="svg-estate-building" v-bind:fill='fill' v-on:click="select" v-bind:class="{ 'is-selected': isSelected }"/>
  </g>
</template>

<style lang="less">
  .svg-estate-building {
    stroke-width: 0;
    /*stroke: #000;*/
    cursor: pointer;
    transition: fill .2s, transform .2s;

    &:hover, &.is-selected {
      /*fill: red!important;*/
    }
  }
</style>

<script>
  import store from '../../utils/store';

  const
    DEFAULT_COLOR = '#000',
    COLORS = {
      0: DEFAULT_COLOR
    };

  let selected = 0;

  export default {
    props: ['building', 'selected'],
    data() {

      const isSelected = selected === this.building.id;

      return {
        fill: (COLORS[this.building.type] || DEFAULT_COLOR),
        points: this.building.polygon,
        isSelected
      };
    },

    methods: {
      select() {
        selected = this.building.id;
      }
    }
  };
</script>
