<template>
  <controllerContainer
    :controller="props.controller"
    :component="props.preview || props.render"
    :element="props.element || {}"
  >
    <template #controller>
      <el-button class="button" :icon="EditPen">
        选择器
      </el-button>
    </template>
    <template #component>
      <el-select
        class="select"
        v-model="getValue"
        placeholder="请选择内容"
        :disabled="props.preview ? true : false"
        @change="updateValue('input', getValue)"
        clearable
      >
        <el-option
          v-for="item in props.element.options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
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

const options = [
  {
    value: "Option1",
    label: "Option1"
  },
  {
    value: "Option2",
    label: "Option2"
  },
  {
    value: "Option3",
    label: "Option3"
  },
  {
    value: "Option4",
    label: "Option4"
  },
  {
    value: "Option5",
    label: "Option5"
  }
];

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
    return { EditPen, props, getValue, syncValue, updateValue, options };
  }
};
</script>

<style lang="scss" scoped>
.button {
  width: 100%;
  height: 100%;
}
.select {
  width: 100%;
}
</style>
