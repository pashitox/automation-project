import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useApi } from '../composables/useApi'

export const useTasksStore = defineStore('tasks', () => {
  // Estado reactivo
  const tasks = ref([])
  const loading = ref(false)
  const error = ref(null)
  
  const { getTasks } = useApi()

  const fetchTasks = async () => {
    loading.value = true
    error.value = null
    try {
      console.log('🔄 Store: Iniciando carga de tareas...')
      const tasksData = await getTasks()
      
      console.log('📦 Store: Datos recibidos:', tasksData)
      console.log('🔢 Store: Número de tareas:', tasksData.length)
      
      // ASIGNACIÓN DIRECTA - clave para la reactividad
      tasks.value = Array.isArray(tasksData) ? tasksData : []
      
      console.log('✅ Store: Tareas cargadas exitosamente:', tasks.value.length, 'tareas')
      
    } catch (err) {
      error.value = 'Error cargando tareas: ' + err.message
      console.error('❌ Store: Error en fetchTasks:', err)
      tasks.value = []
    } finally {
      loading.value = false
    }
  }

  const addTask = (task) => {
    const newTask = {
      id: Date.now(),
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: 'pending',
      assignee_email: 'team@company.com',
      created_at: new Date().toISOString()
    }
    tasks.value.unshift(newTask)
    console.log('➕ Store: Nueva tarea agregada localmente:', newTask)
  }

  // Exportar directamente las refs para reactividad
  return {
    tasks,
    loading,
    error,
    fetchTasks,
    addTask
  }
})
