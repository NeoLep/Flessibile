import { ref } from "vue";
const state = ref({
  viewTelaDetail: null
});

const prox = new Proxy(state.value, {
  get(target, key) {
    // console.log("used get", target, key);
    return state.value[key];
  },
  set(target, key, value) {
    console.error("Not allowed to modify state directly");
    return true;
  }
});

export const FlessStorage = {
  setState(key, value) {
    if (!state["value"][key]) return (state["value"][key] = value);
    console.error("Duplicated Key in state for", key);
  },
  updateState(key, value) {
    if (state["value"].hasOwnProperty(key))
      return (state["value"][key] = value);
    console.error("Inexistence key in state", key);
  },
  deleteState(key) {
    if (state["value"][key]) return delete state["value"][key];
    console.error("Inexistence key in state", key);
  },
  getState(key) {
    if (!key) return prox;
    return prox[key];
  },

  install(app_proto) {
    // 初始化 store 自动注入 state
    const stateValueCache = sessionStorage.getItem("FlessStorageCacheData");
    if (stateValueCache) {
      state.value = JSON.parse(stateValueCache);
      sessionStorage.removeItem("FlessStorageCacheData");
    }

    return (app_proto.config.globalProperties.$store = {
      updateState: this.updateState,
      setState: this.setState,
      deleteState: this.deleteState,
      getState: this.getState
    });
  }
};

window.onbeforeunload = function(event) {
  sessionStorage.removeItem("FlessStorageCacheData");
  if (JSON.stringify(state.value) !== "{}")
    sessionStorage.setItem(
      "FlessStorageCacheData",
      JSON.stringify(state.value)
    );
};
