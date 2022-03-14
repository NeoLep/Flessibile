export function configSchema() {
  return [
    {
      type: "extra-table-map-controller",
      label: "表格配置",
      props: "options",
      span: 24
    }
  ];
}

export function settings() {
  return {
    label: "表格 ",
    span: 24,
    options: [],
    config: { pinto: true }
  };
}
