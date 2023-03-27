<template>
  <transition name="modal-fade">
    
    <div class="modal-backdrop">
      <div 
        class="modal" 
        role="dialog" 
        aria-labelledby="modalTitle" 
        aria-describedby="modalDescription">
        <header 
          id="modalTitle" 
          class="modal-header">
          <slot> Добавление пользователя </slot>
          <button 
            type="button" 
            class="btn-close" 
            aria-label="Close modal" 
            @click="close">
            <close-icon/>
          </button>
        </header>

        <section 
          
          id="modalDescription" 
          class="modal-body">
          <ul class="wrapper">
            <li class="form-row">
              <label 
                v-show="!isValidated && (!employeeName || !employeePhoneNumber)"
                class="validation-notification" 
                for="name"> Поля обязательны к заполнению! </label>
            </li>
            <li class="form-row">
              <label for="name"> Имя </label>
              <input 
                v-model="employeeName" 
                type="text"
                required>
            </li>
            
            <li class="form-row">
              <label> Телефон </label>
              <input 
                v-model="employeePhoneNumber" 
                type="text"
                required
                class="ph"
                @input="acceptNumber">
                
            </li>
            <li class="form-row">
              <label for="email"> Начальник </label>
              <SelectComponent 
                :options="opt" 
                v-model="supervisorName" 
                class="select" 
                @input="supervisorPos = $event" />
            </li>
          </ul>
          <div class="form-row">
            <button 
              class="button" 
              @click="test">Сохранить</button>
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
      id: "",
      supervisorName: "",
      supervisorPos: 0,
      supervisorId: "",
      isValidated: true,
    };
  },
  computed: {
    opt() {
      const ar = ["Отсутствует"];
      this.data.forEach((el) => {
        ar.push(el.employeeName);
      });
      return ar;
    },
  },
  methods: {
    acceptNumber() {
      var replacedInput = this.employeePhoneNumber.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      this.employeePhoneNumber = !replacedInput[2] ? replacedInput[1] : '(' + replacedInput[1] + ') ' + replacedInput[2] + (replacedInput[3] ? '-' + replacedInput[3] : '');
    },
    uuidv4() {
      return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
        (
          c ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
      );
    },
    close() {
      this.$emit("close");
    },
    test() {
      if (this.employeeName && this.employeePhoneNumber) {       
      let supervisorId =
        this.supervisorPos === 0
          ? null
          : this.data[this.supervisorPos - 1].employeeId;

      this.data.push({
        employeeName: this.employeeName,
        employeeId: this.uuidv4(),
        employeePhoneNumber: this.employeePhoneNumber,
        supervisorId: supervisorId,
      });
      this.isValidated = true;
      } else {
        // console.log("why")
        this.isValidated = false;
      }
    },
    te(val) {
      // console.log(val)
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
  background: #ffffff;
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
  font-weight: bold;
  padding: 15px;
  display: flex;
}

.modal-header {
  position: relative;
  border-bottom: 1px solid #eee;
  justify-content: space-between;
}

.modal-footer {
  border-top: 1px solid #eee;
  flex-direction: column;
}

.modal-body {
  position: relative;
  padding: 10px 10px;
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
  background: transparent;
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

.form-row>label {
  padding: 0.5em 1em 0.5em 0;
  /* flex: 1; */
}

.form-row>input,
.form-row>button {
  padding: 0.5em;
}

.form-row>button {
  background: gray;
  color: white;
  border: 0;
}
.button {
  cursor: pointer;
  display: inline-block;
  padding: 0.75rem 1.25rem;
  border-radius: 10rem;
  color: black;
  text-transform:capitalize;
  font-size: 1rem;
  letter-spacing: 0.15rem;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
  z-index: 1;
}
.button:after {
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
.button:before {
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
.button:hover {
  color: #424242;
}
.button:active, .btn-close:active {
  transform: scale(0.9);
}
.button:hover:before {
  width: 100%;
}
.validation-notification {
  color: red;
}
</style>