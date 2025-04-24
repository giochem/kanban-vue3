<template>
  <input
    type="text"
    :value="props.title"
    readonly
    name="title"
    :id="`title-${props.id}`"
    placeholder="Input title"
  />
</template>
<script setup lang="ts">
import type { InputProps } from '@/types.ts'
const props = defineProps<InputProps>()
</script>
