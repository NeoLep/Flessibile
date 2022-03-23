<template>
  <div class="Home">
    <div ref="functionItemRef">123</div>
    <el-row class="function-tab">
      <el-col v-for="item in 3" :key="item" class="function-item" :span="6">
        <div ref="functionItemRef" class="item">
          <el-icon><ip-people /></el-icon>
          <div>创建模版</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const functionList = ref(
  router.options.routes.filter(item => item.type === "function")
);

const functionItemRef = ref(null);

const renderItemHeight = () => {};

onMounted(() => {
  console.log(functionItemRef);
});
</script>

<style lang="scss" scoped>
.Home {
  position: relative;
  height: 100vh;
  .function-tab {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60%;
    border: 1px solid red;
    .item {
      border: 1px solid red;
    }
  }
}
</style>
