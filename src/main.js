// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
// import SelectComponent from "./Components/SelectComponent/SelectComponent.vue";

Vue.config.productionTip = false
library.add(faPhone);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App, FontAwesomeIcon },
  template: '<App/>'
})
