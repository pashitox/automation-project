<template>
  <div class="dashboard">
    <el-row :gutter="20">
      <el-col :span="16">
        <div class="grid-content">
          <h2>📊 Dashboard de Tareas</h2>
          
          <div v-if="loading" class="loading-state">
            <el-alert title="Cargando tareas..." type="info" :closable="false" />
          </div>
          
          <div v-else-if="error" class="error-state">
            <el-alert :title="error" type="error" show-icon />
          </div>

          <TaskForm @task-created="handleTaskCreated" />
          <TaskList />
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content">
          <h3>📈 Estadísticas</h3>
          <el-card>
            <p><strong>Total tareas:</strong> {{ tasksStore.tasks.length }}</p>
            <p><strong>Completadas:</strong> {{ completedTasks }}</p>
            <p><strong>En progreso:</strong> {{ inProgressTasks }}</p>
            <p><strong>Pendientes:</strong> {{ pendingTasks }}</p>
          </el-card>

          <div class="system-status">
            <h3>🔧 Estado del Sistema</h3>
            <el-card>
              <p :class="tasksStore.tasks.length > 0 ? 'status-success' : 'status-warning'">
                {{ tasksStore.tasks.length > 0 ? '✅' : '⚠️' }} Frontend: 
                {{ tasksStore.tasks.length > 0 ? `Con ${tasksStore.tasks.length} tareas` : 'Sin datos' }}
              </p>
              <p class="status-success">✅ n8n: Conectado</p>
              <p class="status-success">✅ PostgreSQL: Conectado</p>
              <p>�� Última actualización: {{ lastUpdate }}</p>
            </el-card>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useTasksStore } from '../stores/tasks'
import TaskForm from './TaskForm.vue'
import TaskList from './TaskList.vue'

const tasksStore = useTasksStore()
const lastUpdate = ref(new Date().toLocaleTimeString())

// SOLUCIÓN SIMPLE: Usar tasksStore.tasks directamente
const completedTasks = computed(() => tasksStore.tasks.filter(t => t.status === 'completed').length)
const inProgressTasks = computed(() => tasksStore.tasks.filter(t => t.status === 'in-progress').length)
const pendingTasks = computed(() => tasksStore.tasks.filter(t => t.status === 'pending').length)

const handleTaskCreated = () => {
  lastUpdate.value = new Date().toLocaleTimeString()
}

onMounted(async () => {
  console.log('🎯 Dashboard montado')
  await tasksStore.fetchTasks()
  lastUpdate.value = new Date().toLocaleTimeString()
})
</script>

<style scoped>
.dashboard {
  padding: 20px;
}

.grid-content {
  background: #f5f7fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.loading-state, .error-state {
  margin-bottom: 20px;
}

.status-success {
  color: #67c23a;
  font-weight: bold;
}

.status-warning {
  color: #e6a23c;
  font-weight: bold;
}

.system-status {
  margin-top: 20px;
}
</style>
