<template>
  <controllerContainer
    :controller="props.controller"
    :component="props.preview || props.render || props.demonstrate"
    :element="props.element"
  >
    <template #title>
      <el-button
        type="text"
        size="small"
        :icon="Setting"
        circle
        style="font-size: 16px; float: right"
        @click="openConfig"
        :disabled="props.preview"
      ></el-button>
    </template>
  </controllerContainer>

  <el-dialog
    v-model="dialogVisible"
    title="表格设置"
    width="75%"
    :before-close="handleClose"
  >
    <br />
    <!-- 值: modelVaue -->
    <activeTableComponent
      ref="activeTableRef"
      :schema="createTableSchema"
      v-model="getValue"
    />

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="confirmEdit(false)">Cancel</el-button>
        <el-button type="primary" @click="confirmEdit(true)">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { ref } from "vue";
import { Setting } from "@element-plus/icons-vue";
import { setProps, useController } from "../../use-controller-form";
import { setControllerProps } from "../../use-controller-manager";

import activeTableComponent from "../../../active-table-component/active-table-component.vue";
import controllerContainer from "../../controllerContainer.vue";

const extendControllerProps = setControllerProps();
const extendProps = setProps();

// activeTable 模版实例
const activeTableRef = ref(null);

const createTableSchema = [
  { label: "标题", props: "label" },
  { label: "参数", props: "props" }
];

export default {
  components: {
    controllerContainer,
    activeTableComponent
  },
  props: {
    ...extendProps,
    ...extendControllerProps
  },
  setup(props, context) {
    const { getValue, syncValue } = useController(props, context);

    // 激活 dialog 的方法
    const openConfig = () => {
      dialogVisible.value = true;
      getValue.value = props.modelValue;
      getValue.value = JSON.parse(JSON.stringify(getValue.value));
    };

    // dialog 显示模式
    const dialogVisible = ref(false);

    // 关闭 dialog 前的回调
    const handleClose = done => {
      // 清空输入框中的内容
      activeTableRef.value.refreshElement();
      done();
    };

    // 确认或取消按钮的方法
    const confirmEdit = status => {
      if (status) syncValue(getValue.value);
      else getValue.value = [];

      dialogVisible.value = false;

      // 500毫秒后清空输入框, 延时处理避免眼瞎
      setTimeout(() => {
        // 清空输入框中的内容
        activeTableRef.value.refreshElement();
      }, 500);
    };

    return {
      props,
      getValue,
      syncValue,
      Setting,
      openConfig,
      handleClose,
      confirmEdit,
      dialogVisible,
      createTableSchema,
      activeTableRef
    };
  }
};
</script>

<style lang="scss" scoped>
.button {
  width: 100%;
  height: 100%;
}
.item {
  margin: 5px 0;
}
</style>
