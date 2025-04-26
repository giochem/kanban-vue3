<template>
  <div class="dashboard">
    <div>
      <input type="text" v-model="newTask" />
      <button @click="addTask">Add</button>
      <br />
      <input type="text" v-model="search" placeholder="search" />
    </div>
    <Kanban :columns="kanban" />
  </div>
</template>

<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'

import Kanban from '@/components/Kanban/Kanban.vue'
import * as KanbanStories from '@/components/Kanban/Kanban.stories'
import { ref, watch, computed } from 'vue'

const search = ref('')
const kanban = ref(KanbanStories.Default.args.columns)

const newTask = ref('new task')
watch(search, () => {
  kanban.value = kanban.value.map((taskList) => {
    return {
      ...taskList,
      tasks: taskList.tasks.map((task) => {
        return { ...task, hidden: task.title.includes(search.value) === false }
      }),
    }
  })
})

function addTask() {
  console.log('addTask')
  kanban.value[0].tasks.unshift({
    id: uuidv4(),
    title: newTask.value,
    state: 'TASK_INBOX',
    readonly: true,
    hidden: false,
  })
  console.log(kanban.value[0])
}
</script>
