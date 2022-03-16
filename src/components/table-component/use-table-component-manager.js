export function renderControllers() {
  let component = {};

  //vue3 基础组件的自动化全局注册
  const requireComponent = import.meta.globEager("./*/*.vue");

  for (let key in requireComponent) {
    const controllerName = key.split("/")[2].split(".")[0];
    component[controllerName] = requireComponent[key]["default"];
    // console.log(controllerName);
    // console.log(key);
    // console.log(requireComponent[key]['default']);
  }
  return component;
}
