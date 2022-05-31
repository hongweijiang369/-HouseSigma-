<template>
  <div>
    <div class="alert" :style="{ display: modelValue ? 'block' : 'none' }">
      <div class="alert-title">已完成过滤</div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({ modelValue: { type: Boolean, default: false } });
</script>

<style lang="scss" scoped>
.alert {
  background: #28a3b3;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.alert-title {
  height: 50px;
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #b7eb8f;
  background-color: #f6ffed;
}
</style>
