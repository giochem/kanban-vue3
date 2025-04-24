<template>
  <div class="dashboard">
    <Kanban :columns="kanban"  />
  </div>
</template>

<script setup lang="ts">
import Kanban from '@/components/Kanban/Kanban.vue'
import * as KanbanStories from '@/components/Kanban/Kanban.stories'

const kanban = KanbanStories.Default.args.columns

function check(e: any) {
  console.log(e, 'run')
}
</script>
