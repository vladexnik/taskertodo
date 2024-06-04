<script setup>
const props = defineProps({
  todo: Object
})
const model = defineModel()

// const emit = defineEmits(['complete'])
// const updateChecked = (id, checked) => {
//   emit('update:checked', id, checked)
// }

console.log(props, 'props')
</script>

<template>
  <li class="main__task-item">
    <div class="round">
      <input type="checkbox" :id="props.todo.id" :value="props.todo.checked" v-model="model" />
      <label :for="props.todo.id"></label>
    </div>
    <div @click="$router.push(`/todo/${props.todo.id}`)" class="route">
      <span class="title">{{ props.todo.title }}</span>
    </div>
  </li>
</template>

<style scoped>
.main__task-item {
  display: flex;
  flex-direction: row;
  gap: 15px;
}

.title {
  font-size: 16px;
  font-weight: 500px;
  color: black;
}

.round {
  position: relative;
  transform: translateY(5px);
}
.round label {
  background-color: #fff;
  border: 3px solid #ff9d00;
  border-radius: 50%;
  cursor: pointer;
  height: 23px;
  left: 0;
  position: absolute;
  top: 0;
  width: 23px;
}

.round label:after {
  border: 2px solid #fff;
  border-top: none;
  border-right: none;
  content: '';
  height: 4px;
  left: 3px;
  opacity: 0;
  position: absolute;
  top: 6px;
  transform: rotate(-45deg);
  width: 12px;
}

.round input[type='checkbox'] {
  visibility: hidden;
}

.round input[type='checkbox']:checked + label {
  background-color: #ff9d00;
  border-color: #ff9d00;
}

.round input[type='checkbox']:checked + label:after {
  opacity: 1;
}

.route:hover {
  cursor: pointer;
}
</style>
