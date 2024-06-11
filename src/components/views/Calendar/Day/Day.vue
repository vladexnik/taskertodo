<script setup>
import IconOrangeCircle from '../../../icons/IconOrangeCircle.vue'
import IconRedCircle from '../../../icons/IconRedCircle.vue'

defineProps({
  day: Object,
  isActive: Boolean
})
</script>

<template>
  <li class="wrapper">
    <button class="container" :class="{ active: isActive }" @click="$emit('setActiveDay')">
      <p class="container__day-week">{{ day.dayOfWeek }}</p>
      <p class="container__number">{{ day.dayOfMonth }}</p>
    </button>
    <div class="tasks-status">
      <icon-red-circle />
      <icon-orange-circle />
    </div>
  </li>
</template>

<style scoped>
.wrapper {
  width: 50px;
  font-size: 12px;
  font-weight: 800;
}

.container {
  width: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  height: 60px;
  border: 2px solid rgb(82, 82, 82);
  border-radius: 13px;
  display: flex;
  color: black;
  transition: ease 0.5s;
}
.container__day-week {
  color: rgb(148, 148, 148);
}
.tasks-status {
  display: flex;
  justify-content: center;
}
.container:hover {
  cursor: pointer;
  color: orange;
  border-color: orange;
  transition: ease 0.5s;
}

.active {
  background-color: black;
  color: white;
  border-color: black;
}
</style>
