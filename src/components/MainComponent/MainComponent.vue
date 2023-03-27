<template>
  <div @keydown.esc="closeModal">
    <button 
      class="add-button" 
      @click="showModal = true">
      <add-icon :size="45" />
    </button>
    <DataTable :data="data" />
    <Modal 
      v-show="showModal" 
      :data="data" 
      @close="closeModal" />
  </div>
</template>

<script>
import Modal from "@/components/ModalComponent/Modal.vue";
import DataTable from "@/components/DataTableComponent/DataTable.vue";
import AddIcon from "vue-material-design-icons/AccountPlus.vue";

export default {
  name: "MainComponent",
  components: {
    Modal,
    DataTable,
    AddIcon,
  },
  data() {
    return {
      showModal: false,
      data: [],
    };
  },
  watch: {
    data(newVal) {
      let jsonString = JSON.stringify(newVal);
      localStorage.data = jsonString;
    },
  },
  mounted() {
    if (localStorage.data) {
      const data = JSON.parse(localStorage.data);
      this.data.push(...data);
    }
  },
  methods: {
    closeModal() {
      this.showModal = false;
    },
  },
};
</script>

<style scoped>
.add-button {
  cursor: pointer;
  position: fixed;
  bottom: 50px;
  right: 50px;
  background-color: #53bac2;
  color: white;
  border: none;
  padding: 5px;
  height: 100px;
  width: 100px;
  box-shadow: 0 2px 4px darkslategray;
  border-radius: 50%;
  z-index: 1;
  transition: all 0.3s;
}
.add-button:active {
  transform: scale(0.9);
}
</style>
