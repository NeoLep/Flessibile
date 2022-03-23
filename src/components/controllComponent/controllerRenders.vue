<template>
  <div class="flexContainer" @click="clearChecked">
    <!-- {{ props }} -->
    <!-- 预览模式/渲染模式 -->
    <el-form
      ref="controllerRenderFormRef"
      :model="props.forms"
      :show-message="props.type === 'preview' ? false : true"
      :label-position="props.labelPosition || 'top'"
    >
      <draggable
        :disabled="props.type === 'preview' ? false : true"
        class="dragArea"
        :list="renderList"
        @change="log"
      >
        <div
          @click.stop="focusElement(index, element.timeStamp)"
          class="element"
          v-for="(element, index) in renderList"
          :key="index"
          :class="{
            focus_element: focusTimeStamp === element.timeStamp,
            expendPadding: props.expendPadding
          }"
          :style="{
            maxWidth: element.span ? (element.span * 100) / 24 + '%' : '100%',
            flex:
              '0 0 0' + element.span ? (element.span * 100) / 24 + '%' : '100%'
          }"
        >
          <!-- {{ element }} -->
          <component
            v-model="props.forms[element.props]"
            :config="props.forms['config'] || {}"
            :is="element.type"
            :element="element"
            :disabled="props.disabled || false"
            :preview="props.type === 'preview'"
            :render="props.type === 'render'"
            :demonstrate="props.type === 'demonstrate'"
          />
          <div class="operator" v-if="focusIndex === index">
            <el-button
              class="button"
              type="text"
              :icon="CopyDocument"
              @click="cloneElement(index)"
            />
            <el-button
              class="button"
              type="text"
              :icon="Delete"
              @click="deleteElement(index)"
            />
          </div>
        </div>
      </draggable>
      <slot name="operate"></slot>
    </el-form>
  </div>
</template>

<script>
import {
  renderControllers,
  renderCustomControllers
} from "./use-controller-manager";
import { VueDraggableNext } from "vue-draggable-next";
import { reactive } from "@vue/reactivity";
import { ref } from "vue";
import { Delete, CopyDocument } from "@element-plus/icons-vue";
const getComponentList = renderControllers();
const getCustomComponentList = renderCustomControllers();

// 获取的props
let getProps;

// Form 表单相关事件
const controllerRenderFormRef = ref(null);
const formEvents = {
  validateForm() {
    return new Promise(resolve => {
      controllerRenderFormRef.value.validate((valid, fields) => {
        if (valid) {
          resolve({
            status: "valid",
            data: getProps.forms
          });
        } else {
          resolve({
            status: "invalid",
            data: fields
          });
        }
      });
    });
  },
  resetForm() {
    if (!controllerRenderFormRef.value) return;
    controllerRenderFormRef.value.resetFields();
  }
};

export default {
  components: {
    ...getComponentList,
    ...getCustomComponentList,
    draggable: VueDraggableNext
  },
  props: {
    disabled: Boolean,
    expendPadding: {
      type: Boolean,
      default: true
    },
    draggableDisabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: "preview"
    },
    renderList: {
      type: Array,
      default: () => []
    },
    forms: {
      type: Object,
      default: () => ({})
    },
    labelPosition: String
  },
  emits: [
    "deleteElementNode",
    "cloneElementNode",
    "focusElementNode",
    "clearCheckedElement"
  ],

  setup(props, { emit }) {
    getProps = props;

    // console.log(getComponentList);
    const focusIndex = ref(-1);
    const focusTimeStamp = ref(-1);
    const renderListGet = reactive([
      { type: "TextController", label: "姓名1", span: 12 },
      { type: "TextController", label: "姓名2", span: 12 }
    ]);
    const log = event => {
      console.log(event);
    };
    // 聚焦事件
    const focusElement = (index, timeStamp) => {
      if (props.type !== "preview") return;
      if (props.draggableDisabled) return;
      focusIndex.value = index;
      focusTimeStamp.value = timeStamp;
      emit("focusElementNode", props.renderList[index]);
    };

    // 删除元素
    const deleteElement = index => {
      emit("deleteElementNode", index);
    };

    // 复制元素
    const cloneElement = index => {
      emit("cloneElementNode", index);
    };

    // 清除选中
    const clearChecked = () => {
      focusIndex.value = -1;
      focusTimeStamp.value = -1;
      emit("clearCheckedElement", null);
    };

    // 设置 required
    const rules = reactive({
      name: [
        {
          required: true,
          message: "Please input Activity name",
          trigger: "blur"
        }
      ]
    });

    return {
      props,
      focusIndex,
      renderListGet,
      focusTimeStamp,
      log,
      focusElement,
      deleteElement,
      Delete,
      CopyDocument,
      cloneElement,
      clearChecked,
      rules,
      controllerRenderFormRef,
      formEvents
    };
  }
};
</script>

<style lang="scss" scoped>
.flexContainer {
  // border: 1px solid red;
  padding-top: 15px;
  box-sizing: border-box;
  min-height: 100%;
  background-color: #fff;
  overflow: auto;
  .dragArea {
    // border: 1px solid red;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    padding: 15px 15px 150px;
    // box-sizing: border-box;
    .focus_element {
      position: relative;
      z-index: 200;
      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 200;
        background-color: rgba($color: #487ed4, $alpha: 0.3) !important;
      }
    }
    .element {
      cursor: pointer;
      margin: 0;
      box-sizing: border-box;
      float: left;
      position: relative;
      .operator {
        position: absolute;
        z-index: 300;
        width: 40px;
        height: 20px;
        line-height: 20px;
        bottom: 0;
        right: 0;
        background-color: #fff;
        .button {
          width: 20px;
          height: 20px;
          color: #000;
          margin: 0;
          &:hover {
            color: #487ed4;
          }
        }
      }
    }
  }
  .expendPadding {
    padding: 5px 15px !important;
  }
}
</style>
