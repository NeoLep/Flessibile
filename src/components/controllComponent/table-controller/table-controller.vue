<template>
  <controllerContainer
    :controller="props.controller"
    :component="props.preview || props.render"
    :element="props.element || {}"
  >
    <template #controller>
      <el-button class="button" :icon="Grid">
        表格表单
      </el-button>
    </template>
    <template #component>
      <tableComponent
        :forms="getValue"
        :options="props.element.options"
        :settings="props.element.tableSettings"
      />
    </template>
  </controllerContainer>
</template>

<script>
import { Grid } from "@element-plus/icons-vue";
import { setProps, useController } from "../use-controller-form";
import { setControllerProps } from "../use-controller-manager";

import controllerContainer from "../controllerContainer.vue";
import tableComponent from "../../table-component/table-component.vue";

const extendControllerProps = setControllerProps();
const extendProps = setProps();

export default {
  components: {
    controllerContainer,
    tableComponent
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
    return { Grid, props, getValue, syncValue, updateValue };
  }
};
</script>

<style lang="scss" scoped>
.button {
  width: 100%;
  height: 100%;
}
</style>
