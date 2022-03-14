<template>
  <el-menu>
    <el-menu-item
      @click="routerJump(item.url)"
      v-for="(item, index) in appList"
      :key="index"
      :index="item.url"
      class="item"
    >
      <template #title> {{ item.name }}</template>
    </el-menu-item>
  </el-menu>
</template>

<script>
import { useRouter } from "vue-router";

// 定义控制台页面
const appList = [
  { name: "已创建的配置", url: "/template" },
  { name: "创建页面", url: "/tela" }
];

// 创建路由
let router;

// 路由跳转
const routerJump = url => {
  router.push({
    path: url,
    query: {}
  });
};

export default {
  setup() {
    // 创建路由
    router = useRouter();

    return { appList, routerJump };
  }
};
</script>

<style lang="scss" scoped></style>
