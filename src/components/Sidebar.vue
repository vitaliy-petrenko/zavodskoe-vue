<template>
  <div class="sidebar" @click="stopPropagation">
    <div class="sidebar__filters">
      <div class="filter" v-for="filter in filtersList" v-bind:key="filter.key">
        <div class="filter__checkbox filter__item">
          <label class="filter-checkbox" :class="filter.className">
            <input type="checkbox" v-model="filter.isActive">
            <span class="filter-checkbox__label">
              {{filter.text}}
            </span>
          </label>
        </div>
        <div class="filter__row">
          <div class="filter__item filter__range">
            <vue-slider
                v-model="filter.value"
                :max="filter.maxValue"
                :tooltip="false"
                :min="0"
                :dotSize="12"
                :height="2"
            ></vue-slider>
          </div>

          <div class="filter__item filter__value">{{filter.value}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
  @import "../less/variables.less";

  .sidebar {
    font-size: 13px;
    position: fixed;
    background: @sidebar-bg;
    left: 0;
    top: 0;
    width: @sidebar-width;
    height: 100%;
    padding: @sections-padding;
    overflow: auto;

    .vue-slider-component {
      .vue-slider-dot .vue-slider-dot-handle {
        border: 2px solid #000;
        box-shadow: none;
        border-radius: 50%;
        background: @sidebar-bg;
      }

      .vue-slider-process {
        background: #000;
      }

      .vue-slider {
        background: #dbe2e8;
      }
    }
  }

  .filter {
    & + & {
      margin-top: @grid-size * 6;
    }
  }

  .filter__row {
    display: flex;
    align-items: center;
    margin-top: @grid-size * 4;
  }

  .filter__item {
    & + & {
      margin-left: @grid-size * 4;
    }
  }

  .filter__value {
    width: 34px;
    white-space: nowrap;
  }

  .filter__value--from {
    text-align: right;
  }

  .filter__range {
    flex: 1;
  }

  .filter-checkbox {
    line-height: @grid-size * 4;
    text-transform: uppercase;
    cursor: pointer;
    display: block;

    .filter-checkbox__label {
      position: relative;
      padding-left: @grid-size * 6;

      &:before {
        content: '';
        display: block;
        width: @grid-size * 4;
        height: @grid-size * 4;
        border: 1px solid #000;
        position: absolute;
        left: 0;
        top: 0;
        transform: translateY(-.5px);
        transition: background .05s;
      }
    }

    &--kindergarten input:checked ~ .filter-checkbox__label:before {
      background: @kindergarten;
    }

    &--school input:checked ~ .filter-checkbox__label:before {
      background: @school;
    }

    &--hospitals input:checked ~ .filter-checkbox__label:before {
      background: @hospitals;
    }

    &--cultural_institutions input:checked ~ .filter-checkbox__label:before {
      background: @cultural_institutions;
    }

    &--parking input:checked ~ .filter-checkbox__label:before {
      background: @parking;
    }

    &--market input:checked ~ .filter-checkbox__label:before {
      background: @market;
    }

    &--stop input:checked ~ .filter-checkbox__label:before {
      background: @stop;
    }

    input {
      display: none;
    }
  }
</style>

<script>
  import VueSlider from 'vue-slider-component';
  import { ADMIN_TYPES } from '../utils/data';

  export default {
    props: ['filters', 'applyFilter', 'toggleFilter'],

    data() {
      return {
        filtersList: Object.values(this.filters).map(filter => {
          return {
            ...filter,
            className: `filter-checkbox--${ADMIN_TYPES[filter.type]}`
          };
        })
      };
    },

    methods: {
      stopPropagation(event) {
        event.stopPropagation();
      }
    },

    components: { VueSlider }
  };
</script>
