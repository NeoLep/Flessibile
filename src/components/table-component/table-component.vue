<template>
  <!-- {{ props }} -->
  <div ref="tableComponentRef" class="table-component">
    <el-table
      :height="tableEvents.height.value"
      class="table"
      :data="tableEvents.renderData.value"
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
      :currentPage="paginationEvents.currentPage.value"
      :page-size="paginationEvents.pageSize.value"
      @size-change="e => paginationEvents.handleSizeChange(e)"
      @current-change="e => paginationEvents.handleCurrentChange(e)"
      :page-sizes="[1, 10, 20, 30, 40]"
      layout="total, sizes, jumper, prev, pager, next"
      :total="paginationEvents.total.value"
    />
  </div>
</template>

<script>
import { renderControllers } from "./use-table-component-manager";
import { onMounted, ref, watch } from "vue";

let getProps;

const getComponentList = new renderControllers();

const defaultTableSchema = [
  { label: "没有传递所需要的模版, 请先设置table模版", props: "error" }
];

// pagintaion 分页事件集合
const paginationEvents = {
  currentPage: ref(1), // 当前页
  pageSize: ref(10), // size
  total: ref(0),
  handleCurrentChange(e) {
    this.currentPage.value = e;
    this.reRenderTable();
  },
  handleSizeChange(e) {
    this.pageSize.value = e;
    this.reRenderTable();
  },
  setRenderType(local) {
    if (local) {
      this.total.value = getProps.data.length;
      this.reRenderTable();
    } else console.log("online type");
  },
  reRenderTable() {
    // handleSizeChange
    const pageSize = this.pageSize.value;
    const pageNumber = this.currentPage.value;
    tableEvents.renderData.value = getProps.data.slice(
      (pageNumber - 1) * pageSize,
      (pageNumber - 1) * pageSize + pageSize
    );
    console.log(tableEvents.renderData.value);
  }
};

// table 组件实例
const tableComponentRef = ref(null);

// table 事件集合
const tableEvents = {
  renderData: ref([]),
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
    local: {
      type: Boolean,
      default: false
    },
    data: null,
    settings: null
  },
  components: {
    ...getComponentList
  },
  setup(props) {
    getProps = props;
    paginationEvents.setRenderType(props.local);
    onMounted(() => {
      tableEvents.setTableHeight(); // 设置table 自适应高度
    });

    // 监听 props.data
    watch(
      () => props.data,
      () => paginationEvents.reRenderTable(),
      {
        immediate: true, // 这个属性是重点啦
        deep: true // 深度监听的参数
      }
    );
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
