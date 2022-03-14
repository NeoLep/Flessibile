<template>
  <div>
    <draggable
      :disabled="true"
      class="dragArea list-group w-full"
      :list="list"
      @change="log"
    >
      <div
        :draggable="enabled"
        class="item"
        @click.stop="lock"
        v-for="element in list"
        :key="element.name"
      >
        {{ element.name }}
      </div>
    </draggable>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { VueDraggableNext } from "vue-draggable-next";
export default defineComponent({
  components: {
    draggable: VueDraggableNext
  },
  data() {
    return {
      enabled: false,
      list: [
        { name: "John", id: 1 },
        { name: "Joao", id: 2 },
        { name: "Jean", id: 3 },
        { name: "Gerard", id: 4 }
      ],
      dragging: false
    };
  },
  methods: {
    log(event) {
      console.log(event);
    },
    lock() {
      this.enabled = false;
    }
  }
});
</script>
<style lang="scss" scoped>
.dragArea {
  border: 1px solid red;
  display: flex;
  flex-wrap: nowrap;
  .item {
    flex: 1;
    cursor: pointer;
    border: 1px solid red;
    height: 60px;
    line-height: 60px;
    text-align: center;
  }
}
</style>
