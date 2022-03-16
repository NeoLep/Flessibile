<template>
  <div class="operation">
    <el-button
      v-if="!operationEvents.submitted"
      @click="operationEvents.submit()"
      type="primary"
      >提交</el-button
    >
    <el-button
      v-else-if="operationEvents.submitted"
      @click="operationEvents.submitted = false"
      type="primary"
      >取消锁定</el-button
    >
    <el-button @click="operationEvents.reset()">重置</el-button>
  </div>
  <div class="container">
    <ControllerRenders
      ref="controllerRendersRef"
      :forms="getForms"
      :type="operationEvents.submitted ? 'demonstrate' : 'render'"
      :renderList="detailRender.templateList"
    />
  </div>
</template>

<script>
import { getCurrentInstance } from "vue";
import ControllerRenders from "../../components/controllComponent/controllerRenders.vue";
import { ref } from "vue";

// 设置 Vue 实例
let proxy;

// 设置 forms 的值
const getForms = ref({});

// 设置 controllerRender 的实例
const controllerRendersRef = ref(null);

// 操作区事件
const operationEvents = ref({
  submitted: false,
  async submit() {
    let validResult = await controllerRendersRef.value.formEvents.validateForm();
    if (validResult && validResult.status === "valid") {
      this.submitted = true;
    }
  },
  reset() {
    controllerRendersRef.value.formEvents.resetForm();
    this.submitted = false;
  }
});

export default {
  components: { ControllerRenders },
  setup() {
    // 处理 Vue 实例
    proxy = getCurrentInstance().proxy;
    // 获取详情中的内容
    const detailRender = proxy.$store.getState("viewTelaDetail");

    return {
      detailRender,
      getForms,
      controllerRendersRef,
      operationEvents
    };
  }
};
</script>

<style lang="scss" scoped>
.container {
  margin: 0 20px;
  height: 100vh;
  overflow: auto;
  background-color: #fff;
}
.operation {
  margin: 10px 20px;
}
</style>
