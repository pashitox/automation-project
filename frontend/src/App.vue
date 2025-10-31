<template>
  <div id="app">
    <el-container>
      <el-header style="background: #409EFF; color: white; display: flex; align-items: center;">
        <h1>🚀 Automated Project Manager</h1>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
// Componente principal
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.el-header {
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
</style>
