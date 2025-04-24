<template>
  <div v-if="loading" class="list-items" data-testid="loading" key="loading">
    <h3 v-show="name !== ''">{{ name }}</h3>
    <LoadingRow /><LoadingRow /><LoadingRow /><LoadingRow /><LoadingRow /><LoadingRow />
  </div>
  <div
    v-else-if="tasks.length === 0"
    @drop="onDropEmpty"
    @dragover.prevent
    class="list-items"
    key="empty"
    data-testid="empty"
  >
    <div className="wrapper-message">
      <span className="icon-check" />
      <p className="title-message">You have no tasks</p>
      <p className="subtitle-message">Sit back and relax</p>
    </div>
  </div>
  <div v-else class="list-items">
    <h3 v-show="name !== ''">{{ name }}</h3>
    <Task
      v-for="task in tasksInOrder"
      :key="task.id"
      :id="task.id"
      :title="task.title"
      :state="task.state"
      @archive-task="onArchiveTask"
      @pin-task="onPinTask"
      @dragstart="onDragstart"
      @drop="onDrop"
    />
  </div>
</template>
<script lang="ts" setup>
import type { TaskList } from '@/types.ts'
import Task from '../Task/Task.vue'
import LoadingRow from './LoadingRow.vue'
import { computed } from 'vue'

const props = defineProps<TaskList>()
let { name, loading, tasks } = props

const emit = defineEmits<{
  (e: 'archive-task', id: string): void
  (e: 'pin-task', id: string): void
  (e: 'dragstart', sendeId: string, sendeCol: string): void
  (e: 'drop', sendeId: string, receiveId: string, sendeCol: string, receiveCol: string): void
}>()

const tasksInOrder = computed(() => [
  ...tasks.filter((t) => t.state === 'TASK_PINNED'),
  ...tasks.filter((t) => t.state !== 'TASK_PINNED'),
])

function onArchiveTask(id: string) {
  emit('archive-task', id)
}
function onPinTask(id: string) {
  emit('pin-task', id)
}
function onDragstart(sendeId: string, event: DragEvent) {
  event.dataTransfer?.setData('senderCol', props.name || '')
  console.log(
    'dragstart tasklist',
    'sendeId',
    sendeId,
    'senderCol',
    event.dataTransfer?.getData('senderCol'),
  )
  emit('dragstart', sendeId, props.name || '')
}
function onDrop(sendeId: string, receiveId: string, event: DragEvent) {
  console.log('drop tasklist', 'sendeId', sendeId, 'receiveId', receiveId)
  emit('drop', sendeId, receiveId, event.dataTransfer?.getData('senderCol') || '', props.name || '')
}
function onDropEmpty(event: DragEvent) {
  console.log(
    event.dataTransfer?.getData('id') || '',
    '',
    event.dataTransfer?.getData('senderCol') || '',
    props.name || '',
  )
  emit(
    'drop',
    event.dataTransfer?.getData('id') || '',
    '',
    event.dataTransfer?.getData('senderCol') || '',
    props.name || '',
  )
}
</script>
