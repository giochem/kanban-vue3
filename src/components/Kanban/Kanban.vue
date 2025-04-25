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
  let moveTask = myCol.value[Number(sendeCol)].tasks.find((t) => t.id === sendeId)
  if (moveTask) {
    console.log(myCol.value[Number(sendeCol)].tasks.filter((t) => t.id !== sendeId))
    myCol.value[Number(sendeCol)].tasks = myCol.value[Number(sendeCol)].tasks.filter(
      (t) => t.id !== sendeId,
    )
    myCol.value[Number(receiveCol)].tasks.push(moveTask)
  }
}
</script>
<style scoped>
.kanban {
  display: flex;
  gap: 1em;
}
</style>
