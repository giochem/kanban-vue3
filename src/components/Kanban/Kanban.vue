<template>
  <div class="kanban">
    <Tasklist v-for="(taskList, idx) in columns" :tasks="taskList.tasks" :name="String(idx)" />
  </div>
</template>
<script setup lang="ts">
import Tasklist from '../Tasklist/Tasklist.vue'
import type { TaskList } from '@/types.ts'

type Kanban = {
  columns: TaskList[]
}
const props = defineProps<Kanban>()
</script>
<style scoped>
.kanban {
  display: flex;
  gap: 1em;
}
</style>
