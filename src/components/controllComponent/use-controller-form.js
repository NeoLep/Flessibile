import { computed, watch, ref, watchEffect } from "vue";
export function setProps() {
  return {
    modelValue: null,
    config: {
      type: Object,
      default: () => ({})
    },
    options: {
      type: Array,
      default: () => []
    }
  };
}

export function useController(props, context) {
  const getValue = ref(props.modelValue);

  watch(
    () => props.modelValue,
    (nval, oval) => {
      getValue.value = props.modelValue;
    }
  );

  const syncValue = (value, events) => {
    context.emit("update:modelValue", value);
  };

  return { getValue, syncValue };
}
