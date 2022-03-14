import { ref } from "vue";
export default function useComponent() {
  const setProps = {
    name: String
  };
  const num = ref(0);
  return { num, setProps };
}
