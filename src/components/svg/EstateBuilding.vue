<template>
  <g class="svg-estate-building-group" :class="{ 'is-selected': isSelected, 'is-disabled': isDisabled }">
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
  import Way from './Way';

  export default {
    props: ['building', 'selected', 'select', 'showTooltip', 'hideTooltip', 'filters'],
    data() {
      return ({
        points: this.building.polygon
      });
    },

    computed: {
      isSelected() {
        return this.selected === this.building.id;
      },

      isDisabled() {
        const filters = Object.values(this.filters).filter(filter => filter.isActive);

        if (filters.length) {
          let isDisabled = false;
          filters.forEach(({ type, value }) => {
            if (this.building.distances[type] > value) {
              isDisabled = true;

              return false;
            }
          });

          return isDisabled;
        } else {
          return false;
        }
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
