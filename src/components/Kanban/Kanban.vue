<template>
  <div class="kanban">
    <Tasklist
      @drop="dropTask"
      @archive-task="onArchiveTask"
      v-for="(taskList, idx) in myCol"
      :tasks="taskList.tasks"
      :name="taskList.name"
      :col="idx"
    />
  </div>
</template>
<script setup lang="ts">
import Tasklist from '../Tasklist/Tasklist.vue'
import type { TaskList } from '@/types.ts'
import { ref } from 'vue'
type Kanban = {
  columns: TaskList[]
}
const props = defineProps<Kanban>()
const myCol = ref(props.columns)

function dropTask(sendeId: string, receiveId: string, sendeCol: number, receiveCol: number) {
  console.log('kanban', sendeId, receiveId, sendeCol, receiveCol)
  let moveTaskIdx = myCol.value[sendeCol].tasks.findIndex((t) => t.id === sendeId)
  const task = myCol.value[sendeCol].tasks.splice(moveTaskIdx, 1)[0]
  myCol.value[receiveCol].tasks.push(task)
}
function onArchiveTask(id: string, col: string) {}
</script>
<style scoped>
.kanban {
  display: flex;
  gap: 1em;
}
</style>
