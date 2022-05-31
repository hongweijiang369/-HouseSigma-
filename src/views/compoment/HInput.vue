<template>
  <div class="h-input">
    <div class="input-left">
      <slot name="suffix">
        <img src="../../assets/icon/left.svg" alt="" class="img-l" />
      </slot>
      <div class="img-l-icon">
        <img src="../../assets/icon/shape.svg" alt="" @click="hadleSearch" />
      </div>
      <input
        v-model="newValue"
        type="search"
        placeholder="搜索"
        class="l-input"
        @search="doSearch"
      />
      <div class="img-r-icon">
        <slot name="prefix">
          <img
            v-show="newValue.length > 0"
            src="../../assets/icon/close.svg"
            alt=""
            @click="clearClick"
          />
        </slot>
      </div>
    </div>
    <div class="input-right">
      <slot name="icon-right">
        <img src="../../assets/icon/square.svg" alt="" class="img-r" />
        <span>Watch</span>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
const props = defineProps({ modelValue: { type: String, default: "" } });
const emits = defineEmits(["update:modelValue", "hadleSearch"]);
const newValue = ref<string>(props.modelValue);
watch(newValue, (val) => {
  emits("update:modelValue", val);
});
const doSearch = () => {
  //todo
};
//清空数据
const clearClick = () => {
  newValue.value = "";
  emits("update:modelValue", "");
};
//搜索
const hadleSearch = () => {
  emits("hadleSearch");
  //todo
};
</script>

<style lang="scss" scoped>
.first {
  height: 80px;
  background-color: #28a3b3;
}
.h-input {
  display: flex;
  align-items: center;
  padding: 5px;
  .input-left {
    position: relative;
    flex: 1;
    display: flex;
    align-items: center;
    .img-l {
      width: 12px;
      height: 21px;
      margin-left: 8px;
    }
    .l-input {
      //text-indent: 15px;
      box-sizing: border-box;
      text-align: left;
      font-size: 16px;
      display: block;
      flex: 8;
      margin: 15px auto;
      height: 40px;
      padding-left: 40px;
      // outline: none;
      border: 1px solid #20828f;
      border-radius: 10px;
      margin: 0 10px;
      color: #ffffff;
      background-color: #20828f;
      &:focus {
        outline: 1px solid #0a3ae6;
        border-radius: 10px;
      }
    }
    .img-l-icon {
      position: absolute;
      left: 40px;
      top: 10px;
      color: #ffffff;
      cursor: pointer;
      z-index: 10;
    }
    .img-r-icon {
      position: absolute;
      right: 20px;
      top: 10px;
      cursor: pointer;
    }
  }
  .input-right {
    width: 80px;
    font-size: 14px;
    display: flex;
    align-items: center;
    span {
      margin: 0 8px;
      color: #ffffff;
    }
    .img-r {
      width: 21px;
      height: 21px;
      display: inline;
      // margin-right: 10px;
    }
  }
}
</style>
