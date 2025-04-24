<template>
  <div :class="`list-item ${state}`">
    <label :for="`archiveTask-${id}`" :aria-label="`archiveTask-${id}`" class="checkbox">
      <input
        type="checkbox"
        disabled
        name="checked"
        :id="`archiveTask-${id}`"
        :checked="state === 'TASK_ARCHIVED'"
      />
      <span class="checkbox-custom" @click="archiveTask"></span>
    </label>
    <label :for="`title-${id}`" :aria-label="title" class="title">
      <input
        type="text"
        :value="title"
        readonly
        name="title"
        :id="`title-${id}`"
        placeholder="Input title"
      />
    </label>
    <button
      v-if="state !== 'TASK_ARCHIVED'"
      class="pin-button"
      @click="pinTask"
      :id="`pinTask-${id}`"
      :aria-label="`pinTask-${id}`"
      :key="`pinTask-${id}`"
    >
      <span class="icon-star"></span>
    </button>
  </div>
</template>
<script lang="ts" setup>
import type { TaskData } from '@/types.ts'
const props = defineProps<TaskData>()
let { id, title, state } = props

const emit = defineEmits<{
  (e: 'archiveTask', id: string): void
  (e: 'pinTask', id: string): void
}>()
function archiveTask() {
  emit('archiveTask', id)
}
function pinTask() {
  emit('pinTask', id)
}
</script>
