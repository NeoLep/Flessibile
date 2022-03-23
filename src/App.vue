<template>
  <containerComponent hideContext class="container_component">
    <!-- <template #header>
      <div class="header">
        <div style="margin: 0 15px; float: left;">
          <el-button
            class="backReturn"
            :icon="ArrowLeftBold"
            type="text"
            size="small"
            @click="returnToHome"
            >返回</el-button
          >
        </div>
        flessibile
      </div>
    </template> -->
    <template #left>
      <div class="left">
        <MenuComponent />
      </div>
    </template>
    <div class="body">
      <router-view />
    </div>
  </containerComponent>
</template>

<script setup>
import containerComponent from "./components/container-component/container-component.vue";
import MenuComponent from "./views/menu/menu.vue";
import { ArrowLeftBold } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";

const router = useRouter();
const returnToHome = () => {
  router.go(-1);
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
</style>
<style lang="scss" scoped>
.container_component {
  height: 100vh;
  overflow: hidden;
}
.common-layout {
  height: 100%;
}
.box-card {
  height: 100%;
}
.header {
  text-align: center;
  line-height: 60px;
  height: 60px;
  position: fixed;
  width: 100%;
  background-color: #ffffff;
  color: #303133;
  border-bottom: 1px solid #dcdfe6;
  z-index: 100;
}
.left {
  width: 250px;
  background-color: #fff;
  height: 100%;
}
.backReturn {
  color: #65676b;
  transition: all ease-in 0.3s;
  &:hover {
    color: #579ef8;
  }
}
</style>
