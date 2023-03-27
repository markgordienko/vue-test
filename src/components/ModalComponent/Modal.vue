<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal">
        <header class="modal-header">
          <slot> Добавление пользователя </slot>
          <button 
            class="button-close" 
            @click="close">
            <close-icon />
          </button>
        </header>

        <section class="modal-body">
          <ul class="wrapper">
            <li class="form-row">
              <label
                v-show="!isValidated && (!employeeName || !employeePhoneNumber)"
                class="validation-notification"
              >
                Поля обязательны к заполнению!
              </label>
            </li>
            <li class="form-row">
              <label> Имя </label>
              <input 
                v-model="employeeName" 
                type="text" 
                required >
            </li>
            <li class="form-row">
              <label> Телефон </label>
              <input
                v-model="employeePhoneNumber"
                type="text"
                required
                @input="validatePhoneNumber"
              >
            </li>
            <li class="form-row">
              <label> Начальник </label>
              <SelectComponent
                :options="options"
                v-model="supervisorName"
                @input="supervisorPosition = $event"
              />
            </li>
          </ul>
          <div class="form-row">
            <button 
              class="button-save" 
              @click="saveUser">Сохранить</button>
          </div>
        </section>
      </div>
    </div>
  </transition>
</template>

<script>
import SelectComponent from "./SelectComponent.vue";
import CloseIcon from "vue-material-design-icons/Close.vue";

export default {
  name: "Modal",
  components: {
    SelectComponent,
    CloseIcon,
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      employeeName: "",
      employeePhoneNumber: "",
      supervisorName: "",
      supervisorId: "",
      supervisorPosition: 0,
      isValidated: true,
    };
  },
  computed: {
    options() {
      const optionsArray = ["Отсутствует"];
      this.data.forEach((el) => {
        optionsArray.push(el.employeeName);
      });
      return optionsArray;
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },

    validatePhoneNumber() {
      var replacedInput = this.employeePhoneNumber
        .replace(/\D/g, "")
        .match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      this.employeePhoneNumber = !replacedInput[2]
        ? replacedInput[1]
        : "(" +
          replacedInput[1] +
          ") " +
          replacedInput[2] +
          (replacedInput[3] ? "-" + replacedInput[3] : "");
    },

    generateUUID() {
      return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
        (
          c ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
      );
    },

    saveUser() {
      if (this.employeeName && this.employeePhoneNumber) {
        let supervisorId =
          this.supervisorPosition === 0
            ? null
            : this.data[this.supervisorPosition - 1].employeeId;
        this.data.push({
          employeeName: this.employeeName,
          employeeId: this.generateUUID(),
          employeePhoneNumber: this.employeePhoneNumber,
          supervisorId: supervisorId,
        });
        this.isValidated = true;
      } else {
        this.isValidated = false;
      }
    },
  },
};
</script>

<style>
input:invalid {
  border-color: red;
}

input:required:focus:valid {
  background-size: 25px;
}

.validation-notification {
  color: red;
}

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
  background: #fff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  border-radius: 3%;
  width: 350px;
  overflow: visible;
}

.modal-header {
  font-weight: bold;
  padding: 15px;
  display: flex;
  position: relative;
  border-bottom: 1px solid #ddd;
  justify-content: space-between;
}

.modal-body {
  position: relative;
  padding: 10px 10px;
  overflow-y: visible;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.1s ease;
}

.wrapper {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.form-row {
  display: flex;
  justify-content: space-between;
  padding: 0.5em;
}

.form-row > label {
  padding: 0.5em 1em 0.5em 0;
}

.form-row > input,
.form-row > button {
  padding: 0.5em;
}

.form-row > button {
  background: gray;
  color: white;
  border: 0;
}

.button-close {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  background: transparent;
}

.button-save {
  cursor: pointer;
  display: inline-block;
  padding: 0.75rem 1.25rem;
  border-radius: 10rem;
  color: black;
  text-transform: capitalize;
  font-size: 1rem;
  letter-spacing: 0.15rem;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.button-save:after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #49a09d;
  border-radius: 10rem;
  z-index: -2;
}

.button-save:before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0%;
  height: 100%;
  background-color: #65cac7;
  transition: all 0.3s;
  border-radius: 10rem;
  z-index: -1;
}

.button-save:hover {
  color: #424242;
}

.button-save:active,
.button-close:active {
  transform: scale(0.9);
}

.button-save:hover:before {
  width: 100%;
}
</style>
