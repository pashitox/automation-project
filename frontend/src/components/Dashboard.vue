<template>
  <div class="dashboard">
    <el-row :gutter="20">
      <el-col :span="16">
        <div class="grid-content">
          <h2>📊 Dashboard</h2>
          <TaskForm @task-created="handleTaskCreated" />
          <TaskList :tasks="tasks" />
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content">
          <h3>📈 Estadísticas</h3>
          <el-card>
            <p>Total tareas: {{ tasks.length }}</p>
            <p>Completadas: {{ completedTasks }}</p>
            <p>En progreso: {{ inProgressTasks }}</p>
            <p>Pendientes: {{ pendingTasks }}</p>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useTasksStore } from '../stores/tasks'
import TaskForm from './TaskForm.vue'
import TaskList from './TaskList.vue'

const tasksStore = useTasksStore()
const { tasks, fetchTasks } = tasksStore

const completedTasks = computed(() => tasks.filter(t => t.status === 'completed').length)
const inProgressTasks = computed(() => tasks.filter(t => t.status === 'in-progress').length)
const pendingTasks = computed(() => tasks.filter(t => t.status === 'pending').length)

const handleTaskCreated = (task) => {
  tasksStore.addTask(task)
}

onMounted(() => {
  fetchTasks()
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
</style>
