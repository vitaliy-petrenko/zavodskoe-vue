<style lang="less">
  @import "../../less/variables.less";
  @ratio: 2;
  .layer() {
    min-width: @ratio * 1640px;
    min-height: @ratio * 610px;
    position: relative;
    width: 100%;
    height: 100%;
    user-select: none;
  }
  .svg-index {
    .layer;
  }
  .svg-bg .bg_a {
    stroke: rgb(153, 153, 153);
    stroke-width: 0;
    fill: none;
  }
  .svg-bg .bg_b {
    stroke: #bdbfbd;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: .25px;
    fill: none;
  }
  .svg-tooltip {
    background: #000;
    border-radius: 3px;
    color: #fff;
    position: absolute;
    font-size: 12px;
    text-align: center;
    transition: opacity .1s .2s, background .2s, transform .2s;
    padding: 0 4px;
    white-space: nowrap;
    min-width: 60px;
    height: 30px;
    line-height: 30px;
    left: -(60px/2);
    top: -(30px + 16px);
    transform: translate3d(0, 0, 0);
    pointer-events: none;
    opacity: .9;
    &.is-hidden {
      opacity: 0;
    }
  }
  .layer {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
  }
  .layer--events {
    pointer-events: all;
  }
</style>

<template>
  <div class="svg-index">
    <svg xmlns="http://www.w3.org/2000/svg" class="layer layer--events layer--clicker svg-bg" version="1.1" :viewBox="viewBox" :preserveAspectRatio="preserveAspectRatio">
      <streets></streets>
      <drop-shadows></drop-shadows>
      <g v-if="selected">
        <way v-if="hasSelectedItem" :path="path" :showTooltip="showTooltip" :hideTooltip="hideTooltip" v-for="path in selected.paths" :key="path.distance"></way>
      </g>
      <contours></contours>
      <viz
          v-for="building in buildings"
          :key="building.id + '.viz'"
          :building="building"
          :selected="selected"
          :filters="filters"
      >
      </viz>
      <service></service>
      <own-shadows></own-shadows>
      <icons></icons>
      <estate-building
          v-for="building in buildings"
          :key="building.id"
          :building="building"
          :select="_select"
          :showTooltip="showTooltip"
          :hideTooltip="mouseOutTooltipHide"
      >
      </estate-building>
    </svg>

    <div v-if="hasSelectedItem" class="svg-tooltip" :class="{ 'is-hidden': !tooltip.show }" :style="style">{{tooltip.distance}}</div>
  </div>
</template>


<script>
  import invertColor from 'invert-color';
  import EstateBuilding from './EstateBuilding';
  import Icons from './Icons.vue';
  import Service from './Service.vue';
  import Streets from './Streets.vue';
  import DropShadows from './DropShadows.vue';
  import Contours from './Contours.vue';
  import OwnShadows from './OwnShadows.vue';
  import Way from './Way.vue';
  import Viz from './Viz.vue';
  import { pluralize } from '../../utils/other';
  import locale from '../../utils/locale';
  const DEFAULT_TOOLTIP_PROPS = {
    show: false,
    distance: null,
    x: 0,
    y: 0,
  };
  export default {
    props: ['buildings', 'selected', 'select', 'scrollerElement', 'filters'],
    data() {
      return ({
        tooltip: {
          ...DEFAULT_TOOLTIP_PROPS,
          timeout: undefined
        },
        viewBox: '-200 -50 1400 720',
        preserveAspectRatio: 'xMinYMid meet',
      });
    },
    computed: {
      style() {
        const { bg, x, y, color } = this.tooltip;
        return `
          background-color: ${bg};
          color: ${color};
          transform: translate3d(${x}px, ${y}px, 0);
        `;
      },
      hasSelectedItem() {
        return this.selected && this.selected.id;
      }
    },
    methods: {
      //todo: use drag area instead of scrolling
      getScrollerOffsets() {
        const { scrollLeft, scrollTop, offsetLeft, offsetTop } = this.$parent.$refs.scrollerElement;
        return { scrollLeft, scrollTop, offsetLeft, offsetTop };
      },
      /**
       * @param {Number} mouseX
       * @param {Number} mouseY
       * @param {Number} distance
       * @param {String} bg
       */
      showTooltip(mouseX, mouseY, distance, bg = '#000') {
        const
          { scrollLeft, scrollTop, offsetLeft, offsetTop } = this.getScrollerOffsets(),
          x = mouseX,
          y = mouseY,
          meters = Math.ceil(distance);
        clearTimeout(this.tooltip.timeout);
        const NEW_TOOLTIP_PROPS = {
          show: true,
          x: x - offsetLeft + scrollLeft,
          y: y - offsetTop + scrollTop,
          distance: `${meters} ${pluralize(meters, ...locale.meters)}`,
          bg,
          color: invertColor(bg, true)
        };
        Object.assign(this.tooltip, NEW_TOOLTIP_PROPS);
      },
      hideTooltip() {
        this.tooltip.show = false;
      },
      mouseOutTooltipHide() {
        this.tooltip.timeout = setTimeout(() => {
          this.hideTooltip();
        }, 1500);
      },
      _select() {
        this.select(...arguments);
        this.hideTooltip();
      }
    },
    components: {
      EstateBuilding,
      Streets,
      DropShadows,
      Service,
      Contours,
      OwnShadows,
      Way,
      Viz,
      Icons
    }
  };
</script>