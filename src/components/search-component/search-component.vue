<template>
  <ControllerRenders
    ref="searchFormRenderRef"
    class="searchComponent"
    draggableDisabled
    labelPosition="left"
    :forms="searchForms"
    :renderList="props.renders"
    type="render"
  >
    <template #operate>
      <div class="operate">
        <el-button @click="resetSearchForm" class="button">重置</el-button>
        <el-button @click="submitSearchForm" class="button" type="primary"
          >提交</el-button
        >
      </div>
    </template>
  </ControllerRenders>
</template>

<script>
import ControllerRenders from "../../components/controllComponent/controllerRenders.vue";
import { ref } from "vue";

export default {
  components: { ControllerRenders },
  props: {
    renders: {
      type: Array,
      default: () => []
    }
  },
  emits: ["submit"],
  setup(props, { emit }) {
    const searchForms = ref({});
    const searchFormRenderRef = ref(null);

    const submitSearchForm = () => {
      // searchFormRenderRef.value.validiateForm();
      emit("submit", searchForms.value);
      console.log(searchForms.value);
    };

    const resetSearchForm = () => {
      searchForms.value = {};
    };

    return {
      props,
      searchFormRenderRef,
      searchForms,
      submitSearchForm,
      resetSearchForm
    };
  }
};
</script>

<style lang="scss" scoped>
.searchComponent {
  overflow: hidden;
  :deep(.el-form-item__label) {
    font-weight: normal !important;
  }
  :deep(.dragArea) {
    padding: 0 !important;
  }
  .operate {
    padding: 20px 15px 20px 0;
    text-align: right;
    .button {
      font-weight: normal !important;
    }
  }
}
</style>
