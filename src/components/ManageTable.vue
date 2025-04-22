<script setup lang="ts">
import { ref } from 'vue'
const tasks = ref([
  [
    { title: 'task1', description: 'desc', col: 0, id: 1 },
    { title: 'task2', description: 'desc', col: 0, id: 2 },
  ],
  [
    { title: 'task3', description: 'desc', col: 1, id: 3 },
    { title: 'task4', description: 'desc', col: 1, id: 4 },
  ],
  [
    { title: 'task5', description: 'desc', col: 2, id: 5 },
    { title: 'task6', description: 'desc', col: 2, id: 6 },
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
</script>
<template>
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
        <h3>{{ task.title }}</h3>
        <p>{{ task.description }}</p>
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
</style>
