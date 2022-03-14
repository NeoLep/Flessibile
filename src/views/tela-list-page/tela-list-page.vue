<template>
  <div class="tela-list">
    <searchComponent :renders="searchRenders" />
    <br />
    <tableComponent
      class="table"
      :forms="TelaTemplateJSON"
      :options="tableOptions"
    >
      <template #operator="scope">
        <el-button
          type="text"
          @click="detailEvents.viewDetail(scope.row, 'preview')"
          >查看</el-button
        >
        <el-button
          @click="detailEvents.viewDetail(scope.row, 'edit')"
          style="color: #7ebf50"
          type="text"
          >编辑</el-button
        >
        <el-button style="color: red" type="text">删除</el-button>
      </template>
    </tableComponent>
  </div>
</template>

<script>
import searchComponent from "../../components/search-component/search-component.vue";
import tableComponent from "../../components/table-component/table-component.vue";

import { getCurrentInstance } from "vue";
import { useRouter } from "vue-router";

import { getTelaListService } from "./telaList.service";
import { searchRenders, tableOptions } from "./tela-list-page";
import TelaTemplateJSON from "../../assets/TelaTemplate.json";

// 创建路由
let router;
// 获取Vue实例
let proxy;

const requestEvents = {
  async getTelaList() {
    let result = await getTelaListService();
    if (result && result.code == 200) console.log(result.data);
  }
};

// 查看详情事件
const detailEvents = {
  // 编辑还是阅览
  viewDetail(detail, type) {
    proxy.$store.updateState("viewTelaDetail", detail);
    if (type === "preview") router.push("telarender");
    else if (type === "edit")
      router.push({
        path: "tela",
        query: {
          edit: true
        }
      });
  }
};

export default {
  components: { searchComponent, tableComponent },
  setup() {
    router = useRouter();

    // 处理 Vue 实例
    proxy = getCurrentInstance().proxy;

    return {
      detailEvents,
      searchRenders,
      tableOptions,
      TelaTemplateJSON
    };
  }
};
</script>

<style lang="scss" scoped>
.tela-list {
  padding: 20px;
  box-sizing: border-box;
}
.table {
  box-sizing: border-box;
  padding: 15px;
  background-color: #fff;
}
</style>
