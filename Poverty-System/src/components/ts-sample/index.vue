<template>
  <h1>{{ msg }}</h1>
  <input type="text" v-model="username" @blur="handleUpdate" />
</template>

<script lang="ts" setup>
import { ref } from "vue"
// defineProps({
//     msg:String
// })
// defineProps<{ msg?: String | Number }>();

// interface Props{
//   msg?:(string | number | boolean),
//   title?: string[]
// }

// withDefaults(defineProps<Props>(), {
//   msg: 'hello',
//   title: ()=> [ 'one', 'two' ]
// })

withDefaults(
  defineProps<{
    msg?: string | number | boolean
    title?: string
  }>(),
  {
    msg: "TS-Sample",
    title: "默认标题",
  }
)

const username = ref<String>("")

// const emit = defineEmits(["on-update"]);
const emit = defineEmits<{
  (event: "on-update"): void
  (event: "on-delete", data: string): void
}>()

const handleUpdate = (event: any) => {
  const { target } = event

  // emit("on-update", { data: target.value });
  emit("on-update")
  emit("on-delete", event.target.value)
}
</script>

<style scoped></style>
