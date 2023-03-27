<template>
  <div>
    <div class="table-row">
      <expanded-icon
        v-if="isExpanded && filteredRows.length > 0"
        :size="50"
        class="expansion-icon"
      />
      <collapsed-icon
        v-if="!isExpanded && filteredRows.length > 0"
        :size="50"
        class="expansion-icon"
      />
      <div
        v-for="column in columns"
        :key="column.dataKey"
        :class="{ pointer: filteredRows.length > 0 }"
        class="table-data"
        @click="$emit('expand', parentRow)"
      >
        {{ parentRow[column.dataKey] }}
      </div>
    </div>
    <ExpandableRow
      v-for="row in filteredRows"
      v-show="isExpanded"
      :is-expanded="isExp(row)"
      :key="row.employeeId"
      :parent-row="row"
      :all-rows="allRows"
      :filtered-rows="getFilteredRows(row)"
      :columns="columns"
      class="expandable-row"
      @expand="updateRowExpansion($event.employeeId)"
    />
  </div>
</template>

<script>
import ExpandedIcon from "vue-material-design-icons/ChevronUp.vue";
import CollapsedIcon from "vue-material-design-icons/ChevronDown.vue";

export default {
    name: "ExpandableRow",
    components: { ExpandedIcon, CollapsedIcon },
    props: {
        parentRow: {
            type: Object,
            required: true,
        },
        allRows: {
            type: Array,
            required: true,
        },
        filteredRows: {
            type: Array,
            required: true,
        },
        columns: {
            type: Array,
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
    methods: {
        getFilteredRows(val) {
            return this.allRows.filter((row) => row.supervisorId === val.employeeId);
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
.pointer {
  cursor: pointer;
}

.expandable-row {
  padding-left: 35px;
}

.expansion-icon {
  position: absolute;
  color: white;
}

.table-data {
  width: 50%;
  padding: 15px;
  background-color: rgba(255, 255, 255, 0.2);
  color: #fff;
}

.table-row {
  width: 100%;
  display: flex;
  flex-direction: row;
}

.table-row:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

.table-data {
  position: relative;
  border-bottom: 2px solid rgba(255, 255, 255, 0.3);
}
</style>
