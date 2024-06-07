import { db } from '@/main'
import { collection, getDocs, doc, getDoc, addDoc, deleteDoc, updateDoc } from 'firebase/firestore'

function dateInit(timestamp) {
  return timestamp.toDate().toISOString().split('T')[0].split('-').reverse().join('.')
}

export const getAllTasks = async (userId) => {
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

export const getTaskById = async (taskId, userId) => {
  const docRef = doc(db, 'users', userId, 'todos', taskId)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    let task = {
      id: taskId,
      title: docSnap.data().title,
      description: docSnap.data().description,
      checked: docSnap.data().checked,
      date: dateInit(docSnap.data().date)
    }
    console.log(task)
    return task
  } else return 'No this task.'
}

export const addNewTask = async (task, id) => {
  task.date = new Date(task.date)
  await addDoc(collection(db, 'users', id, 'todos'), task)
}

export const deleteTask = async (task, id) => {
  await deleteDoc(doc(db, 'users', id, 'todos', task.id))
}

export const updateTask = async (task, userId) => {
  const updatedTask = doc(db, 'users', userId, 'todos', task.id)

  await updateDoc(updatedTask, {
    title: task.title,
    description: task.description,
    date: new Date(task.date)
  })
}

export const updateStatus = async (task, userId, checkedStatus) => {
  const updatedTask = doc(db, 'users', userId, 'todos', task.id)
  await updateDoc(updatedTask, {
    checked: checkedStatus
  })
}
