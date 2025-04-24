<template>
  <div
    @drop="drop"
    @dragexit.prevent
    @dragover.prevent
    draggable="true"
    @dragstart="dragstart"
    :class="`list-item ${props.state}`"
  >
    <label
      :for="`archiveTask-${props.id}`"
      :aria-label="`archiveTask-${props.id}`"
      class="checkbox"
    >
      <input
        type="checkbox"
        disabled
        name="checked"
        :id="`archiveTask-${props.id}`"
        :checked="props.state === 'TASK_ARCHIVED'"
      />
      <span class="checkbox-custom" @click="archiveTask"></span>
    </label>
    <label :for="`title-${props.id}`" :aria-label="props.title" class="title">
      <input
        type="text"
        :value="props.title"
        readonly
        name="title"
        :id="`title-${props.id}`"
        placeholder="Input title"
      />
    </label>
    <button
      v-if="props.state !== 'TASK_ARCHIVED'"
      class="pin-button"
      @click="pinTask"
      :id="`pinTask-${props.id}`"
      :aria-label="`pinTask-${props.id}`"
      :key="`pinTask-${props.id}`"
    >
      <span class="icon-star"></span>
    </button>
  </div>
</template>
<script lang="ts" setup>
import type { TaskData } from '@/types.ts'
const props = defineProps<TaskData>()

const emit = defineEmits<{
  (e: 'archive-task', id: string): void
  (e: 'pin-task', id: string): void
  (e: 'dragstart', sendeId: string, event: DragEvent): void
  (e: 'drop', senderId: string, receiveId: string, event: DragEvent): void
}>()
function archiveTask() {
  emit('archive-task', props.id)
}
function pinTask() {
  emit('pin-task', props.id)
}
function dragstart(ev: DragEvent) {
  ev.dataTransfer?.setData('id', props.id)
  console.log('dragstart', props.id, ev.dataTransfer?.getData('id'))
  emit('dragstart', ev.dataTransfer?.getData('id') || '', ev)
}
function drop(ev: DragEvent) {
  console.log('drop', 'sendeId', ev.dataTransfer?.getData('id'), 'receiveId', props.id)
  emit('drop', ev.dataTransfer?.getData('id') || '', props.id, ev)
}
</script>
