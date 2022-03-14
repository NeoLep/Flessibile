export function configSchema() {
  return [
    {
      type: "input-controller",
      label: "宽度 * 2",
      props: "span",
      span: 24,
      // 更新数据触发器，默认input
      // updateEvent: ["blur", "change"]
      updateEvent: ["blur", "change"]
    }
  ];
}

export function settings() {
  return {
    span: 24
  };
}
