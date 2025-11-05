import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useApi } from '../composables/useApi'

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref([])
  const { getTasks } = useApi()

  const fetchTasks = async () => {
    try {
      tasks.value = await getTasks()
      console.log('📊 Tareas cargadas:', tasks.value)
    } catch (error) {
      console.error('Error fetching tasks:', error)
      // Datos de respaldo
      tasks.value = [
        { id: 1, title: 'Tarea de ejemplo', description: 'Descripción de ejemplo', priority: 'medium', status: 'pending' }
      ]
    }
  }

  const addTask = (task) => {
    const newTask = {
      id: Date.now(),
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: 'pending',
      created_at: new Date().toISOString()
    }
    tasks.value.push(newTask)
    console.log('➕ Nueva tarea agregada:', newTask)
  }

  return {
    tasks,
    fetchTasks,
    addTask
  }
})
