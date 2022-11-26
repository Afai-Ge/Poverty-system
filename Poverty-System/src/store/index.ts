import { InjectionKey } from "vue";
// import { useStore as baseUseStore,createStore, Store } from "vuex";
import { createStore, Store, useStore as baseUseStore } from "vuex";

// 为 store state 声明类型
export interface State {
  username: string;
  currentMenu: string;
}

// 定义 injection key
export const key: InjectionKey<Store<State>> = Symbol();

// 导出store模块
export const store = createStore<State>({
  state: {
    username: "测试store",
    currentMenu: sessionStorage.getItem("currentMenu") || "1",
  },
  getters: {
    getName: (state: State) => {
      return state.username;
    },
    getCurrentMenu: (state: State) => {
      return state.currentMenu;
    },
  },
  mutations: {
    //   重置名称
    SET_NAME(state: State, params: string) {
      state.username = params;
    },
    SET_CURRENT_MENU(state: State, currentMenu: string) {
      sessionStorage.setItem("currentMenu", currentMenu);
      state.currentMenu = currentMenu;
    },
  },
  actions: {},
});

// 定义自己的 `useStore` 组合式函数
export function useStore() {
  return baseUseStore(key);
}
