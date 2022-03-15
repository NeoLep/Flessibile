<template>
  <controllerContainer
    :controller="props.controller"
    :component="props.preview || props.render || props.demonstrate"
    :element="props.element"
  >
    <template #controller>
      <el-button class="button" :icon="Open">
        开关
      </el-button>
    </template>
    <template #component>
      <el-switch
        v-model="getValue"
        :disabled="props.disabled || props.demonstrate || props.preview"
        @change="updateValue(getValue)"
      />
    </template>
  </controllerContainer>
</template>

<script>
import { Open } from "@element-plus/icons-vue";
import { setProps, useController } from "../use-controller-form";
import { setControllerProps } from "../use-controller-manager";
import { reactive } from "vue";

import controllerContainer from "../controllerContainer.vue";

const extendControllerProps = setControllerProps();
const extendProps = setProps();

export default {
  components: {
    controllerContainer
  },
  props: {
    ...extendProps,
    ...extendControllerProps
  },
  setup(props, context) {
    const updateValue = value => {
      syncValue(value);
    };
    const { getValue, syncValue } = useController(props, context);
    return { Open, props, getValue, syncValue, updateValue };
  }
};
</script>

<style lang="scss" scoped>
.button {
  width: 100%;
  height: 100%;
}
</style>
