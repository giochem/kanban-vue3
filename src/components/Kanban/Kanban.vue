<template>
  <div class="kanban">
    <Tasklist
      @input-change="onInputChange"
      @input-dblclick="onInputDblclick"
      @drop="dropTask"
      @archive-task="onArchiveTask"
      @remove-task="onRemoveTask"
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
import { ref, watchEffect } from 'vue'
type Kanban = {
  columns: TaskList[]
}
const props = defineProps<Kanban>()
const myCol = ref(props.columns)
watchEffect(() => {
  console.log('effect', props.columns)
  myCol.value = props.columns
})

function onInputChange(ev: Event, id: string, col: number) {
  const taskIdx = myCol.value[col].tasks.findIndex((t) => t.id === id)
  myCol.value[col].tasks[taskIdx].title =
    (ev.target as HTMLInputElement)?.value || myCol.value[col].tasks[taskIdx].title
}
function onInputDblclick(id: string, col: number) {
  const taskIdx = myCol.value[col].tasks.findIndex((t) => t.id === id)
  myCol.value[col].tasks[taskIdx].readonly = false
}

function dropTask(sendeId: string, receiveId: string, sendeCol: number, receiveCol: number) {
  console.log('kanban', sendeId, receiveId, sendeCol, receiveCol)
  let moveTaskIdx = myCol.value[sendeCol].tasks.findIndex((t) => t.id === sendeId)
  const task = myCol.value[sendeCol].tasks.splice(moveTaskIdx, 1)[0]
  if (sendeCol === 2) {
    task.state = 'TASK_INBOX'
  }
  if (receiveCol === 2) {
    task.state = 'TASK_ARCHIVED'
  }
  if (sendeCol === receiveCol) {
    const insertIdx = myCol.value[sendeCol].tasks.findIndex((t) => t.id === receiveId)
    console.log('order in same col', insertIdx)
    myCol.value[sendeCol].tasks.splice(insertIdx, 0, task)
  } else {
    myCol.value[receiveCol].tasks.unshift(task)
  }
}
function onArchiveTask(id: string, col: number, colName?: string) {
  console.log('Kanban onArchiveTask', id, col, colName)
  if (colName === 'Done') {
    return
  }
  const taskIdx = myCol.value[col].tasks.findIndex((t) => t.id === id)
  let moveTask = myCol.value[col].tasks.splice(taskIdx, 1)[0]
  if (colName === 'Progress') {
    moveTask.state = 'TASK_ARCHIVED'
  }
  myCol.value[col + 1].tasks.unshift(moveTask)
}
function onRemoveTask(id: string, col: number) {
  console.log('Kanban onRemoveTask', id, col)
  const taskIdx = myCol.value[col].tasks.findIndex((t) => t.id === id)
  myCol.value[col].tasks.splice(taskIdx, 1)
}
</script>
<style scoped>
.kanban {
  display: flex;
  gap: 1em;
}
</style>
