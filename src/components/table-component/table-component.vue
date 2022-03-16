<template>
  <!-- {{ props }} -->
  <div ref="tableComponentRef" class="table-component">
    <el-table
      :height="tableEvents.height.value"
      class="table"
      :data="props.data"
      border
    >
      <el-table-column
        v-for="(item, index) in props.options.length > 0
          ? props.options
          : defaultTableSchema"
        :key="index"
        :prop="item.props"
        :label="item.label"
        :width="item.width || ''"
      >
        <template #default="scope">
          <component
            v-if="item.type !== 'custom' && scope.row[item.props]"
            :value="scope.row[item.props]"
            :config="item['config'] || {}"
            :is="item.type"
          />
          <div v-else-if="item.type !== 'custom' && !scope.row[item.props]">
            暂无数据
          </div>
          <slot
            :row="scope.row"
            v-else-if="item.type === 'custom'"
            :name="item.custom"
          ></slot>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      v-model:currentPage="paginationEvents.currentPage.value"
      v-model:page-size="paginationEvents.pageSize.value"
      @size-change="paginationEvents.handleSizeChange"
      @current-change="paginationEvents.handleCurrentChange"
      :page-sizes="[1, 20, 30, 40]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
    />
    <!--  -->
  </div>
</template>

<script>
import { renderControllers } from "./use-table-component-manager";
import { onMounted, ref } from "vue";

const getComponentList = new renderControllers();

const defaultTableSchema = [
  { label: "没有传递所需要的模版, 请先设置table模版", props: "error" }
];

// pagintaion 分页事件集合
const paginationEvents = {
  currentPage: ref(1), // 当前页
  pageSize: ref(10), // size
  handleCurrentChange(e) {
    console.log("changePage", e);
  },
  handleSizeChange(e) {
    console.log("changePageSize", e);
  }
};

// table 组件实例
const tableComponentRef = ref(null);
// table 事件集合
const tableEvents = {
  height: ref(null),
  setTableHeight() {
    this.height.value = tableComponentRef.value.offsetHeight - 70;
  }
};

export default {
  props: {
    options: {
      type: Array,
      default: () => []
    },
    data: null,
    settings: null
  },
  components: {
    ...getComponentList
  },
  setup(props) {
    onMounted(() => {
      tableEvents.setTableHeight(); // 设置table 自适应高度
    });
    return {
      props,
      defaultTableSchema,
      tableComponentRef,
      tableEvents,
      paginationEvents
    };
  }
};
</script>

<style lang="scss" scoped>
.table-component {
  box-sizing: border-box;
  padding: 15px 15px 50px;
  height: 100%;
  position: relative;
  .pagination {
    position: absolute;
    bottom: 15px;
    right: 15px;
    height: 30px;
  }
}
</style>
