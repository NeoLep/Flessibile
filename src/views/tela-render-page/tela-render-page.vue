<template>
  <div class="container">
    <ControllerRenders
      :forms="getForms"
      type="render"
      :renderList="detailRender.templateList"
    />
  </div>
</template>

<script>
import { getCurrentInstance } from "vue";
import ControllerRenders from "../../components/controllComponent/controllerRenders.vue";
import { ref } from "vue";

let proxy;

export default {
  components: { ControllerRenders },
  setup() {
    // 处理 Vue 实例
    proxy = getCurrentInstance().proxy;
    const detailRender = proxy.$store.getState("viewTelaDetail");

    const getForms = ref({});

    return { detailRender, getForms };
  }
};
</script>

<style lang="scss" scoped>
.container {
  margin: 20px;
  height: 100vh;
  overflow: auto;
  background-color: #fff;
}
</style>
