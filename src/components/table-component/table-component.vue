<template>
  <!-- {{ props }} -->
  <div class="tableComponentCus">
    <el-table :data="props.forms" border>
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
  </div>
</template>

<script>
import { renderControllers } from "./use-table-component-manager";

const getComponentList = new renderControllers("md");

const defaultTableSchema = [
  { label: "没有传递所需要的模版, 请先设置table模版", props: "error" }
];

export default {
  props: {
    options: {
      type: Array,
      default: () => []
    },
    forms: null,
    settings: null
  },
  components: {
    ...getComponentList
  },
  setup(props) {
    return { props, defaultTableSchema };
  }
};
</script>

<style lang="scss" scoped>
.tableComponentCus {
  width: 100%;
}
</style>
