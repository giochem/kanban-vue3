<template>
  <div v-if="loading" class="list-items" data-testid="loading" key="loading">
    <h3 v-show="name !== ''">{{ name }}</h3>
    <LoadingRow /><LoadingRow /><LoadingRow /><LoadingRow /><LoadingRow /><LoadingRow />
  </div>
  <div v-else-if="tasks.length === 0" class="list-items" key="empty" data-testid="empty">
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
</script>
