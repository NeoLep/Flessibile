<template>
  <div v-if="props.controller" class="controller">
    <slot name="controller"></slot>
  </div>

  <div v-if="props.component">
    <el-form-item
      :rules="element.required ? defaultRules : []"
      :prop="props.element.props || null"
      class="preview"
    >
      <template #label>
        <span>{{ props.element.label || "" }}</span>
        <slot name="title"></slot>
      </template>
      <slot name="component"></slot>
    </el-form-item>
  </div>
</template>

<script>
export default {
  props: {
    controller: Boolean,
    component: Boolean,
    element: Object
  },

  setup(props) {
    const defaultRules = [
      {
        required: true,
        message: `${props.element.label}为必填项！`,
        trigger: "blur"
      }
    ];
    return { props, defaultRules };
  }
};
</script>

<style lang="scss" scoped>
.preview {
  // height: 60px;
  line-height: 60px;
  text-align: center;
  background-color: #fff;
  :deep .el-form-item__label {
    color: pink;
    font-size: 14px;
    font-weight: 600;
    color: #000;
  }
}
.controller {
  height: 60px;
  margin-bottom: 20px;
}
</style>
