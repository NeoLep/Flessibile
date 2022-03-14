<template>
  {{ props }}
  <div class="editor-table">
    <el-table class="table" :data="props.modelValue" border>
      <el-table-column
        v-for="(item, index) in props.schema"
        :key="index"
        :prop="item.props"
        :label="item.label"
      >
        <template #default="scope">
          <el-input
            :disabled="editElementProto === scope.row ? false : true"
            v-model="scope.row[item.props]"
            :placeholder="'请输入' + item.label"
          />
        </template>
      </el-table-column>
      <el-table-column width="120px" align="center">
        <template #header>
          操作
        </template>
        <template #default="scope">
          <el-button
            v-if="scope.row !== editElementProto"
            @click="editElement(scope.row)"
            style="width: 20px; height: 20px"
            :icon="Edit"
            size="small"
            type="primary"
          />
          <el-button
            v-else
            @click="editElement({})"
            style="width: 20px; height: 20px"
            :icon="Check"
            size="small"
            type="primary"
          />
          <el-button
            style="width: 20px; height: 20px"
            :icon="Delete"
            size="small"
            type="danger"
            @click="deleteElement(scope.row)"
          />
        </template>
      </el-table-column>
    </el-table>
    <el-table class="editTable" :data="partData" :show-header="false" border>
      <el-table-column
        v-for="(item, index) in props.schema"
        :key="index"
        :prop="item.props"
        :label="item.label"
      >
        <template #default="scope">
          <el-input
            :ref="el => (inputElementRef[index] = el)"
            v-model="scope.row[item.props]"
            :placeholder="'请输入' + item.label"
            @keyup.enter="addElement('enter', index)"
          />
        </template>
      </el-table-column>
      <el-table-column width="120px" align="center">
        <template #default>
          <el-button
            style="width: 20px; height: 20px"
            :icon="Plus"
            size="small"
            @click="addElement"
            type="success"
          />
          <el-button
            style="width: 20px; height: 20px"
            :icon="Refresh"
            size="small"
            @click="refreshElement"
            type="warning"
          />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { VueDraggableNext } from "vue-draggable-next";
import { computed, ref } from "vue";
import { Plus, Delete, Edit, Refresh, Check } from "@element-plus/icons-vue";
import { ElNotification } from "element-plus";

let notifyObject = null;

// 获取输入框实例 - 以数组的形式存储
const inputElementRef = ref({});

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  schema: {
    required: true,
    type: Array,
    default: () => []
  }
});

const tableData = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    return value;
  }
});

const partData = ref([{}]);

// 添加元素
const addElement = (type, index) => {
  if (type === "enter" && index !== props.schema.length - 1) return;
  const element = partData.value[0];
  if (Object.keys(element).length !== props.schema.length) {
    if (notifyObject) notifyObject.close();
    notifyObject = ElNotification({
      title: "数据补全警告",
      message: "还有需要填写的项目  ",
      type: "warning"
    });
    return;
  }

  element.createTime = new Date().getTime();
  props.modelValue.push(element);
  partData.value = [{}];
  inputElementRef.value[0].focus();
};

// 编辑模式
const editElementProto = ref();
const editElement = element => {
  editElementProto.value = element;
};

// 清空新建内容
const refreshElement = () => {
  partData.value = [{}];
};

// 删除内容
const deleteElement = element => {
  const index = tableData.value.indexOf(element);
  tableData.value.splice(index, 1);
};

// 抛出的方法
defineExpose({
  refreshElement
});
</script>

<style lang="scss" scoped>
:deep(.el-table__header) {
  thead {
    // color: red !important;
    color: #000000d9;
    font-weight: 500;
    .el-table__cell {
      background-color: #fafafa;
    }
  }
}
.editTable {
  :deep .el-table__inner-wrapper {
    &::after {
      height: auto;
    }
  }
}
:deep(.is-disabled) {
  .el-input__inner {
    color: #000 !important;
  }
}

.editor-table {
  width: 100%;
  height: 100%;
}
</style>
