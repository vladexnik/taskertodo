import { db } from '@/firebase/config'
import { collection, getDocs, doc, getDoc, addDoc, deleteDoc, updateDoc } from 'firebase/firestore'

function dateInit(timestamp) {
  // console.log(timestamp.toDate().toISOString().split('T')[0].split('-').reverse().join('.'))
  return timestamp.toDate().toISOString().split('T')[0].split('-').reverse().join('.')
}

export const getAllTasks = async (userId) => {
  try {
    if (userId) {
      const tasks = []
      const querySnapshot = await getDocs(collection(db, 'users', userId, 'todos'))
      querySnapshot.forEach((doc) => {
        tasks.push({
          id: doc.id,
          title: doc.data().title,
          description: doc.data().description,
          checked: doc.data().checked,
          date: dateInit(doc.data().date)
        })
      })
      return tasks
    }
  } catch (e) {
    console.log(e)
  }
}

export const getTaskById = async (taskId, userId) => {
  try {
    const taskRef = doc(db, 'users', userId, 'todos', taskId)
    const taskSnap = await getDoc(taskRef)
    if (taskSnap.exists()) {
      let task = {
        id: taskSnap.id,
        title: taskSnap.data().title,
        description: taskSnap.data().description,
        checked: taskSnap.data().checked,
        date: dateInit(taskSnap.data().date)
      }
      // console.log(task)
      return task
    }
  } catch (e) {
    console.log(e)
  }
}

export const addNewTask = async (task, id) => {
  task.date = new Date(task.date)
  await addDoc(collection(db, 'users', id, 'todos'), task)
}

export const deleteTask = async (taskId, userId) => {
  await deleteDoc(doc(db, 'users', userId, 'todos', taskId))
}

export const updateTask = async (task, userId) => {
  const updatedTask = doc(db, 'users', userId, 'todos', task.id)

  await updateDoc(updatedTask, {
    title: task.title,
    description: task.description
    // date: new Date(task.date)
  })
}

export const updateStatus = async (task, userId, checkedStatus) => {
  const updatedTask = doc(db, 'users', userId, 'todos', task.id)
  await updateDoc(updatedTask, {
    checked: checkedStatus
  })
}
