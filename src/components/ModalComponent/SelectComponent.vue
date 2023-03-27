<template>
  <div 
    class="select-component" 
    @blur="open = false">
    <div 
      :class="{ open: open }" 
      class="selected" 
      @click="open = !open">
      {{ selected }}
    </div>
    <div
      :class="{ 'select-hide': !open, 'scroll-container': options.length > 5 }"
      class="items"
    >
      <div
        v-for="(option, index) of options"
        :key="index"
        @click="
          selected = option;
          open = false;
          $emit('input', index);
        "
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SelectComponent",
  props: {
    options: {
      type: Array,
      required: true,
    },
    default: {
      type: String,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      selected: this.default
        ? this.default
        : this.options.length > 0
        ? this.options[0]
        : null,
      open: false,
    };
  },
};
</script>

<style scoped>
.select-component {
  position: relative;
  width: 186px;
  text-align: left;
  outline: none;
  height: 34px;
  line-height: 34px;
}

.select-component .selected {
  border-radius: 3px;
  border: 1px solid #666;
  padding-left: 1em;
  cursor: pointer;
  user-select: none;
}

.select-component .selected.open {
  border: 1px solid #49a09d;
  border-radius: 6px 6px 0px 0px;
}

.select-component .selected:after {
  position: absolute;
  content: "";
  top: 22px;
  right: 1em;
  width: 0;
  height: 0;
  border: 5px solid transparent;
  border-color: #fff transparent transparent transparent;
}

.select-component .items {
  max-height: 200px;
  border-radius: 0px 0px 6px 6px;
  border-right: 1px solid #49a09d;
  border-left: 1px solid #49a09d;
  border-bottom: 1px solid #49a09d;
  position: absolute;
  background-color: #fff;
  left: 0;
  right: 0;
  z-index: 1;
}

.select-component .items div {
  padding-left: 1em;
  cursor: pointer;
  user-select: none;
}

.select-component .items div:hover {
  background-color: #49a09d;
}

.select-hide {
  display: none;
}

.scroll-container {
  overflow-y: scroll;
}
</style>
