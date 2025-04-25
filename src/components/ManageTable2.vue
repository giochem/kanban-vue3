<template>
  <div class="dashboard">
    <div><input type="text" v-model="newTask" /><button @click="addTask">Add</button></div>
    <Kanban :columns="kanban" />
  </div>
</template>

<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'

import Kanban from '@/components/Kanban/Kanban.vue'
import * as KanbanStories from '@/components/Kanban/Kanban.stories'
import { ref } from 'vue'
const kanban = ref(KanbanStories.Default.args.columns)
const newTask = ref('new task')
function addTask() {
  kanban.value[0].tasks.unshift({
    id: uuidv4(),
    title: newTask.value,
    state: 'TASK_INBOX',
  })
}
</script>
