const requireConfigure = import.meta.globEager("./*/*.js");

const defaultSettingsSchema = [
  {
    type: "input-controller",
    label: "宽度",
    props: "span",
    span: 24,
    // 更新数据触发器，默认input
    // updateEvent: ["blur", "change"]
    updateEvent: ["blur", "change"]
  },
  {
    type: "input-controller",
    label: "标题",
    props: "label",
    span: 24,
    required: true
  },
  {
    type: "input-controller",
    label: "参数",
    props: "props",
    span: 24,
    required: true
  },
  {
    type: "switch-controller",
    label: "是否必填",
    props: "required",
    span: 24
  }
];

// 默认设置
const defaultSetting = {
  timeStamp: null,
  type: null,
  label: "组件 ",
  span: 12,
  required: false
};

// 配置选项模版
export function configureSchema(controllerName) {
  const props = `./${controllerName}/${controllerName}.config.js`;
  let extraSettings = [];

  if (requireConfigure[props] && requireConfigure[props]["configSchema"]) {
    extraSettings = requireConfigure[props]["configSchema"]();
  }

  return [...defaultSettingsSchema, ...extraSettings];
}

// 配置默认设置
export function returnDefaultSet(controllerName, code) {
  // 获取组件key
  const props = `./${controllerName}/${controllerName}.config.js`;

  // 定义补充设定
  let extraSettings = {};
  // 获取补充内容
  if (requireConfigure[props] && requireConfigure[props]["settings"])
    extraSettings = requireConfigure[props]["settings"]();

  // 返回合并内容
  const setting = { ...defaultSetting, ...extraSettings };
  setting.timeStamp = new Date().getTime();
  setting.type = controllerName;
  setting.label += Number(code);
  return setting;
}
