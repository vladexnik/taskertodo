<template>
  <ul class="calendar-list">
    <Day
      v-for="day in days"
      :day="day"
      :key="day"
      :isActive="activeDay === day.date"
      @setActiveDay="SetActiveDay(day.date)"
    />
  </ul>
</template>

<script setup>
import Day from './Day/Day.vue'
import { ref, computed } from 'vue'
import dayjs from 'dayjs'

const today = ref(dayjs())
console.log(today.value, 'first')
const days = computed(() => {
  const result = []
  for (let i = 0; i < 30; i++) {
    result.push({
      date: today.value.add(i, 'day').toDate(),
      dayOfWeek: today.value.add(i, 'day').format('ddd'),
      dayOfMonth: today.value.add(i, 'day').format('D')
    })
    console.log(today.value, 'circle', i)
  }
  console.log(result)
  return result
})
const activeDay = ref(null)

const SetActiveDay = (date) => {
  activeDay.value = date
  console.log(activeDay.value)
}
</script>
<style scoped>
.calendar-list {
  display: flex;
  flex-direction: row;
  gap: 5px;
  margin: 20px 0;
  overflow: auto;
}
::-webkit-scrollbar {
  display: block;
}
</style>
