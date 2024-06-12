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

const activeDay = computed(() => store.state.activeDay)

const SetActiveDay = (date) => {
  store.commit('setActiveDay', date)
  console.log(date)
}

const isActive = (date) => {
  return activeDay.value === date
}
</script>
<template>
  <ul class="calendar-list">
    <Day
      v-for="day in days"
      :day="day"
      :key="day"
      :data="data"
      :isActive="isActive(day.date)"
      @SetActiveDay="SetActiveDay(day.date)"
    />
  </ul>
</template>

<style scoped>
.calendar-list {
  display: flex;
  flex-direction: row;
  gap: 5px;
  margin: 20px 0;
  overflow: auto;
}
::-webkit-scrollbar {
  width: 15px;
  height: 8px;
  background-color: #ffffff;
  border-radius: 9em;
}

::-webkit-scrollbar-thumb {
  background-color: #acacac;
  border-radius: 9em;
  box-shadow: inset 1px 1px 10px #f3faf7;
}
</style>
