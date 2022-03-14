export const searchRenders = [
  {
    type: "input-controller",
    label: "表单名称:",
    props: "name",
    span: 8,
    // 更新数据触发器，默认input
    // updateEvent: ["blur", "change"]
    updateEvent: ["blur", "change"]
  },
  {
    type: "input-controller",
    label: "创建时间:",
    props: "createTime",
    span: 8,
    // 更新数据触发器，默认input
    // updateEvent: ["blur", "change"]
    updateEvent: ["blur", "change"]
  },
  {
    type: "input-controller",
    label: "创建者:",
    props: "creator",
    span: 8,
    // 更新数据触发器，默认input
    // updateEvent: ["blur", "change"]
    updateEvent: ["blur", "change"]
  }
];

export const tableOptions = [
  {
    type: "textRender",
    label: "模版名称",
    props: "templateName"
  },
  {
    type: "textRender",
    label: "创建时间",
    props: "createTime"
  },
  {
    type: "custom",
    custom: "operator",
    label: "操作",
    width: "150"
  }
];
