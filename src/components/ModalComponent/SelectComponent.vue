<template>
  <div 
    :tabindex="tabindex" 
    class="custom-select" 
    @blur="open = false">
    <div 
      :class="{ open: open }" 
      class="selected" 
      @click="open = !open">
      {{ selected }}
    </div>
    <div 
      :class="{ 'select-hide': !open, 'scroll-container': options.length > 5
      }"
      class="items">
      <div
        v-for="(option, i) of options"
        :key="i"
        @click="
          selected = option;
          open = false;
          $emit('input', i);
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
    tabindex: {
      type: Number,
      required: false,
      default: 0,
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
  mounted() {
    // this.$emit("input", this.selected);
  },
};
</script>

<style scoped>
.custom-select {
  position: relative;
  width: 186px;
  text-align: left;
  outline: none;
  height: 34px;
  line-height: 34px;
}

.custom-select .selected {
  border-radius: 3px;
  border: 1px solid #666666;
  padding-left: 1em;
  cursor: pointer;
  user-select: none;
}

.custom-select .selected.open {
  border: 1px solid #49a09d;
  border-radius: 6px 6px 0px 0px;
}

.custom-select .selected:after {
  position: absolute;
  content: "";
  top: 22px;
  right: 1em;
  width: 0;
  height: 0;
  border: 5px solid transparent;
  border-color: #fff transparent transparent transparent;
}

.custom-select .items {
  max-height: 200px;
  border-radius: 0px 0px 6px 6px;
  border-right: 1px solid #49a09d;
  border-left: 1px solid #49a09d;
  border-bottom: 1px solid #49a09d;
  position: absolute;
  background-color: #ffffff;
  left: 0;
  right: 0;
  z-index: 1;
}
.scroll-container{
  overflow-y: scroll;
}

.custom-select .items div {
  padding-left: 1em;
  cursor: pointer;
  user-select: none;
}

.custom-select .items div:hover {
  background-color: #49a09d;
}

.select-hide {
  display: none;
}
</style>