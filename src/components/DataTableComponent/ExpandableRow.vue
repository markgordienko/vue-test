<template>
  <div>
    <div
      style="width: 100%; display: flex; flex-direction: row"
      class="table-row"
    ><expanded-icon 
      v-if="isExpanded && frows.length > 0"
      class="expansion-icon" 
    />
      <collapsed-icon 
        v-if="!isExpanded && frows.length > 0"
        class="expansion-icon" 
      />
      <div
        v-for="column in columns"
        :key="column.dataKey"
        :style="'width: 50%'"
        class="table-data"
        @click="
          test(row);
          $emit('expand', row);
        "
      >
        {{ row[column.dataKey] }}
      </div>
    </div>
    <ExpandableRow
      v-for="row in frows"
      v-show="isExpanded"
      :is-expanded="isExp(row)"
      :key="row.employeeId"
      :row="row"
      :rows="rows"
      :frows="getF(row)"
      :columns="columns"
      :test="test"
      :style="`padding-left: 35px;`"
      class=""
      @click="click(row)"
      @expand="updateRowExpansion($event.employeeId)"
    />
  </div>
</template>
  
  <script>

import ExpandedIcon from "vue-material-design-icons/ChevronUp.vue";
import CollapsedIcon from "vue-material-design-icons/ChevronDown.vue";
export default {
  name: "ExpandableRow",
  components: {ExpandedIcon, CollapsedIcon},
  props: {
    row: {
      type: Object,
      required: true,
    },
    rows: {
      type: Array,
      required: true,
    },
    frows: {
      type: Array,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
    test: {
      type: Function,
      required: true,
    },
    isExpanded: {
      type: Boolean,
      required: true,
    },
  },
  data: function () {
    return {
      isChildExpanded: false,
      expandedRowsIds: [],
    };
  },
  computed: {
    filteredRows() {
      // console.log(this.row)
      // console.log(this.rows.filter(row => row.supervisorId === this.row.employeeId))
      return this.rows.filter((row) => row.supervisorId === row.employeeId);
    },
    tw() {
      const parentRow = document.getElementsByClassName("test");
      return parentRow.offsetWidth;
    },
  },
  mounted() {
    console.log(document.getElementsByClassName("test"));
    console.log(this.row.employeeName);
    // console.log(document.getElementsByClassName("test"));
  },
  methods: {
    click(val) {
      console.log(val);
    },
    getF(val) {
      console.log(val.employeeName + this.rows);
      return this.rows.filter((row) => row.supervisorId === val.employeeId);
    },
    isExp(row) {
      console.log(this.expandedRowsIds);
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
.expansion-icon {
    position: absolute;
    margin-top: 10px;
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
.table-data {
  padding: 15px;
  background-color: rgba(255, 255, 255, 0.2);
  color: #fff;
}
thead th {
  background-color: #55608fc2;
  border: 2px solid rgba(255, 255, 255, 0.3);
}
.table-row:hover {
  background-color: rgba(255, 255, 255, 0.3);
}
.table-data {
  position: relative;
  border-bottom: 2px solid rgba(255, 255, 255, 0.3);
  /* border-right: 1px solid rgba(255,255,255,0.3); */
  /* border-left: 1px solid rgba(255,255,255,0.3); */
}
@keyframes slide-in {
  100% {
    transform: translateY(0%);
  }
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
  