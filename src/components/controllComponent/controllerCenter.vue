<template>
  <div class="controllerCenter">
    <el-row class="row" :gutter="20">
      <el-col
        v-for="(component, index) in componentList"
        :key="index"
        :span="12"
      >
        <div
          @dragstart.stop="e => onDragStart(e, component)"
          @dragend.stop="e => onDragEnd(e, component)"
          draggable="true"
          class="controller"
        >
          <component :is="component" controller />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { renderControllers } from "./use-controller-manager";

import { ref } from "vue";

/**
 *  组件相关方法
 */
// 获取控制组件列表
const controllers = renderControllers();
// 设置 component 名称列表
const setComponentsList = () => {
  const componentsList = [];
  for (let key in controllers) componentsList.push(key);
  return componentsList;
};

// 选中的 component
let checkComponent = ref();

// 拖拽锁
let dragLock = ref(false);

// 拖拽事件集合
const draggableEvents = {
  // 拖拽事件
  onDragStart: (e, component) => {
    console.log("drag start");
    dragLock.value = true;
    // 设置选定组件
    checkComponent.value = component;
  },
  onDragEnd: (e, component) => {
    console.log("drag end");
    dragLock.value = false;
    // 清除选定组件
    checkComponent.value = null;
  }
};

export default {
  components: {
    ...controllers
  },
  setup() {
    // 获取组件名称数组，进行动态渲染
    const componentList = setComponentsList();

    return {
      componentList,
      ...draggableEvents,
      checkComponent,
      dragLock
    };
  }
};
</script>

<style lang="scss" scoped>
.controllerCenter {
  width: 100%;
  height: 100%;
  .row {
    width: 100%;
    margin: 0 !important;
    padding: 10px;
  }
}
</style>
