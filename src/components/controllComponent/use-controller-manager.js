export function setControllerProps() {
  return {
    controller: Boolean,
    preview: Boolean,
    render: Boolean,
    demonstrate: Boolean,
    disabled: Boolean,
    element: {
      type: Object,
      default: () => ({})
    }
  };
}

export function renderControllers(v) {
  let component = {};

  //vue3 基础组件的自动化全局注册
  const requireComponent = import.meta.globEager("./*/*.vue");

  console.log(v, requireComponent);

  for (let key in requireComponent) {
    const controllerName = key.split("/")[2].split(".")[0];
    component[controllerName] = requireComponent[key]["default"];
    // console.log(controllerName);
    // console.log(key);
    // console.log(requireComponent[key]['default']);
  }
  return component;
}

export function renderCustomControllers() {
  let component = {};

  //vue3 基础组件的自动化全局注册
  const requireComponent = import.meta.globEager("./extra-controller/*/*.vue");

  for (let key in requireComponent) {
    const controllerName = key.split("/")[2].split(".")[0];
    component[controllerName] = requireComponent[key]["default"];
    // console.log(controllerName);
    // console.log(key);
    // console.log(requireComponent[key]['default']);
  }
  console.log(component);
  return component;
}
