<template>
  <transition name="modal-fade">
    
    <div class="modal-backdrop">
      <div 
        class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header
          id="modalTitle"
          class="modal-header"
        >
          <slot name="header">
            Добавление пользователя
          </slot>
          <button
            type="button"
            class="btn-close"
            aria-label="Close modal"
            @click="close"
          > x
          </button>
        </header>

        <section
          id="modalDescription"
          class="modal-body"
        >
          <ul class="wrapper">
            <li class="form-row">
              <label for="name"> Имя </label>
              <input 
                v-model="employeeName"
                type="text">
            </li>
            <li class="form-row">
              <label for="townborn"> Телефон </label>
              <input 
                v-model="employeePhoneNumber"
                type="text">
            </li>
            <li class="form-row">
              <label for="email"> Начальник </label>
              <SelectComponent
                :options="opt"
                class="select"
                @input="te($event)"
              />
            </li>
            <li class="form-row">
              <button 
                type="submit" 
                @click="saveUser"> Сохранить </button>
            </li>
          </ul>
        </section>
      </div>
    </div>
  </transition>
</template>


<script>

import SelectComponent from "./SelectComponent.vue";

  export default {
    name: "Modal",
    components: {
      SelectComponent
    },
    props: {
        data: {
            type: Array,
            required: true
        },
    },
    data() {
    return {
      employeeName: "",
      employeePhoneNumber: "",
      sel: "",
      supervisor: ""
    };
  },
  computed: {
    opt() {
      const ar = [];
      this.data.forEach((el) => {
        ar.push(el.name);
});
      return ar;
    }
  },
    methods: {
      close() {
        this.$emit('close');
      },
      saveUser() {
        this.data.push({name: this.employeeName, phone: this.employeePhoneNumber, boss: this.supervisor});
        this.$emit('close');
      },
      te(val) {
console.log(val)
      }
    },
  };
</script>

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    border-radius: 3%;
    width: 350px;
    overflow: visible;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    position: relative;
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    flex-direction: column;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
    overflow-y: visible;
  }

  .btn-close {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
  }

  .btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
  }

  .modal-fade-enter,
  .modal-fade-leave-to {
    opacity: 0;
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity .1s ease;
  }
    .wrapper {
    list-style-type: none;
    padding: 0;
  }
  .form-row {
    display: flex;
    justify-content: space-between;
    padding: .5em;
  }
  .form-row > label {
    padding: .5em 1em .5em 0;
    /* flex: 1; */
  }
  .form-row > input,
  .form-row > button {
    padding: .5em;
  }
  .form-row > button {
   background: gray;
   color: white;
   border: 0;
  }
</style>