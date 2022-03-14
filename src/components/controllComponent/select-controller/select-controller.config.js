import { defineAsyncComponent } from "vue";

export function configSchema() {
  return [
    {
      type: "extra-select-map-controller",
      label: "选项配置",
      props: "options",
      span: 24
      // 更新数据触发器，默认input
      // updateEvent: ["blur", "change"]
      // updateEvent: ["blur", "change"]
    }
  ];
}

export function settings() {
  return {
    label: "选择器 ",
    options: []
  };
}
