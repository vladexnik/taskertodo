<script setup>
import ToDoItem from './ToDoItem.vue'
import { computed, ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { getTaskById, updateTask, deleteTask } from '../api/service'
import Loader from '../loader/Loader.vue'
import { useLoader } from '../composables/useLoader'
import IconBack from '../icons/IconBack.vue'
import IconDelete from '../icons/IconDelete.vue'
import IconUpdate from '../icons/IconUpdate.vue'
import IconAdd from '../icons/IconAdd.vue'

const store = useStore()
const route = useRoute()
const router = useRouter()
const disableUpdFlag = ref(true)
const userId = computed(() => store.state.user?.uid)
const taskId = ref(route.params.id)
let onetask = ref(null)
const { isLoading, showLoader, hideLoader } = useLoader()

function changeFlag(bool) {
  disableUpdFlag.value = bool
}

async function getSingleTask(taskId, userId) {
  onetask.value = await getTaskById(taskId, userId)
  return onetask.value
}

async function handleDeleteTask(taskId, userId) {
  await deleteTask(taskId, userId)
  router.push('/')
}

async function handleUpdateTask(task, userId) {
  showLoader()
  onetask.value = await updateTask(task, userId)
  await getSingleTask(taskId.value, userId)
  changeFlag(1)
  hideLoader()
}

watchEffect(async () => {
  showLoader()
  onetask.value = await getSingleTask(taskId.value, userId.value)
  hideLoader()
})
</script>

<template>
  <div class="wrapper">
    <button @click="$router.back()" type="button" class="back">
      <IconBack />
      Today's tasks
    </button>
    <form @submit.prevent="" class="form-item" v-if="onetask">
      <ToDoItem :task="onetask" :title="onetask.title" v-model="onetask.checked" />
      <label class="form-item__label">
        Task Title:
        <input
          type="text"
          name="title"
          v-model="onetask.title"
          class="form-item__input-title form-item__input"
          :disabled="disableUpdFlag"
        />
      </label>
      <label class="form-item__label">
        Description Title:
        <textarea
          type="text"
          name="description"
          v-model="onetask.description"
          class="form-item__input-description form-item__input"
          :disabled="disableUpdFlag"
          rows="15"
          columns="20"
        />
      </label>
      <div class="buttons">
        <button type="button" @click="handleDeleteTask(taskId, userId)" class="buttons__btn delete">
          <IconDelete />
        </button>
        <button
          @click="changeFlag(0)"
          type="button"
          class="buttons__btn update"
          :disabled="!disableUpdFlag"
        >
          <IconUpdate />
        </button>

        <button
          type="submit"
          @click.prevent="handleUpdateTask(onetask, userId)"
          class="buttons__btn done"
          :disabled="disableUpdFlag"
        >
          <IconAdd />
        </button>
      </div>
    </form>
    <div v-else>
      <Loader :isLoading="isLoading" />
    </div>
    <div class="buttons"></div>
  </div>
</template>

<style scoped>
.form-item__input:disabled {
  border: none;
  color: black;
}
.buttons__btn:disabled {
  background-color: var(--grey-color);
}

.delete {
  background-color: var(--red-color);
}

.done {
  background-color: var(--green-color);
}
</style>
