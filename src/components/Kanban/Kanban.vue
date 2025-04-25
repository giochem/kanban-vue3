<template>
  <div class="kanban">
    <Tasklist
      @drop="dropTask"
      v-for="(taskList, idx) in myCol"
      :tasks="taskList.tasks"
      :name="String(idx)"
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

function dropTask(sendeId: string, receiveId: string, sendeCol: string, receiveCol: string) {
  console.log('kanban', sendeId, receiveId, sendeCol, receiveCol)
  let moveTaskIdx = myCol.value[Number(sendeCol)].tasks.findIndex((t) => t.id === sendeId)
  const task = myCol.value[Number(sendeCol)].tasks.splice(moveTaskIdx, 1)[0]
  myCol.value[Number(receiveCol)].tasks.push(task)
  console.log(myCol.value)
}
</script>
<style scoped>
.kanban {
  display: flex;
  gap: 1em;
}
</style>
