// 一个声明文件来声明 Vue 的自定义类型 ComponentCustomProperties
import { ComponentCustomProperties } from "vue";
import { Store } from "vuex";

declare module "@vue/runtime-core" {
  // 声明自己的store state
  interface State {
    currentMenu: string;
    username: string;
  }
  //
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
