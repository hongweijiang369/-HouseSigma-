<template>
  <div class="container">
    <div class="first">
      <h-input v-model="search" />
      <div>
        <div style="display: flex; justify-content: space-around; padding: 0 15px">
          <h-button value="All Property Types" />
          <h-button>
            <template #label>
              <input type="radio" value="1" />3d
              <input type="radio" value="2" style="margin-left: 5px" />3d
            </template>
          </h-button>
          <h-button value="filters" @click="filterClick" />
        </div>
      </div>
    </div>
    <div class="map">
      <Maps />
    </div>
    <Drawer v-model="visible" />
  </div>
</template>

<script setup lang="ts">
import HInput from "./compoment/HInput.vue";
import HButton from "./compoment/HButton.vue";
import Maps from "./compoment/Maps.vue";
import Drawer from "./compoment/Drawer.vue";

import { ref } from "vue";
const search = ref<string>("ontirio,ON");
const visible = ref<boolean>(false);

const filterClick = () => {
  visible.value = true;
};
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  overflow: hidden;
}
.first {
  height: 80px;
  background-color: #28a3b3;
}
.map {
  height: calc(100vh - 80px);
}
</style>
