import { defineStore } from "pinia";
import { IObject } from "../views/compoment/Drawer";
// 1.定义容器
// 参数1： 容器的ID，必须唯一，将来pinia会把所有容器挂载到根容器
// 参数2： 选项对象
export const mainStore = defineStore("main", {
  state: () => {
    return {
      mapData: JSON.parse(String(localStorage.getItem("formData"))) || null
    };
  },
  /**
   * 类似于组件的computed，用来封装计算属性，有缓存的功能
   */
  getters: {},
  /**
   * 类似于组件的methods，封装业务逻辑（同步，异步都可以），修改state
   */
  actions: {
    setFormData(form: IObject) {
      this.mapData = form;
    }
  }
});
