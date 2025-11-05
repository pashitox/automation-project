<template>
  <div class="task-list">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>📋 Lista de Tareas ({{ tasks.length }})</span>
          <el-button @click="forceRefresh" type="primary" size="small">
            🔄 Actualizar
          </el-button>
        </div>
      </template>

      <!-- Estados -->
      <div v-if="loading" class="loading-state">
        <el-alert title="Cargando tareas..." type="info" :closable="false" />
      </div>

      <div v-else-if="error" class="error-state">
        <el-alert :title="error" type="error" />
      </div>

      <div v-else-if="tasks.length === 0" class="no-data">
        <p>📭 No hay tareas creadas</p>
        <el-button @click="forceRefresh" type="text">Intentar de nuevo</el-button>
      </div>

      <el-table v-else :data="tasks" style="width: 100%" empty-text="No hay datos">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="title" label="Título" width="200" />
        <el-table-column prop="description" label="Descripción" />
        <el-table-column prop="priority" label="Prioridad" width="120">
          <template #default="scope">
            <el-tag 
              :type="scope.row.priority === 'high' ? 'danger' : 
                    scope.row.priority === 'medium' ? 'warning' : 'success'"
            >
              {{ scope.row.priority === 'high' ? 'Alta' : 
                 scope.row.priority === 'medium' ? 'Media' : 'Baja' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="Estado" width="120">
          <template #default="scope">
            <el-tag 
              :type="scope.row.status === 'completed' ? 'success' : 
                    scope.row.status === 'in-progress' ? 'warning' : 'info'"
            >
              {{ scope.row.status === 'completed' ? 'Completada' : 
                 scope.row.status === 'in-progress' ? 'En progreso' : 'Pendiente' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="assignee_email" label="Asignado" width="180" />
        <el-table-column prop="created_at" label="Creado" width="150">
          <template #default="scope">
            {{ new Date(scope.row.created_at).toLocaleDateString() }}
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useTasksStore } from '../stores/tasks'

const tasksStore = useTasksStore()

// Usar el store directamente en lugar de props
const tasks = computed(() => tasksStore.tasks)
const loading = computed(() => tasksStore.loading)
const error = computed(() => tasksStore.error)

const forceRefresh = async () => {
  console.log('🔄 Forzando actualización de tareas...')
  await tasksStore.fetchTasks()
}

onMounted(() => {
  console.log('📋 TaskList montado')
  console.log('📊 Tareas en store:', tasks.value.length)
  console.log('🔍 Contenido:', tasks.value)
  
  // Si no hay tareas, intentar cargarlas
  if (tasks.value.length === 0 && !loading.value) {
    console.log('🔄 No hay tareas, intentando cargar...')
    forceRefresh()
  }
})
</script>

<style scoped>
.task-list {
  margin-top: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.loading-state, .error-state, .no-data {
  margin: 20px 0;
  text-align: center;
}

.no-data {
  color: #909399;
  padding: 40px;
}
</style>
