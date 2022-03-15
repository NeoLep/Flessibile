<template>
  <controllerContainer
    :controller="props.controller"
    :component="props.preview || props.render || props.demonstrate"
    :element="props.element || {}"
  >
    <template #controller>
      <el-button class="button" :icon="EditPen">
        多行文本输入
      </el-button>
    </template>
    <template #component>
      <el-input
        v-model="getValue"
        placeholder="请输入内容"
        :rows="4"
        type="textarea"
        :disabled="props.disabled || props.demonstrate || props.preview"
        @blur="updateValue('blur', getValue)"
        @input="updateValue('input', getValue)"
        @change="updateValue('change', getValue)"
      />
    </template>
  </controllerContainer>
</template>

<script>
import { EditPen } from "@element-plus/icons-vue";
import { setProps, useController } from "../use-controller-form";
import { setControllerProps } from "../use-controller-manager";

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
    const updateValue = (type, value) => {
      if (props.element.updateEvent) {
        if (typeof props.element.updateEvent !== "string") {
          if (props.element.updateEvent.indexOf(type) != -1) syncValue(value);
        } else if (
          typeof props.element.updateEvent === "string" &&
          type === props.element.updateEvent
        ) {
          syncValue(value);
        }
      } else if (!props.element.updateEvent && type === "input")
        syncValue(value);
    };
    const { getValue, syncValue } = useController(props, context);
    return { EditPen, props, getValue, syncValue, updateValue };
  }
};
</script>

<style lang="scss" scoped>
.button {
  width: 100%;
  height: 100%;
}
</style>
