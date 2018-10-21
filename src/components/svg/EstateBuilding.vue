<template>
  <g>
    <polygon
        class="svg-estate-building"
        :points="points"
        @click="onSelect"
        :class="{ 'is-selected': isSelected }"
    >
    </polygon>

    <g v-if="isSelected" v-for="path in building.paths" :key="path.distance">
      <way :path="path"></way>
    </g>
  </g>
</template>

<style lang="less">
  .svg-estate-building {
    stroke-width: 0;
    cursor: pointer;
    transition: fill .1s;
    fill: #000;

    &.is-selected {
      fill: #f00;
      pointer-events: none;
    }

    &:hover {
      fill: darken(#f00, 5%);
    }

    &:active {
      fill: #f00;
    }
  }
</style>

<script>
  import store from '../../utils/store';
  import Way from './Way';

  export default {
    props: ['building', 'selected', 'select'],
    data() {

      console.log(this.building.type);
      return ({
        points: this.building.polygon
      });
    },

    computed: {
      isSelected() {
        return this.selected === this.building.id;
      }
    },

    methods: {
      onSelect() {
        this.select(this.building.id);
      }
    },

    components: {
      Way
    }
  };
</script>
