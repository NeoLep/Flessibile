<template>
  <containerComponent header hideContext class="container_component">
    <template #header>
      <div class="header">
        flessibile
      </div>
    </template>
    <template #left>
      <div class="left">
        <LayoutComponent />
      </div>
    </template>
    <div class="body">
      <router-view />
    </div>
  </containerComponent>
</template>

<script setup>
import containerComponent from "./components/container-component/container-component.vue";
import LayoutComponent from "./views/layout/layout.vue";
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
</style>
