<template>
  <ControllerRenders
    draggableDisabled
    :forms="prop.forms"
    :renderList="prop.configureSchemaList"
    :type="prop.readonlyConfigure ? 'preview' : 'render'"
    :expendPadding="false"
  />
</template>

<script>
import ControllerRenders from "./controllerRenders.vue";

export default {
  props: {
    forms: {
      required: true,
      type: Object,
      default: {}
    },
    readonlyConfigure: {
      type: Boolean,
      default: true
    },
    configureSchemaList: {
      type: Array,
      default: () => []
    }
  },
  components: {
    ControllerRenders
  },
  setup(prop) {
    return { prop };
  }
};
</script>

<style></style>
