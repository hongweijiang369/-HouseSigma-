<template>
  <div :class="[modelValue ? 'drawer' : '']" @click.self="close">
    <div :class="['drawer-body', modelValue ? 'open' : 'close']">
      <section>
        <h3 style="text-align: center; font-size: 18px">filter</h3>
        <form action="form_action.asp" method="get">
          <div class="form-item">
            <p class="form-title">Price range</p>
            <p class="form-title-desc">$700,000 - $4,000,000</p>
            <Slider
              :min="25"
              :max="100"
              :initial-min="formData.priceRange[0]"
              :initial-max="formData.priceRange[1]"
              @low-change="lowChange"
              @high-change="highChange"
            />
          </div>
          <div class="form-item">
            <p class="form-title">Description Contains Keywords</p>
            <input
              v-model="formData.des"
              type="text"
              name=""
              class="form-input"
              placeholder="Waterfront, Pool, Fireplace..."
            />
          </div>
          <div class="form-item">
            <p class="form-title">Bedrooms</p>
            <div class="btn-list">
              <div
                class="btn-any"
                :style="{
                  background: formData.BedroomList.length > 0 ? '' : '#28a3b3',
                  color: formData.BedroomList.length > 0 ? '' : '#ffffff'
                }"
                @click="formData.BedroomList = []"
              >
                any
              </div>
              <div
                v-for="n in 6"
                :key="n"
                class="btn-num"
                :style="{
                  background: formData.BedroomList.includes(n) ? '#28a3b3' : '',
                  color: formData.BedroomList.includes(n) ? '#ffffff' : ''
                }"
                @click="BedroomClick(n)"
              >
                {{ n < 6 ? n - 1 : n - 1 + "+" }}
              </div>
            </div>
          </div>
          <div class="form-item">
            <p class="form-title">Bathroom</p>
            <div class="btn-list">
              <div
                class="btn-any"
                :style="{
                  background: formData.Bathroom !== null ? '' : '#28a3b3',
                  color: formData.Bathroom !== null ? '' : '#ffffff'
                }"
                @click="formData.Bathroom = null"
              >
                any
              </div>
              <div
                v-for="n in 5"
                :key="n"
                :style="{
                  background: formData.Bathroom == n ? '#28a3b3' : '',
                  color: formData.Bathroom == n ? '#ffffff' : ''
                }"
                class="btn-num"
                @click="BathroomClick(n)"
              >
                {{ n + "+" }}
              </div>
            </div>
          </div>
          <div class="form-item">
            <p class="form-title">Garage/Parking</p>
            <div class="btn-list">
              <div
                class="btn-any"
                :style="{
                  background: formData.garage !== null ? '' : '#28a3b3',
                  color: formData.garage !== null ? '' : '#ffffff'
                }"
                @click="formData.garage = null"
              >
                any
              </div>
              <div
                v-for="n in 5"
                :key="n"
                :style="{
                  background: formData.garage == n ? '#28a3b3' : '',
                  color: formData.garage == n ? '#ffffff' : ''
                }"
                class="btn-num"
                @click="garageClick(n)"
              >
                {{ n + "+" }}
              </div>
            </div>
          </div>
        </form>
        <div style="float: right">
          <span class="form-btn" @click="clearClick">Clear</span>
          <span class="form-btn" @click="applyClick">Apply</span>
        </div>
      </section>
    </div>
    <alert v-model="visible" />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import Slider from "./Slider.vue";
import alert from "./alert.vue";
import { mainStore } from "../../store/index";

export interface IObject {
  priceRange: number[];
  BedroomList: number[];
  des: string;
  Bathroom: number | null;
  garage: number | null;
}

const props = defineProps({ modelValue: { type: Boolean, default: false } });
const emits = defineEmits(["update:modelValue", "hadleSearch"]);

const store = mainStore();
const visible = ref<boolean>(false);

const formData: IObject = reactive({
  priceRange: [],
  Bathroom: null,
  garage: null,
  des: "",
  BedroomList: []
});

watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      Object.assign(formData, store.mapData);
    }
  }
);
const close = () => {
  emits("update:modelValue", false);
  //todo
};

const lowChange = (val: number) => {
  formData.priceRange[0] = val;
};
const highChange = (val: number) => {
  formData.priceRange[1] = val;
};

const BathroomClick = (n: number) => {
  formData.Bathroom = n;
};
const garageClick = (n: number) => {
  formData.garage = n;
};
const BedroomClick = (n: number) => {
  if (formData.BedroomList.includes(n)) {
    formData.BedroomList = formData.BedroomList.filter((item) => item !== n);
  } else {
    formData.BedroomList.push(n);
  }
  formData.BedroomList = [...new Set(formData.BedroomList)];
};

const clearClick = () => {
  formData.Bathroom = null;
  formData.garage = null;
  formData.BedroomList = [];
  formData.des = "";
  formData.priceRange = [];
};

const applyClick = () => {
  store.setFormData(formData);
  localStorage.setItem("formData", JSON.stringify(formData));
  visible.value = true;
  emits("update:modelValue", false);
  setTimeout(() => {
    visible.value = false;
  }, 3000);
};
</script>

<style lang="scss" scoped>
.drawer {
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  height: 100vh;
  overflow: hidden;
  //background-color: aqua;
  background: rgba(67.84, 67.84, 67.84, 0.7);
}
.drawer-body {
  width: 100%;
  height: 550px;
  padding: 0 15px;
  background-color: #ffffff;
  position: absolute;
  overflow: hidden;
  will-change: transform;
  transition: margin 300ms;
  left: 0;
  bottom: 0;
  margin-bottom: -550px;
  border-radius: 18px 18px 0px 0px;
  box-sizing: border-box;
}
.open {
  margin-bottom: -1px;
}
.close {
  transform: translateY(0px);
}

.form-item {
  border-bottom: 1px solid #e9e9e9;
  padding-bottom: 12px;
  .form-title {
    font-weight: 600;
    font-size: 16px;
    line-height: 16px;
  }
  .form-title-desc {
    font-weight: 500;
    font-size: 14px;
    // line-height: 20px;
  }
  .form-input {
    width: 100%;
    height: 30px;
    opacity: 0.1;
    border: 1px solid #000000;
    border-radius: 5px;
  }
  .btn-list {
    text-align: left;
    display: flex;

    align-items: center;
  }
  .btn-any {
    // color: #ffffff;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 7px 10px;
    gap: 10px;
    width: 51px;
    height: 30px;
    left: 16px;
    top: 559px;
    border: 1px solid #e9e9e9;
    // background: #28a3b3;
    border-radius: 4px;
  }
  .btn-num {
    display: flex;
    margin-left: 20px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 7px 10px;
    gap: 10px;
    border-radius: 4px;
    border: 1px solid #e9e9e9;
  }
}
.form-btn {
  display: inline-block;
  margin-left: 10px;
  color: #28a3b3;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
}
</style>
