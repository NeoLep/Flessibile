<template>
  <containerComponent header hideContext class="container_component">
    <template #header>
      <div class="header">
        flessibile
        <div style="float: left;">
          <el-button
            class="backReturn"
            :icon="ArrowLeftBold"
            type="text"
            size="small"
            @click="returnToHome"
            >返回</el-button
          >
        </div>
        <div style="float:right;margin-right: 60px">
          <el-switch
            style="margin-right: 30px"
            v-model="render_type_status"
            size="large"
            active-text="render"
            inactive-text="preview"
          />
          <el-button
            @click="requestEvents.saveTela()"
            type="primary"
            size="small"
            >保存</el-button
          >
        </div>
      </div>
    </template>
    <template #left>
      <div class="controllComponent box-card left">
        <controllComponent ref="controll_component_ref" />
      </div>
    </template>
    <template #right>
      <div class="box-card right">
        <controllerConfigure
          :forms="configureEvents.configureForms"
          :readonlyConfigure="configureEvents.configureReadonly"
          :configureSchemaList="configureEvents.configureSchemaList"
        />
      </div>
    </template>
    <div
      class="body"
      @dragenter="draggableEvents.onDragEnter"
      @dragover="draggableEvents.onDragOver"
      @drop="draggableEvents.onDrop"
    >
      <div class="sourceCodeMode" v-if="showCode">
        {{ renderList }}
      </div>

      <ControllerRenders
        v-else
        :forms="getForms"
        :type="renderType"
        @deleteElementNode="elementEvents.deleteElementNode"
        @cloneElementNode="elementEvents.cloneElementNode"
        @focusElementNode="elementEvents.focusElementNode"
        @clearCheckedElement="elementEvents.clearCheckedElement"
        :renderList="renderList"
      />
      <div class="switch">
        <el-button
          @click="dialogEvents.showDialog()"
          class="button"
          :icon="Setting"
          circle
        ></el-button>
        <el-button
          @click="showCode = !showCode"
          class="button"
          :icon="Switch"
          circle
        ></el-button>
      </div>
    </div>
  </containerComponent>

  <div class="tela-dialog">
    <el-dialog
      v-model="dialogEvents.settingsDialogVis.value"
      title="模版配置"
      width="750px"
    >
      <!-- {{ telaConfigure }} -->
      <ControllerRenders
        type="render"
        :forms="telaConfigure"
        :renderList="telaConfigureSchema"
      />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogEvents.closeDialog(false)">取消</el-button>
          <el-button type="primary" @click="dialogEvents.closeDialog(true)"
            >确认</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import containerComponent from "../../components/container-component/container-component.vue";
import controllComponent from "../../components/controllComponent/controllerCenter.vue";
import ControllerRenders from "../../components/controllComponent/controllerRenders.vue";
import controllerConfigure from "../../components/controllComponent/controllerConfigure.vue";

import { saveTemplateToLocal } from "./Tela.service";
import { telaConfigureSchema } from "./Tela.configure";

import { computed, reactive, ref, render, getCurrentInstance } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Switch, ArrowLeftBold, Setting } from "@element-plus/icons-vue";
import {
  configureSchema,
  returnDefaultSet
} from "../../components/controllComponent/use-controller-configure";

// vue 实例
let proxy;

// 模版配置实例
let telaConfigure = ref({});
let telaConfigureClone = null;

// 渲染模式 true: render - false: preview
const render_type_status = ref(false);
const renderType = computed(() => {
  return render_type_status.value ? "render" : "preview";
});

// 是否展示渲染模版 JSON
const showCode = ref(false);

// controller 左侧组件实例
const controll_component_ref = ref(null);

// 渲染列表 - 中心操作区域返回的实例模版列表
const renderList = reactive([]);

// 获取的forms - 中心操作区域可以绑定的值
const getForms = reactive({});

// 配置事件集合
const configureEvents = ref({
  configureForms: {}, //配置项的 form
  configureReadonly: true // 右侧配置栏是否只可读
});

// 拖拽事件集合
const draggableEvents = {
  eventsLock: false,
  onDrop() {
    // 判断拖拽锁
    const dragLock = controll_component_ref.value.dragLock;
    if (!dragLock) return;

    // 获取默认设置
    const renderListItem = returnDefaultSet(
      controll_component_ref.value.checkComponent,
      renderList.length
    );

    // configureSchema() 获取右侧表单配置
    configureEvents.value.configureSchemaList = configureSchema(
      controll_component_ref.value.checkComponent
    ); // 插入配置内容

    // 插入表单内容
    renderList.push(renderListItem);
  },
  onDragEnter(e) {
    const dragLock = controll_component_ref.value.dragLock;
    if (!dragLock) return;
    console.log("On Drag Enter");
  },
  onDragOver(e) {
    const dragLock = controll_component_ref.value.dragLock;
    if (!dragLock) return;
    e.preventDefault();
    if (this.eventsLock) return;
    this.eventsLock = true;
    setTimeout(() => {
      this.eventsLock = false;
    }, 50);
  }
};

// 元素组件事件集合
const elementEvents = {
  // 克隆元素事件
  cloneElementNode(index) {
    console.log("clone", index, renderList);
    const cloneElement = JSON.parse(JSON.stringify(renderList[index]));
    cloneElement.timeStamp = new Date().getTime();
    renderList.push(cloneElement);
  },
  // 删除元素事件
  deleteElementNode(index) {
    renderList.splice(index, 1);
    console.log("delete", index);
  },
  // 元素聚焦事件
  focusElementNode(element) {
    // configureSchema() 获取右侧表单配置
    configureEvents.value.configureSchemaList = configureSchema(element.type); // 拉取模版
    configureEvents.value.configureReadonly = false; // 关闭只读模式
    configureEvents.value.configureForms = element; // 注入配置内容
  },
  // 清除聚焦事件
  clearCheckedElement(value) {
    configureEvents.value.configureReadonly = true; // 锁定编辑器
    configureEvents.value.configureForms = {}; // 清空内容
  }
};

// AXIOS 请求集合
const requestEvents = {
  async saveTela() {
    telaConfigure.value.templateList = renderList;
    const params = telaConfigure.value;

    let result = await saveTemplateToLocal(params);
    if (result) {
      console.log(result);
      return result;
    }
  }
};

// dialog 弹出框事件
const dialogEvents = {
  settingsDialogVis: ref(false),
  showDialog() {
    console.log("?");
    // 存储备份数据
    telaConfigureClone = JSON.parse(JSON.stringify(telaConfigure.value));
    this.settingsDialogVis.value = true;
  },
  closeDialog(type) {
    if (!type) {
      // 点击取消还原数据
      telaConfigure.value = JSON.parse(JSON.stringify(telaConfigureClone));
    }
    // 清除还原数据
    telaConfigureClone = null;
    this.settingsDialogVis.value = false;
  }
};

// 返回逻辑
let router;
let route;
const returnToHome = () => {
  router.go(-1);
};

export default {
  components: {
    containerComponent,
    controllComponent,
    ControllerRenders,
    controllerConfigure
  },

  setup() {
    // 处理路由实例
    router = useRouter();
    route = useRoute();
    // 处理 Vue 实例
    proxy = getCurrentInstance().proxy;

    console.log("renderList.value", renderList.value);
    // 如果存在 edit 就从 store 中获取数据
    if (route.query.edit) {
      renderList.push(...proxy.$store.getState("viewTelaDetail").templateList);
      telaConfigure.value = JSON.parse(
        JSON.stringify(proxy.$store.getState("viewTelaDetail"))
      );
    }

    // 获取传递过来的详情

    // requestEvents.save_template_to_local();
    return {
      controll_component_ref, // 中心拖拽表单的实例
      telaConfigure, // 模版详细配置 - 最后返回的结果
      renderList, // 模版列表实例
      renderType, // 渲染类型 - render/preview
      render_type_status, // 渲染类型的判断变量 控制 renderType
      Switch, // Icon
      ArrowLeftBold, // Icon
      Setting, // Icon
      showCode, // 查看源代码的变量
      telaConfigureSchema, // 获取的特殊配置文件
      getForms, // 获取的数据
      elementEvents, // 元素事件集合
      draggableEvents, // 拖拽事件集合
      configureEvents, // 配置事件集合
      dialogEvents, // 弹出框事件集合
      requestEvents, // axios 请求集合
      returnToHome // 发挥逻辑事件
    };
  }
};
</script>

<style lang="scss" scoped>
.container_component {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.common-layout {
  height: 100%;
}
.box-card {
  height: 100%;
}

.header {
  text-align: center;
  line-height: 60px;
  height: 60px;
  position: fixed;
  width: 100%;
  background-color: #ffffff;
  color: #303133;
  border-bottom: 1px solid #dcdfe6;
  padding: 0 12px 0 24px;
  z-index: 100;
}

.box-card {
  width: 350px;
  border-radius: 0;
  border-top: none;
  background: #fff;
  border: 1px solid #dcdfe6;
  border-top: none;
  overflow: auto;
  height: 100vh;
  margin-top: 20px;
  padding-top: 30px;
  padding-bottom: 100px;
  box-sizing: border-box;
}
.right {
  padding: 20px;
  width: 400px;
}
.body {
  position: relative;
  box-sizing: border-box;
  margin: 20px 20px;
  padding-bottom: 100px;
  // width: 100%;
  overflow: auto;
  height: 100vh;
  background-color: #fff;

  // border: 1px solid red;
}
.switch {
  position: absolute;
  width: 60px;
  height: 20px;
  top: 10px;
  right: 10px;
  .button {
    width: 20px;
    height: 100%;
  }
}
.sourceCodeMode {
  background-color: #fff;
  padding: 20px;
  height: 100%;
  .item {
    height: 30px;
    line-height: 30px;
  }
}
.backReturn {
  color: #65676b;
  transition: all ease-in 0.3s;
  &:hover {
    color: #579ef8;
  }
}
</style>

<style lang="scss">
.tela-dialog {
  .el-dialog__body {
    padding: 0;
  }
}
</style>
