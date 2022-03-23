<template>
  <div class="logo">
    <img
      style="width: 100%; height: 100%"
      src="../../assets/flc.jpg"
      alt="flessibile"
    />
    <div style="text-align: center">Beta ver 0.2</div>
  </div>
  <el-menu class="menu" :default-active="URLEvents.presentUrl.value">
    <template v-for="(item, index) in menuList" :key="index">
      <el-menu-item
        class="menu-item"
        v-if="item.layout"
        @click="routerJump(item.path)"
        :index="item.path"
      >
        <template #title>
          <div class="item">
            <el-icon v-if="item.icon" class="icon">
              <component :is="'ip-' + item.icon" />
            </el-icon>
            <span class="name">
              {{ item.layout }}
            </span>
          </div>
        </template>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script>
import { onMounted } from "vue-demi";
import { useRouter, useRoute } from "vue-router";
import { watch, ref } from "vue";

// 定义控制台页面
const menuList = ref([]);

// 创建路由
let router;

const URLEvents = {
  presentUrl: ref("/")
};

// 路由跳转
const routerJump = url => {
  router.push({
    path: url,
    query: {}
  });
};

export default {
  components: {},
  setup() {
    // 创建路由
    router = useRouter();
    menuList.value = router.options.routes;

    // 监听路由地址变化
    watch(
      () => router.currentRoute.value,
      path => {
        URLEvents.presentUrl.value = path.path;
      },
      {
        immediate: true
      }
    );
    onMounted(() => {});

    return {
      menuList,
      routerJump,
      URLEvents
    };
  }
};
</script>

<style lang="scss" scoped>
.logo {
  padding: 20px 0;
}
.menu {
  padding: 20px 0;
  .menu-item {
    height: 60px;
    .item {
      .icon {
        border: 1px solid transparent;
        height: 60px;
      }
      .name {
        display: inline-block;
        height: 60px;
        line-height: 60px;
      }
    }
  }
  :deep(.is-active) {
    background-color: #ecf5ff !important;
    border-top: 1px solid #e7eaed;
    border-bottom: 1px solid #e7eaed;
  }
}
</style>
