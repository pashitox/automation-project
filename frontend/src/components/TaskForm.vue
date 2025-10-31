<template>
  <div class="task-form">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>➕ Crear Nueva Tarea</span>
        </div>
      </template>

      <el-form :model="form" label-width="120px" @submit.prevent="handleSubmit">
        <el-form-item label="Título">
          <el-input v-model="form.title" placeholder="Escribe el título de la tarea" />
        </el-form-item>
        
        <el-form-item label="Descripción">
          <el-input 
            v-model="form.description" 
            type="textarea" 
            :rows="3"
            placeholder="Describe la tarea en detalle" 
          />
        </el-form-item>
        
        <el-form-item label="Asignado a">
          <el-input v-model="form.assignee" placeholder="email@ejemplo.com" />
        </el-form-item>
        
        <el-form-item label="Fecha límite">
          <el-date-picker 
            v-model="form.dueDate" 
            type="date" 
            placeholder="Selecciona fecha" 
          />
        </el-form-item>
        
        <el-form-item label="Prioridad">
          <el-select v-model="form.priority" placeholder="Selecciona prioridad">
            <el-option label="Alta" value="high" />
            <el-option label="Media" value="medium" />
            <el-option label="Baja" value="low" />
          </el-select>
        </el-form-item>
        
        <el-form-item>
          <el-button 
            type="primary" 
            @click="handleSubmit"
            :loading="loading"
          >
            🚀 Crear Tarea Automatizada
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useApi } from '../composables/useApi'
import { ElMessage } from 'element-plus'

const emit = defineEmits(['task-created'])

const { createTask, loading, error } = useApi()

const form = ref({
  title: '',
  description: '',
  assignee: 'team@company.com',
  dueDate: '',
  priority: 'medium'
})

const handleSubmit = async () => {
  if (!form.value.title) {
    ElMessage.warning('Por favor ingresa un título')
    return
  }

  try {
    // Enviar a n8n
    await createTask(form.value)
    
    // Emitir evento al padre
    emit('task-created', { ...form.value })
    
    ElMessage.success('✅ Tarea creada y enviada para automatización!')
    
    // Reset form
    form.value = {
      title: '',
      description: '',
      assignee: 'team@company.com',
      dueDate: '',
      priority: 'medium'
    }
  } catch (err) {
    ElMessage.error('❌ Error creando tarea: ' + (error.value || err.message))
  }
}
</script>

<style scoped>
.task-form {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
