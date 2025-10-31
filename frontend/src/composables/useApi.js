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
      const response = await axios.post(`${baseUrl}/webhook/task-created`, taskData)
      return response.data
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const getProjects = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await axios.get(`${baseUrl}/webhook/get-projects`)
      return response.data
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    createTask,
    getProjects
  }
}
