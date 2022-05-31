<template>
  <div id="googleMap" class="mapCont">
    <GMapMap ref="mapRef" :center="center" :zoom="14">
      <GMapMarker
        v-for="(item, index) in mapJson"
        :key="index"
        :position="item.location"
        :icon="{
          url: ''
        }"
      >
        <GMapInfoWindow :closeclick="false">
          <div>{{ item.label }}</div>
        </GMapInfoWindow>
      </GMapMarker>
    </GMapMap>
    <div class="mapCont-title">
      <span>For Sale</span>
      <span>Sold</span>
      <span>De-listed</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import mapJson from "./mapdata.json";
console.log(mapJson);
const center = reactive({ lat: 49.2079917, lng: -122.9140894 });
</script>

<style lang="scss" scoped>
::v-deep(.vue-map-container) {
  height: 100%;
}
::v-deep(.gmnoprint) {
  display: none;
}
::v-deep(.gm-ui-hover-effect) {
  display: none !important;
}
::v-deep(.gm-style-iw) {
  color: #ffffff;
  background-color: #28a3b3;
  font-size: 12px;
  font-weight: bold;
  border: 1px solid #ffffff;
  height: 30px;
  display: flex;
  align-items: center;
}
::v-deep(.gm-style-iw-d::-webkit-scrollbar-track-piece) {
  background: #28a3b3 !important;
  border: none !important;
}
::v-deep(.gm-style .gm-style-iw-d::-webkit-scrollbar-track, .gm-style
    .gm-style-iw-d::-webkit-scrollbar-track-piece) {
  background: none;
}
::v-deep(.gm-style .gm-style-iw-t::after) {
  background: #28a3b3 !important;
  // border: none !important;
  border-left: 1px solid #ffffff;
  border-bottom: 1px solid #ffffff;
}

.mapCont {
  height: 100%;
}
.mapCont-title {
  position: absolute;
  width: 210px;
  left: 50%;
  top: 90px;
  transform: translate(-50%, 0);
}
span {
  display: inline-block;
  height: 38px;
  box-sizing: border-box;
  line-height: 38px;
  padding: 0 8px;
  &:nth-child(1) {
    border-radius: 6px 0px 0px 6px;
    color: #ffffff;
    background: #28a3b3;
    mix-blend-mode: normal;
    box-shadow: 0px 5px 25px rgba(55, 58, 64, 0.144475);
  }
  &:nth-child(2) {
    color: #ffffff;
    background: #413e6d;
    mix-blend-mode: normal;
  }
  &:nth-child(3) {
    background: #ffffff;
    mix-blend-mode: normal;
    box-shadow: 0px 5px 25px 1px rgba(55, 58, 64, 0.144475);
    border-radius: 0px 6px 6px 0px;
  }
}
</style>
