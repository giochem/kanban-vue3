<script setup lang="ts">
import { ref } from 'vue'
const newTask = ref('')
const tasks = ref([
  [
    { title: 'task1', description: 'desc', col: 0, id: 1, edit: false },
    { title: 'task2', description: 'desc', col: 0, id: 2, edit: false },
  ],
  [
    { title: 'task3', description: 'desc', col: 1, id: 3, edit: false },
    { title: 'task4', description: 'desc', col: 1, id: 4, edit: false },
  ],
  [
    { title: 'task5', description: 'desc', col: 2, id: 5, edit: false },
    { title: 'task6', description: 'desc', col: 2, id: 6, edit: false },
  ],
])

function onDrop(ev: any) {
  console.log('onDrop')
  console.log(ev)
  console.log(ev.dataTransfer)
  console.log(ev.target.getAttribute('col'))

  const transferId = Number(ev.dataTransfer.getData('id'))
  const transferCol = Number(ev.dataTransfer.getData('col'))
  const orderIdx = tasks.value[transferCol].findIndex((t) => t.id === transferId)
  let task = tasks.value[transferCol].splice(orderIdx, 1)[0] // return only one task

  const receiverCol = Number(ev.target.getAttribute('col'))
  task.col = receiverCol
  tasks.value[receiverCol].push(task)
}
function onDragstart(ev: any) {
  console.log('onDragstart')
  console.log(ev)
  console.log(ev.target.id)
  console.log(ev.target.getAttribute('col'))

  ev.dataTransfer.setData('id', ev.target.id)
  ev.dataTransfer.setData('col', ev.target.getAttribute('col'))
}
function addTask(ev: any) {
  console.log('add task', newTask.value)
  tasks.value[0].push({
    title: newTask.value,
    description: 'desc',
    col: 0,
    id: tasks.value.flat().length + 1,
    edit: false,
  })

  newTask.value = ''
}
function onDbclick(ev: any) {
  console.log('onDbclick')
}
</script>
<template>
  <div class="dashboard">
    <div class="new-task">
      <input v-model="newTask" type="text" />
      <button @click.prevent="addTask">Add</button>
    </div>
    <div class="table">
      <div
        class="column"
        @drop="onDrop"
        @dragexit.prevent
        @dragover.prevent
        v-for="(taskCol, index) in tasks"
        :col="index"
      >
        <div
          v-for="task in taskCol"
          draggable="true"
          @dragstart="onDragstart"
          :id="String(task.id)"
          :col="String(task.col)"
          class="cell"
        >
          <div v-if="task.edit === false">
            <h3 @dblclick="task.edit = true">{{ task.title }}</h3>
            <p>{{ task.description }}</p>
          </div>
          <div v-else>
            <input
              type="text"
              v-model="task.title"
              @keyup.enter="task.edit = false"
              @blur="task.edit = false"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.table {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.column {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 500px;
  min-height: 500px;
}

.cell {
  height: 100px;
}
input {
  margin: 18.72px 0px;
}
</style>
