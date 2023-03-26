<template>

  <div >
    <table 
      v-if="rows.length > 0" 
      class="table"
    >
      <thead>
        <tr>
          <th
            v-for="column in columns"
            :key="column.dataKey"
            class="text-left"
          >
            <span>
              <h2>{{ column.name }}</h2>
            </span>

          </th>
        </tr>
      </thead>
      <tbody>
        <tr 
          v-for="row in rows" 
          :key="row.code">
          <td
            v-for="column in columns"
            :key="column.dataKey"
            :class="column.align"
          >
            {{ row[column.dataKey] }}
          </td>
        </tr>
      </tbody>
    </table>
    <h1 v-else>Таблица пока пуста :(</h1>
  </div>
</template>
  
  <script>
  export default {
    name: "DataTable",
    props: {
        data: {
            type: Array,
            required: true
        }
    },
    data() {
      return {
        msg: "Welcome to Your Vue.js App",
        showModal: false,
        columns: [
            {
            dataKey: "name",
            name: "Имя",
            align: "left",
        },
        {
          dataKey: "phone",
          name: "Телефон",
          align: "left",
        },],
        rows: [
        {
          name: "CAM1",
          phone: 1,
        },
        {
          name: "CAM2",
          phone: 2,
        },
        ]

      };
    },
    mounted() {
        this.rows = this.data;
  console.log(this.data)
    },
    methods: {
      closeModal() {
          localStorage.test = "newName";
          this.showModal = false;
        }
    }
  };
  </script>
  
  <style scoped>
  /* table {
    display: table;
    border-collapse: collapse;
    border-spacing: 2px;
    border-color: black;
    width: 100%;
  }
  th {
    border-bottom: 2px solid black;
    text-align: center;
  }
  td.left {
    border: 2px solid black;
    text-align: center;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
    padding-right: 10px;
  }
  td.right {
    text-align: center;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
    padding-right: 10px;
  }
  td.center {
    
    text-align: center;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
    padding-right: 10px;
  } */

  html,
body {
  height: 100%;
}
.container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
table {
  width: 100%;
  border-collapse: collapse;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0,0,0,0.1);
}
th,
td {
  padding: 15px;
  background-color: rgba(255,255,255,0.2);
  color: #fff;
}
thead th {
  background-color: #55608fc2;
  border: 2px solid rgba(255,255,255,0.3);
}
tbody tr:hover {
  background-color: rgba(255,255,255,0.3);
}
tbody td {
  position: relative;
  border: 2px solid rgba(255,255,255,0.3);
}
tbody td:hover:before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: -9999px;
    bottom: -9999px;
    background-color: rgba(255,255,255,0.2);
    z-index: -1;
}



  </style>
  