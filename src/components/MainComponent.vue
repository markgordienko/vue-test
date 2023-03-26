<template>
  <div>
    <button @click="test">test</button>
    <button 
      class="btn"
      @click="showModal = true"><add-icon :size="45" /></button>
    <DataTable :data="data" />
    <Modal
      v-show="showModal"
      :data="data"
      @close="closeModal"
    />
  </div>
</template>

<script>
import Modal from './ModalComponent/Modal.vue';
import DataTable from './DataTableComponent/DataTable.vue';
import AddIcon from 'vue-material-design-icons/AccountPlus.vue';


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
  mounted() {
  },
  methods: {
    closeModal() {
        this.showModal = false;
      },
      test() {
        console.log(this.data);
      }
  }
};
</script>

<style scoped>
.btn {
  position: fixed;
  bottom: 50px;
  right: 50px;
  background-color: #48abe0;
  color: white;
  border: none;
  padding: 5px;
  font-size: 31px;
  height: 100px;
  width: 100px;
  box-shadow: 0 2px 4px darkslategray;
  border-radius: 50%;
  z-index: 1;
}

</style>
