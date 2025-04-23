<template>
  <div class="demo-container">
    <Button
      :primary="true"
      label="Primary Button"
      @click="handleClick"
    />
    <Button
      :primary="false"
      label="Secondary Button"
      @click="handleClick"
    />
  </div>
</template>

<script setup lang="ts">
import Button from '../stories/Button.vue';

const handleClick = () => {
  console.log('Button clicked!');
};
</script>

<style scoped>
.demo-container {
  padding: 20px;
  display: flex;
  gap: 10px;
}
</style>
