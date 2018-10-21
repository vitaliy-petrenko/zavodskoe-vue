<template>
  <g>
    <polygon
        class="svg-estate-building"
        :points="points"
        :fill="fill"
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
    transition: fill .2s, transform .2s;

    &:hover, &.is-selected {
      fill: red !important;
    }
  }
</style>

<script>
  import store from '../../utils/store';
  import Way from './Way';

  const
    DEFAULT_COLOR = '#000',
    COLORS = {
      0: DEFAULT_COLOR
    };

  export default {
    props: ['building', 'selected', 'select'],
    data() {
      return {
        fill: (COLORS[this.building.type] || DEFAULT_COLOR),
        points: this.building.polygon
      };
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
