<template>
  <div>
    <table v-if="filteredRows.length > 0">
      <thead>
        <tr>
          <ascend-icon
            v-show="isSortAscendingOrder"
            :size="42"
            class="sort-icon"
          />
          <descend-icon
            v-show="!isSortAscendingOrder"
            :size="42"
            class="sort-icon"
          />
          <th
            v-for="column in columns"
            :key="column.dataKey"
            @click="sort(column.dataKey)"
          >
            <span>
              <h2>{{ column.name }}</h2>
            </span>
          </th>
        </tr>
      </thead>
    </table>
    <h1 
      v-else 
      class="empty-table-text">Таблица пока пуста :)</h1>
    <ExpandableRow
      v-for="row in filteredRows"
      :is-expanded="isExpanded(row)"
      :key="row.employeeId"
      :parent-row="row"
      :all-rows="rows"
      :filtered-rows="getFilteredRows(row)"
      :columns="columns"
      @expand="updateRowExpansion($event.employeeId)"
    />
  </div>
</template>

<script>
import ExpandableRow from "./ExpandableRow.vue";
import AscendIcon from "vue-material-design-icons/SortAscending.vue";
import DescendIcon from "vue-material-design-icons/SortDescending.vue";

export default {
  name: "DataTable",
  components: { ExpandableRow, AscendIcon, DescendIcon },
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      columns: [
        {
          dataKey: "employeeName",
          name: "Имя",
          align: "center",
        },
        {
          dataKey: "employeePhoneNumber",
          name: "Телефон",
          align: "center",
        },
      ],
      isChildExpanded: false,
      expandedRowsIds: [],
      isSortAscendingOrder: true,
    };
  },
  computed: {
    filteredRows() {
      return this.data.filter((row) => !row.supervisorId);
    },
  },
  mounted() {
    this.rows = this.data;
  },
  methods: {
    sort(dataKey) {
      if (this.isSortAscendingOrder) {
        this.data.sort((a, b) => a[dataKey].localeCompare(b[dataKey]));
      } else {
        this.data.sort((b, a) => a[dataKey].localeCompare(b[dataKey]));
      }
      this.isSortAscendingOrder = !this.isSortAscendingOrder;
    },
    getFilteredRows(val) {
      return this.rows.filter((row) => row.supervisorId === val.employeeId);
    },
    isExpanded(row) {
      if (this.expandedRowsIds.includes(row.employeeId)) {
        return true;
      } else {
        return false;
      }
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
.sort-icon {
  position: absolute;
  margin-top: 25px;
  margin-left: 3%;
  pointer-events: none;
  color: white;
}

.empty-table-text {
  color: white;
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
  cursor: pointer;
  background-color: #55608fc2;
  border-bottom: 2px solid rgba(255, 255, 255, 0.3);
}
tbody tr:hover {
  background-color: rgba(255, 255, 255, 0.3);
}
tbody td {
  position: relative;
  border: 2px solid rgba(255, 255, 255, 0.3);
}
</style>
