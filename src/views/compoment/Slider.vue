<template>
  <div ref="slider" class="m-slider">
    <div class="u-slider-rail" :style="{ width: width + 'px' }" @click="onClickPoint"></div>
    <div
      class="u-slider-track"
      :style="`left: ${left}px; right: auto; width: ${right - left}px;`"
      @click="onClickPoint"
    ></div>
    <div
      ref="left"
      class="u-slider-handle"
      :style="`left: ${left}px; right: auto; transform: translateX(-50%);`"
      @mousedown="onLeftMouseDown"
    ></div>
    <div
      ref="right"
      class="u-slider-handle"
      :style="`left: ${right}px; right: auto; transform: translateX(-50%);`"
      @mousedown="onRightMouseDown"
    ></div>
  </div>
</template>
<script>
export default {
  name: "SLider",
  props: {
    min: {
      // 滑动输入条最小值
      type: Number,
      default: 0
    },
    max: {
      // 滑动输入条最大值
      type: Number,
      default: 100
    },
    initialMin: {
      // 滑动输入条初始最小值，默认在最左侧
      type: Number,
      default: 0
    },
    initialMax: {
      // 滑动输入条初始最大值，默认在最右侧
      type: Number,
      default: 100
    }
  },
  data() {
    return {
      left: "", // 左滑块距离滑动条左端的距离
      right: "", // 右滑动距离滑动条左端的距离
      width: "" // 滑动输入条在页面中的宽度
    };
  },
  computed: {
    low() {
      return Math.round((this.left / this.width) * this.max);
    },
    high() {
      return Math.round((this.right / this.width) * this.max);
    }
  },
  watch: {
    low(to) {
      this.$emit("lowChange", to); // 左滑块对应数字回调
    },
    high(to) {
      this.$emit("highChange", to); // 右滑块对应数字回调
    },
    initialMin() {
      this.width = this.$refs.slider.clientWidth - 10;
      this.left = (this.initialMin * this.width) / this.max;
      this.right = (this.initialMax * this.width) / this.max;
    }
  },
  mounted() {
    this.width = this.$refs.slider.clientWidth - 10;
    this.left = (this.initialMin * this.width) / this.max;
    this.right = (this.initialMax * this.width) / this.max;
  },
  methods: {
    onClickPoint(e) {
      // 点击滑动条，移动滑块
      var offsetLeft = this.$refs.slider.offsetLeft; // 滑动条左端距离屏幕左侧的距离
      var moveX = e.clientX - offsetLeft;
      if (moveX <= this.left) {
        this.left = moveX;
      } else if (this.moveX >= this.right) {
        this.right = this.moveX;
      } else {
        if (moveX - this.left < this.right - moveX) {
          this.left = moveX;
        } else {
          this.right = moveX;
        }
      }
    },
    onLeftMouseDown(e) {
      // 在滚动条上拖动左滑块
      // 滑块水平方向上距离屏幕左端的距离,减去滑块距离滑动条最左端的距离:e.clientX - this.$refs.left.offsetLeft
      var offsetLeft = this.$refs.slider.offsetLeft; // 滑动条左端距离屏幕左侧的距离
      document.onmousemove = (e) => {
        var moveX = e.clientX - offsetLeft;
        if (moveX < 0) {
          this.left = 0;
        } else if (moveX >= this.right) {
          this.left = this.right;
        } else {
          this.left = moveX;
        }
      };
      document.onmouseup = (e) => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    },
    onRightMouseDown(e) {
      // 在滚动条上拖动右滑块
      /// 滑块水平方向上距离屏幕左端的距离,减去滑块距离滑动条最左端的距离:e.clientX - this.$refs.left.offsetLeft
      var offsetLeft = this.$refs.slider.offsetLeft; // 滑动条左端距离屏幕左侧的距离
      console.log("offsetLeft:", offsetLeft);
      document.onmousemove = (e) => {
        var moveX = e.clientX - offsetLeft;
        if (moveX > this.width) {
          this.right = this.width;
        } else if (moveX <= this.left) {
          this.right = this.left;
        } else {
          this.right = moveX;
        }
      };
      document.onmouseup = (e) => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    }
  }
};
</script>
<style lang="scss" scoped>
.m-slider {
  height: 2px;
  position: relative;
  cursor: pointer;
  touch-action: none;
  &:hover {
    .u-slider-rail {
      // 灰色未选择滑动条背景色
      background: #e3e3e3;
    }
    .u-slider-track {
      // 蓝色已选择滑动条背景色
      background: #28a3b3;
    }
  }
  .u-slider-rail {
    // 灰色未选择滑动条背景色
    position: absolute;
    z-index: 99;
    height: 2px;
    // width: 100%;
    background: #f5f5f5;
    border-radius: 2px;
    transition: background 0.3s;
  }
  .u-slider-track {
    // 蓝色已选择滑动条背景色
    background: #28a3b3;
    border-radius: 4px;
    position: absolute;
    z-index: 99;
    height: 2px;
    cursor: pointer;
    transition: background 0.3s;
  }
  .u-slider-handle {
    // 滑块
    position: absolute;
    z-index: 999;
    width: 10px;
    height: 10px;
    margin-top: -7px;
    box-shadow: 0;
    background: #fff;
    border: 2px solid #91d5ff;
    border-radius: 50%;
    cursor: pointer;
    transition: border-color 0.3s, box-shadow 0.6s,
      transform 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28);
    &:hover {
      border-color: #1890ff;
    }
  }
}
</style>
