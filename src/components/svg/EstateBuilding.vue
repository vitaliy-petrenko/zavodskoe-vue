<template>
  <g class="svg-estate-building-group">
    <polygon
        class="svg-estate-building"
        :points="clickPoints"
        @click="onSelect"
    >
    </polygon>
  </g>
</template>

<style lang="less">
  .svg-estate-building {
    stroke-width: 0;
    cursor: pointer;
    transition: fill .1s;
    fill: transparent;
    position: relative;
    z-index: 1;

    &.is-selected {
      fill: transparent;
    }

    &:hover {
      z-index: 2;
    }
  }

  .svg-estate-building-group {
    position: relative;
    z-index: 2;
    will-change: opacity;
    transition: opacity .2s;

    &.is-selected {
      position: relative;
      z-index: 1;
    }

    &.is-disabled {
      opacity: .2;
    }
  }
</style>

<script>
  export default {
    props: ['building', 'selected', 'select', 'showTooltip', 'hideTooltip', 'filters'],
    data() {
      return ({
        clickPoints: this.building.polygon
      });
    },

    methods: {
      onSelect(event) {
        event.stopPropagation();
        this.select(this.building.id);
      }
    }
  };
</script>
