<template>
  <div class="btn-group">
    <button class="btn">
      <slot name="label">
        {{ value }}
      </slot>
      <!-- <input type="radio" name="gender" value="1" />男
      <input type="radio" name="gender" value="2" />女 -->
    </button>
    <img src="../../assets/icon/vector.svg" alt="" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
defineProps({ value: { type: String, default: "" } });
</script>

<style lang="scss" scoped>
.btn-group {
  position: relative;
  .btn {
    border-radius: 15px;
    background: #28a3b3;
    border: 1px solid #ffffff;
    padding: 3px 20px 3px 10px;
    box-sizing: border-box;
    color: #ffffff;
    font-size: 14px;
    &:focus {
      outline: none;
      background-color: #ffffff;
      color: #28a3b3;
      border-radius: 10px;
    }
  }
  img {
    position: absolute;
    right: 8px;
    top: 10px;
  }
}
</style>
