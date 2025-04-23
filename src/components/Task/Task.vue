<template>
  <div :class="`list-item ${task.state}`">
    <label :for="`archiveTask-${task.id}`" :aria-label="`archiveTask-${task.id}`" class="checkbox">
      <input
        type="checkbox"
        disabled
        name="checked"
        :id="`archiveTask-${task.id}`"
        :checked="task.state === 'TASK_ARCHIVED'"
      />
      <span class="checkbox-custom" @click="$emit('onArchiveTask', task.id)"></span>
    </label>
    <label :for="`title-${task.id}`" :aria-label="task.title" class="title">
      <input
        type="text"
        :value="task.title"
        readonly
        name="title"
        :id="`title-${task.id}`"
        placeholder="Input title"
      />
    </label>
    <button
      v-if="task.state !== 'TASK_ARCHIVED'"
      class="pin-button"
      @click="$emit('onPinTask', task.id)"
      :id="`pinTask-${task.id}`"
      :aria-label="`pinTask-${task.id}`"
      :key="`pinTask-${task.id}`"
    >
      <span class="icon-star"></span>
    </button>
  </div>
</template>
<script lang="ts" setup>
import type { TaskData } from '@/types.ts'
defineProps<{
  task: TaskData
}>()
defineEmits<{
  (e: 'onArchiveTask', id: string): void
  (e: 'onPinTask', id: string): void
}>()
</script>
