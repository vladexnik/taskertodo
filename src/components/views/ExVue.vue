<template>
  <div class="tasks">
    <div class="tasks__content">
      <div class="tasks__header">
        <h1 class="tasks__title">Tassker</h1>
        <calendar-list v-if="tasks" @choose-date="changeCurrentDay" :tasks="tasks"></calendar-list>
      </div>
      <div v-if="tasks" class="tasks__container">
        <h3 v-if="filteredTasks.length > 0" class="tasks__quantity">
          {{ filteredTasks.length }} {{ taskText }} for
          {{ currentDate.split('-').join('.') }}
        </h3>
        <h3 v-else class="tasks__no-quantity">
          No Task for {{ currentDate.split('-').join('.') }}. Add notes To Do...
        </h3>
        <div class="tasks__list">
          <task-item
            v-for="task in filteredTasks"
            :task="task"
            :key="task.id"
            @change-task-status="changeStatus"
          />
        </div>
      </div>
      <div v-else class="tasks__loader">
        <PageLoader />
      </div>
      <button @click="showDialog" class="tasks__button">+ Add a New Task</button>
    </div>

    <AddTaskDialog @create="addTask" v-model:show="dialogVisible" />
  </div>
</template>

<script>
import {
  changeTaskStatusToDone,
  changeTaskStatusToNotDone,
  createTask,
  getAllTasks
} from '@/API/api'
import AddTaskDialog from '../components/AddTaskDialog.vue'
import TaskItem from '../components/TaskItem.vue'
import CalendarList from '../components/CalendarList.vue'

export default {
  components: {
    AddTaskDialog,
    TaskItem,
    CalendarList
  },
  data() {
    return {
      tasks: null,
      filteredTasks: null,
      dialogVisible: false,
      checkboxStatus: false
    }
  },
  methods: {
    async addTask(task) {
      await createTask(task, this.userId)
      this.dialogVisible = false
      this.tasks = await getAllTasks(this.userId)
    },
    showDialog() {
      this.dialogVisible = true
    },
    async changeStatus(task, status) {
      if (status === false) {
        await changeTaskStatusToNotDone(task.id, this.userId)
      } else {
        await changeTaskStatusToDone(task.id, this.userId)
      }
      this.tasks = await getAllTasks(this.userId)
    },
    currentDayTask(date) {
      this.filteredTasks = this.tasks.filter((task) => task.date === date)
    },
    changeCurrentDay(day) {
      this.currentDayTask(day)
      this.$store.dispatch('changeCurrentDate', day)
    }
  },
  computed: {
    userId() {
      return this.$store.state.user.uid
    },
    taskText() {
      if (this.filteredTasks.length === 1) {
        return 'Task'
      }
      return 'Tasks'
    },
    currentDate() {
      return this.$store.state.currentDate
    }
  },
  async mounted() {
    this.tasks = await getAllTasks(this.userId)
    this.filteredTasks = this.tasks.filter((task) => task.date === this.currentDate)
  },
  watch: {
    tasks(newTasks) {
      this.filteredTasks = newTasks.filter((task) => task.date === this.currentDate)
    }
  }
}
</script>

<style scoped>
.tasks {
  max-width: 762px;
  min-height: 400px;
  width: 100%;
  background-color: var(--color-container-background);
  margin: 30px auto 0;
  border-radius: 16px;
  box-shadow: 0 20px 40px #525354;
}
.tasks__content {
  max-width: 762px;
  width: 100%;
  padding: 50px;
  box-sizing: border-box;
}
.tasks__header {
  max-width: 702px;
  margin: 0;
  display: flex;
  gap: 15px;
  flex-direction: column;
  justify-content: space-between;
}
.tasks__title {
  margin: 0;
  color: var(--color-text-main);
  font-size: 32px;
}
.tasks__container {
  max-width: 702px;
  min-height: 200px;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.tasks__quantity {
  color: var(--color-text-main);
  margin-top: 30px;
}
.tasks__no-quantity {
  color: var(--color-text-main);
  margin-top: 30px;
}
.tasks__list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
}
.tasks__loader {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
}
.tasks__button {
  margin-top: 70px;
  padding: 0;
  max-width: 300px;
  width: 100%;
  height: 50px;
  border: none;
  outline: 1px solid var(--color-container-background);
  border-radius: 20px;
  background-color: var(--color-button-background);
  color: var(--color-button-text);
  cursor: pointer;
  transition:
    opacity 0.3s,
    transform 0.2s;
}
.tasks__button:hover {
  opacity: 0.8;
  transform: scale(101%);
}
.tasks__button:active {
  transform: scale(98%);
}
@media screen and (max-width: 565px) {
  .tasks {
    max-width: 300px;
    min-height: 412px;
    margin: 15px auto 0;
  }
  .tasks__content {
    max-width: 300px;
    padding: 20px;
  }
  .tasks__header {
    max-width: 300px;
    gap: 5px;
  }
  .tasks__title {
    font-size: 20px;
  }
  .tasks__container {
    max-width: 300px;
    min-height: 150px;
  }
  .tasks__quantity {
    font-size: 16px;
    margin-top: 15px;
  }
  .tasks__no-quantity {
    font-size: 16px;
    margin-top: 15px;
    max-width: 220px;
  }
  .tasks__list {
    font-size: 14px;
    gap: 10px;
  }
  .tasks__button {
    margin-top: 85px;
    height: 40px;
    font-size: 14px;
  }
}
</style>
