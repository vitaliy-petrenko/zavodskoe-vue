<template>
  <g class="viz-group">
    <polygon
        class="viz"
        :class="{ 'is-selected': isSelected, 'is-disabled': isDisabled }"
        v-for="points in building.viz"
        :points="points"
        v-bind:key="points"
    >
    </polygon>
  </g>
</template>

<style lang="less">
  .viz {
    fill: #fff;
    transition: opacity .1s;
    stroke-width: .3;
    stroke: #000;

    &.is-disabled {
      fill: #adadad;
    }

    &.is-selected {
      fill: red;
    }
  }


</style>

<script>
  export default {
    props: ['building', 'filters', 'selected'],

    data() {
      return ({
        clickPoints: this.building.polygon,
        viz: this.building.viz
      });
    },

    computed: {
      isSelected() {
        return this.selected && this.selected.id === this.building.id;
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
    }
  };
</script>
