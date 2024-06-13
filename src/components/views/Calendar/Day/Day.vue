<script setup>
import { computed } from 'vue'
import IconOrangeCircle from '../../../icons/IconOrangeCircle.vue'
import IconRedCircle from '../../../icons/IconRedCircle.vue'

const props = defineProps({
  day: Object,
  data: Array,
  isActive: Boolean
})

let tasksForDay = props.data.filter((task) => task.date === props.day.date)

const checkedTasks = computed(() => {
  return tasksForDay.some((task) => task.checked)
})
const uncheckedTasks = computed(() => {
  return tasksForDay.some((task) => !task.checked)
})
</script>
<template>
  <li class="wrapper-day">
    <button class="container" :class="{ active: isActive }" @click="$emit('setActiveDay')">
      <p class="container__day-week">{{ day.dayOfWeek }}</p>
      <p class="container__number">{{ day.dayOfMonth }}</p>
    </button>
    <div class="tasks-status">
      <icon-orange-circle class="tasks-status__none" :class="{ show: checkedTasks }" />
      <icon-red-circle class="tasks-status__none" :class="{ show: uncheckedTasks }" />
    </div>
  </li>
</template>

<style scoped>
.wrapper-day {
  width: 50px;
  font-size: 12px;
  font-weight: 800;
}
.tasks-status__none {
  display: none;
}
.show {
  display: block;
}
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  height: 60px;
  width: 50px;
  border: 2px solid var(--dark-color);
  background-color: var(--white-color);
  border-radius: 25%;
  color: var(--dark-color);
  font-weight: 600;
}

.tasks-status {
  display: flex;
  justify-content: center;
}
.container:hover {
  cursor: pointer;
  color: var(--orange-color);
  border-color: var(--orange-color);
  transition: ease 0.5s;
}

.active {
  background-color: var(--dark-color);
  color: var(--white-color);
  border-color: var(--dark-color);
}
</style>
