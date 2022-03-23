<template>
  <div class="tela-list">
    <searchComponent :renders="searchRenders" />
    <tableComponent
      class="table"
      :data="TelaTemplateJSON"
      :options="tableOptions"
      local
    >
      <template #operator="scope">
        <el-button
          type="text"
          @click="detailEvents.detail(scope.row, 'preview')"
          >查看</el-button
        >
        <el-button
          @click="detailEvents.detail(scope.row, 'edit')"
          style="color: #7ebf50"
          type="text"
          >编辑</el-button
        >
        <el-popconfirm
          icon-color="red"
          title="确定要删除此条模版吗?"
          confirm-button-text="是"
          cancel-button-text="否"
          @confirm="detailEvents.detail(scope.row, 'delete')"
        >
          <template #reference>
            <el-button style="color: red" type="text">删除</el-button>
          </template>
        </el-popconfirm>
      </template>
    </tableComponent>
  </div>
</template>

<script>
import searchComponent from "../../components/search-component/search-component.vue";
import tableComponent from "../../components/table-component/table-component.vue";

import { getCurrentInstance } from "vue";
import { useRouter } from "vue-router";

import { getTelaListService, deleteTelaListService } from "./telaList.service";
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
  async detail(detail, type) {
    console.log(detail, type);
    if (type === "preview") {
      router.push("telarender");
    } else if (type === "edit") {
      proxy.$store.updateState("viewTelaDetail", detail);
      router.push({
        path: "tela",
        query: {
          edit: true
        }
      });
    } else if (type === "delete") {
      const params = {
        id: detail.id
      };
      let result = await deleteTelaListService(params);
      if (result) {
        console.log(result);
      }
    }
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
  margin-top: 20px;
  height: 70vh;
  box-sizing: border-box;
  // padding: 15px;
  background-color: #fff;
}
</style>
