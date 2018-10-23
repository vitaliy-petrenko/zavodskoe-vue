<template>
  <div class="info-block" :class="{'is-active': show}">
    <div class="info-block__title" v-if="selected">
      B - {{selected.id}}
    </div>

    <div class="info-block__section">
      <div class="info-block__meta-item" v-for="(item, index) in list" :key="index">
        {{item.field}} - {{item.value}}
      </div>
    </div>

    <div class="info-block__section">

      <div class="info-block__section-title">
        {{locale.distance.title}}:
      </div>
      <div class="info-block__meta-item">
        тут вот расстояния вместе с фильтрами добавятся
      </div>
    </div>
  </div>
</template>

<style lang="less">
  @import "../less/variables.less";

  .info-block {
    position: fixed;
    z-index: 4;
    top: 0;
    left: @sidebar-width;
    height: auto;
    max-height: 100%;
    overflow: auto;
    width: @info-block-width;
    padding: @sections-padding;
    background: rgba(255, 255, 255, .95);
    transform: translate3d(-10px, 0, 0);
    opacity: 0;

    &.is-active {
      transform: translate3d(0, 0, 0);
      opacity: 1;
      transition: opacity .2s, transform .2s;
    }
  }

  .info-block__section {
    & + & {
      margin-top: @grid-size * 6;
    }
  }

  .info-block__title {
    color: @info-block-title-color;
    font-size: @info-block-title-size;
    margin-bottom: @grid-size * 10;
  }

  .info-block__section-title {
    color: @info-block-section-title;
    margin-bottom: @grid-size * 6;
  }
</style>

<script>
  import { META_FIELDS } from '../utils/data';
  import locale from '../utils/locale';

  export default {
    props: ['selected'],

    data() {
      return {
        locale: {
          distance: { ...locale.distance }
        }
      };
    },

    computed: {
      show() {
        return !!this.selected;
      },

      list() {
        const list = [];

        this.selected && META_FIELDS.forEach(field => {
          const value = this.selected[field];
          if (this.selected[field]) {
            list.push({
              field: locale.meta[field],
              value
            });
          }
        });

        return list;
      }
    }
  };
</script>
