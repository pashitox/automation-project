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
      
      // Usar create-task (NO task-created)
      const response = await axios.post(`${baseUrl}/webhook/create-task`, taskData)
      
      console.log('✅ n8n respondió:', response.data)
      
      if (response.data.success) {
        alert('🎉 ' + response.data.message)
        // Recargar después de 1 segundo
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      }
      
      return response.data
      
    } catch (err) {
      error.value = 'Error: ' + (err.response?.data?.message || err.message)
      console.error('❌ Error:', err)
      alert('😞 ' + error.value)
      throw err
    } finally {
      loading.value = false
    }
  }

  const getTasks = async () => {
    // Datos de ejemplo que coinciden con la base de datos
    return [
      { 
        id: 1, 
        title: 'Diseñar banners promocionales', 
        description: 'Crear banners para redes sociales', 
        priority: 'high', 
        status: 'completed' 
      },
      { 
        id: 2, 
        title: 'Planificar contenido mensual', 
        description: 'Calendarizar posts para noviembre', 
        priority: 'medium', 
        status: 'in-progress' 
      },
      { 
        id: 3, 
        title: 'Desarrollar API REST', 
        description: 'Crear endpoints para el frontend', 
        priority: 'high', 
        status: 'in-progress' 
      },
      { 
        id: 4, 
        title: 'Configurar n8n workflows', 
        description: 'Implementar automatizaciones', 
        priority: 'medium', 
        status: 'pending' 
      }
    ]
  }

  return {
    loading,
    error,
    createTask,
    getTasks
  }
}
