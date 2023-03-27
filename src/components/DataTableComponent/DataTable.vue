<template>
  <div>
    <table 
      v-if="filteredRows.length > 0" 
      class="table">
      <thead>
        <tr>
          <th 
            v-for="column in columns" 
            :key="column.dataKey" 
            class="text-left"
            @click="sort(column.dataKey)">
            <span>
              <h2>{{ column.name }}</h2>
            </span>
          </th>
        </tr>
      </thead>
      <!-- <tbody>
        <tr 
          v-for="row in filteredRows"
          :key="row.code">
          <td
            v-for="column in columns"
            :key="column.dataKey"
            :class="column.align"
            @click="test(row)">
            {{ row[column.dataKey] }}
          </td>
        </tr>
      </tbody> -->
      <!-- <tbody> -->

      <!-- </tbody> -->
    </table>
    <h1 
      v-else 
      style="color: white">Таблица пока пуста :)</h1>
    <ExpandableRow
      v-for="row in filteredRows"
      :is-expanded="isExp(row)"
      :key="row.employeeId"
      :row="row"
      :rows="rows"
      :frows="getF(row)" 
      :columns="columns"
      :test="test"
      @expand="updateRowExpansion($event.employeeId)"
    />
  </div>
</template>

<script>
// import ExpandableRow from './ExpandableRow.vue';
import ExpandableRow from "./ExpandableRow.vue";

export default {
  name: "DataTable",
  comments: {
    ExpandableRow,
    // ExpandableRow: () => import('./ExpandableRow.vue')
  },
  components: { ExpandableRow },
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      showModal: false,
      columns: [
        {
          dataKey: "employeeName",
          name: "Имя",
          align: "left",
        },
        {
          dataKey: "employeePhoneNumber",
          name: "Телефон",
          align: "left",
        },
      ],
      isChildExpanded: false,
      expandedRowsIds: [],
      isAsc: true,
    };
  },
  computed: {
    filteredRows() {
      return this.data.filter((row) => !row.supervisorId);
    },
  },
  mounted() {
    this.rows = this.data;
    console.log(this.data);
  },
  methods: {
    sort(dataKey) {
      if (this.isAsc) {
        this.data.sort((a, b) => a[dataKey].localeCompare(b[dataKey]));
      } else {
        this.data.sort((b, a) => a[dataKey].localeCompare(b[dataKey]));
      }
      this.isAsc = !this.isAsc;

    },
    click(val) {
      console.log(val);
    },
    closeModal() {
      this.showModal = false;
    },
    test(val) {
      console.log(val);
    },
    getF(val) {
      return this.rows.filter((row) => row.supervisorId === val.employeeId);
    },
    isExp(row) {
      if (this.expandedRowsIds.includes(row.employeeId)) {
        return true;
      } else return false;
    },
    updateRowExpansion(employeeId) {
      if (!this.expandedRowsIds.includes(employeeId)) {
        this.expandedRowsIds.push(employeeId);
      } else {
        let index = this.expandedRowsIds.indexOf(employeeId);
        if (index !== -1) {
          this.expandedRowsIds.splice(index, 1);
        }
      }
    },
  },
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
  transform: translate(-50%, -50%);
}
table {
  width: 100%;
  border-collapse: collapse;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}
th,
td {
  width: 50%;
  padding: 15px;
  background-color: rgba(255, 255, 255, 0.2);
  color: #fff;
}
thead th {
  background-color: #55608fc2;
  border: 2px solid rgba(255, 255, 255, 0.3);
}
tbody tr:hover {
  background-color: rgba(255, 255, 255, 0.3);
}
tbody td {
  position: relative;
  border: 2px solid rgba(255, 255, 255, 0.3);
}
/* tbody td:hover:before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: -9999px;
    bottom: -9999px;
    background-color: rgba(255,255,255,0.2);
    z-index: -1;
} */
</style>
