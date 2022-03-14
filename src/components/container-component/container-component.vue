<template>
  <el-container
    :class="{
      preview_container: preview,
      hide_context: hideContext,
      themeBackground: !preview
    }"
  >
    <el-header class="header preview" v-if="$slots.header">
      <slot name="header" />
    </el-header>
    <el-container class="container">
      <el-aside v-if="$slots.left" class="left preview">
        <slot name="left" />
      </el-aside>
      <el-main class="main preview">
        <slot></slot>
      </el-main>
      <el-aside v-if="$slots.right" class="right preview">
        <slot name="right" />
      </el-aside>
    </el-container>
    <el-footer class="footer preview" v-if="$slots.footer">
      <slot name="header" />
    </el-footer>
  </el-container>
</template>

<script>
import { ref, onMounted } from "vue";
export default {
  props: {
    container: {
      type: Boolean,
      default: true
    },
    // 是否展示预览布局
    preview: {
      type: Boolean,
      default: false
    },
    // 隐藏预览布局文字
    hideContext: {
      type: Boolean,
      default: false
    }
  },
  setup(prop, context) {
    return { prop };
  }
};
</script>

<style lang="scss" scoped>
.preview_container {
  .preview {
    position: relative;
    &::after {
      content: "";
      font-size: 20px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .header {
    background-color: #b5c0cf;
    &::after {
      content: "Header";
    }
  }
  .container {
    .main {
      background-color: #eaeef2;
      &::after {
        content: "Main";
      }
    }
    .left,
    .right {
      background: #d5dce5;
      &::after {
        content: "Left Aside";
      }
    }
    .right {
      &::after {
        content: "Right Aside";
      }
    }
  }
  .footer {
    background-color: #b5c0cf;
    &::after {
      content: "Footer";
    }
  }
}

.hide_context {
  .preview {
    &::after {
      content: "" !important;
    }
  }
}
.el-main,
.el-header,
.el-footer {
  padding: 0 !important;
}
.el-header,
.el-footer {
  min-height: 60px;
  height: auto;
}
.el-aside {
  min-width: 100px;
  width: auto;
}
.themeBackground {
  .header,
  .container,
  .footer {
    background-color: #eaeef2;
  }
  .container {
    .left,
    .right {
      background-color: #eaeef2;
    }
  }
}
</style>
