<template>
  <div>{{ props.value }}</div>
</template>

<script>
export default {
  props: {
    value: null,
    config: Object
  },
  setup(props) {
    return { props };
  }
};
</script>

<style></style>
