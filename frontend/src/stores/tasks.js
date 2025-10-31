import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useApi } from '../composables/useApi'

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref([])
  const projects = ref([])
  const { getProjects } = useApi()

  const fetchTasks = async () => {
    try {
      projects.value = await getProjects()
      // Simulamos tareas para demo
      tasks.value = [
        { id: 1, title: 'Diseñar logo', status: 'completed', priority: 'high' },
        { id: 2, title: 'Desarrollar API', status: 'in-progress', priority: 'high' },
        { id: 3, title: 'Documentación', status: 'pending', priority: 'medium' }
      ]
    } catch (error) {
      console.error('Error fetching tasks:', error)
    }
  }

  const addTask = (task) => {
    tasks.value.push({
      id: Date.now(),
      ...task,
      status: 'pending',
      created_at: new Date().toISOString()
    })
  }

  return {
    tasks,
    projects,
    fetchTasks,
    addTask
  }
})
