<template>
  <ul class="calendar-list">
    <Day
      v-for="day in days"
      :day="day"
      :key="day"
      :data="data"
      :isActive="activeDay === day.date"
      @SetActiveDay="SetActiveDay(day.date)"
    />
  </ul>
</template>

<script setup>
import Day from './Day/Day.vue'
import { ref, computed } from 'vue'
import dayjs from 'dayjs'
import { useStore } from 'vuex'

defineProps({
  data: Array
})

const store = useStore()
const today = ref(dayjs())
const days = computed(() => {
  const result = []
  for (let i = 0; i < 30; i++) {
    result.push({
      date: today.value.add(i, 'day').format('YYYY-MM-DD'),
      dayOfWeek: today.value.add(i, 'day').format('ddd'),
      dayOfMonth: today.value.add(i, 'day').format('D')
    })
  }
  return result
})

const activeDay = ref(null)

const SetActiveDay = (date) => {
  activeDay.value = date
  store.commit('setActiveDay', activeDay.value)
  console.log(date)
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
