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
        :readonly="props.readonly"
        name="title"
        @input="input"
        :id="`title-${props.id}`"
        placeholder="Input title"
        @dblclick="dblclick"
        :value="props.title"
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
  (e: 'input-change', ev: Event, id: string): void
  (e: 'input-dblclick', id: string): void
  (e: 'archive-task', id: string): void
  (e: 'pin-task', id: string): void
  (e: 'dragstart', sendeId: string, ev: DragEvent): void
  (e: 'drop', senderId: string, receiveId: string, ev: DragEvent): void
}>()
function input(ev: Event) {
  emit('input-change', ev, props.id)
}
function dblclick() {
  emit('input-dblclick', props.id)
}
function archiveTask() {
  emit('archive-task', props.id)
}
function pinTask() {
  emit('pin-task', props.id)
}
function dragstart(event: DragEvent) {
  event.dataTransfer?.setData('id', props.id)
  console.log('dragstart', props.id, event.dataTransfer?.getData('id'))
  emit('dragstart', event.dataTransfer?.getData('id') || '', event)
}
function drop(event: DragEvent) {
  console.log('drop', 'sendeId', event.dataTransfer?.getData('id'), 'receiveId', props.id)
  emit('drop', event.dataTransfer?.getData('id') || '', props.id, event)
}
</script>
