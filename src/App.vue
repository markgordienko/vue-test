<template>
  <div class="app-wrapper">
    <MainComponent />
  </div>
</template>

<script>
import MainComponent from "./components/MainComponent/MainComponent.vue";

export default {
  name: "App",
  components: {
    MainComponent,
  },
};
</script>

<style>
html {
  background: linear-gradient(45deg, #49a09d, #5f2c82);
}
.app-wrapper {
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}
</style>
