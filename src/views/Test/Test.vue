<template>
  <div style="text-align: center">
    setTableData:
    <br />
    {{ tableData }}
  </div>
  <div style="width: 60%; margin: 200px auto">
    <activeTable v-model="tableData" :schema="tableSchema" />
  </div>
</template>

<script>
import { reactive } from "vue-demi";
import activeTable from "./activeTable.vue";
export default {
  components: { activeTable },
  setup(props) {
    const tableSchema = reactive([
      { label: "标题", props: "title" },
      { label: "参数", props: "props" }
    ]);
    const tableData = reactive([]);

    return { tableSchema, tableData };
  }
};
</script>

<style></style>
