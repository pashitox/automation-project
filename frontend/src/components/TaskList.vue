<template>
  <div class="task-list">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>📋 Lista de Tareas</span>
        </div>
      </template>

      <el-table :data="tasks" style="width: 100%">
        <el-table-column prop="title" label="Título" width="200" />
        <el-table-column prop="description" label="Descripción" />
        <el-table-column prop="priority" label="Prioridad" width="120">
          <template #default="scope">
            <el-tag 
              :type="scope.row.priority === 'high' ? 'danger' : 
                    scope.row.priority === 'medium' ? 'warning' : 'success'"
            >
              {{ scope.row.priority }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="Estado" width="120">
          <template #default="scope">
            <el-tag 
              :type="scope.row.status === 'completed' ? 'success' : 
                    scope.row.status === 'in-progress' ? 'warning' : 'info'"
            >
              {{ scope.row.status }}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
defineProps({
  tasks: {
    type: Array,
    default: () => []
  }
})
</script>

<style scoped>
.task-list {
  margin-top: 20px;
}
</style>
