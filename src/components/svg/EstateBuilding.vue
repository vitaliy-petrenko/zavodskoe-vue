<template>
  <g class="svg-estate-building-group" :class="{ 'is-selected': isSelected }">
    <polygon
        class="svg-estate-building"
        :points="points"
        @click="onSelect"
        :class="{ 'is-selected': isSelected }"
    >
    </polygon>

    <way v-if="isSelected" :path="path" :showTooltip="showTooltip" :hideTooltip="hideTooltip" v-for="path in building.paths" :key="path.distance"></way>
  </g>
</template>

<style lang="less">
  .svg-estate-building {
    stroke-width: 0;
    cursor: pointer;
    transition: fill .1s;
    fill: #000;
    position: relative;
    z-index: 1;

    &.is-selected {
      fill: #f00;
      pointer-events: none;
    }

    &:hover {
      fill: darken(#f00, 5%);
      z-index: 2;
    }

    &:active {
      fill: #f00;
    }
  }

  .svg-estate-building-group {
    position: relative;
    z-index: 2;
    &.is-selected {
      position: relative;
      z-index: 1;
    }
  }
</style>

<script>
  import Way from './Way';

  export default {
    props: ['building', 'selected', 'select', 'showTooltip', 'hideTooltip'],
    data() {
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
      onSelect(event) {
        event.stopPropagation();
        this.select(this.building.id);
      }
    },

    components: {
      Way
    }
  };
</script>
