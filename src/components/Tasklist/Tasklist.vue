<template>
  <div v-if="props.loading" class="list-items" data-testid="loading" key="loading">
    <h3 v-show="props.name !== ''">{{ props.name }}</h3>
    <LoadingRow /><LoadingRow /><LoadingRow /><LoadingRow /><LoadingRow /><LoadingRow />
  </div>
  <div
    v-else-if="props.tasks.length === 0"
    @drop="onDropEmpty"
    @dragover.prevent
    class="list-items"
    key="empty"
    data-testid="empty"
  >
    <h3 v-show="props.name !== ''">{{ props.name }}</h3>
    <div className="wrapper-message">
      <span className="icon-check" />
      <p className="title-message">You have no tasks</p>
      <p className="subtitle-message">Sit back and relax</p>
    </div>
  </div>
  <div v-else class="list-items">
    <h3 v-show="props.name !== ''">{{ props.name }}</h3>
    <Task
      v-for="task in tasksInOrder"
      :key="task.id"
      :id="task.id"
      :title="task.title"
      :state="task.state"
      @input-change="onInputChange"
      @input-dblclick="onInputDblclick"
      @archive-task="onArchiveTask"
      @pin-task="onPinTask"
      @dragstart="onDragstart"
      @drop="onDrop"
      :col-name="props.name"
    />
  </div>
</template>
<script lang="ts" setup>
import type { TaskList } from '@/types.ts'
import Task from '../Task/Task.vue'
import LoadingRow from './LoadingRow.vue'
import { computed } from 'vue'

const props = defineProps<TaskList>()

const emit = defineEmits<{
  (e: 'input-change', ev: Event, id: string, col: number): void
  (e: 'input-dblclick', id: string, col: number): void
  (e: 'archive-task', id: string, col: number, colName?: string): void
  (e: 'pin-task', id: string): void
  (e: 'dragstart', sendeId: string, sendeCol: number): void
  (e: 'drop', sendeId: string, receiveId: string, sendeCol: number, receiveCol: number): void
}>()

const tasksInOrder = computed(() => [
  ...props.tasks.filter((t) => t.state === 'TASK_PINNED'),
  ...props.tasks.filter((t) => t.state !== 'TASK_PINNED'),
])
function onInputChange(ev: Event, id: string) {
  emit('input-change', ev, id, props.col)
}
function onInputDblclick(id: string) {
  emit('input-dblclick', id, props.col)
}

function onArchiveTask(id: string) {
  console.log('Tasklist onArchiveTask', id, props.col, props.name)
  emit('archive-task', id, props.col, props.name)
}
function onPinTask(id: string) {
  emit('pin-task', id)
}
function onDragstart(sendeId: string, event: DragEvent) {
  event.dataTransfer?.setData('senderCol', String(props.col))
  console.log(
    'dragstart tasklist',
    'sendeId',
    sendeId,
    'senderCol',
    Number(event.dataTransfer?.getData('senderCol')),
  )
  emit('dragstart', sendeId, props.col || 0)
}
function onDrop(sendeId: string, receiveId: string, event: DragEvent) {
  console.log('drop tasklist', 'sendeId', sendeId, 'receiveId', receiveId)
  emit(
    'drop',
    sendeId,
    receiveId,
    Number(event.dataTransfer?.getData('senderCol')) || 0,
    props.col || 0,
  )
}
function onDropEmpty(event: DragEvent) {
  console.log(
    event.dataTransfer?.getData('id') || '',
    '',
    Number(event.dataTransfer?.getData('senderCol')),
    props.col || 0,
  )
  emit(
    'drop',
    event.dataTransfer?.getData('id') || '',
    '',
    Number(event.dataTransfer?.getData('senderCol')) || 0,
    props.col || 0,
  )
}
</script>
