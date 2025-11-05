import { ref } from 'vue'
import axios from 'axios'

const baseUrl = 'http://localhost:5678'

export function useApi() {
  const loading = ref(false)
  const error = ref(null)

  const createTask = async (taskData) => {
    loading.value = true
    error.value = null
    try {
      console.log('🚀 Enviando tarea a n8n:', taskData)
      
      const response = await axios.post(`${baseUrl}/webhook/create-task`, taskData)
      
      console.log('✅ n8n respondió:', response.data)
      
      // MANEJAR AMBOS FORMATOS DE RESPUESTA:
      if (response.data.success || response.data.id) {
        const message = response.data.message || "�� ¡Tarea guardada en la base de datos!"
        alert(message)
        // Recargar después de 1 segundo para ver la nueva tarea
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      }
      
      return response.data
      
    } catch (err) {
      error.value = 'Error: ' + (err.response?.data?.message || err.message)
      console.error('❌ Error:', err)
      alert('😞 Error al procesar la tarea')
      throw err
    } finally {
      loading.value = false
    }
  }

  const getTasks = async () => {
    loading.value = true
    error.value = null
    try {
      console.log('📡 Solicitando tareas desde PostgreSQL...')
      const response = await axios.get(`${baseUrl}/webhook/get-tasks-list`)
      
      console.log('✅ Respuesta completa de get-tasks-list:', response.data)
      
      // VERIFICAR LA NUEVA ESTRUCTURA CORRECTA
      if (response.data.success && Array.isArray(response.data.tasks)) {
        console.log(`🎉 ¡ÉXITO! Se cargaron ${response.data.tasks.length} tareas`)
        console.log('📋 Tareas específicas:', response.data.tasks)
        return response.data.tasks
      } else {
        console.warn('⚠️ Estructura inesperada:', response.data)
        return []
      }
      
    } catch (err) {
      error.value = 'Error cargando tareas: ' + (err.response?.data?.message || err.message)
      console.error('❌ Error al obtener tareas:', err)
      return []
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    createTask,
    getTasks
  }
}
