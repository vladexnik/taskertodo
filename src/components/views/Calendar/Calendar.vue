<script setup>
import Day from './Day/Day.vue'
import { ref, computed, watchEffect } from 'vue'
import dayjs from 'dayjs'
import { useStore } from 'vuex'
import { nextTick } from 'vue'

defineProps({
  data: Array
})

const store = useStore()
const today = ref(dayjs())
let totalDays = ref(30)
const days = computed(() => {
  const result = []
  for (let i = 0; i < totalDays.value; i++) {
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
}

const isActive = (date) => {
  return activeDay.value === date
}

const loadMoreDays = () => {
  totalDays.value += 30
}

const reobserve = () => {
  const lastDay = document.querySelector('.calendar-list .day:last-child')
  if (lastDay) {
    observer.observe(lastDay)
  }
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(async (entry) => {
    if (entry.isIntersecting) {
      observer.unobserve(entry.target)
      loadMoreDays()
      await nextTick()
      reobserve()
    }
  })
})

watchEffect(async () => {
  await nextTick()
  reobserve()
})
</script>
<template>
  <ul class="calendar-list">
    <Day
      class="day"
      v-for="day in days"
      :day="day"
      :key="day.date"
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
</style>
