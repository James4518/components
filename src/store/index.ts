import { Store, createStore, useStore as useVuexStore } from "vuex";
import { IRootState, IStore } from "./type";
import login from "./login/login";
import system from "./main/system/system";
import dashboard from "./main/analysis/dashboard";
import { getPageList } from "@/network/main/system";
const store = createStore<IRootState>({
  state() {
    return {
      name: "aa",
      age: 17,
      entireDepartment: [],
      entireRole: [],
      entireMenu: []
    };
  },
  mutations: {
    changeEntireDepartment(state, list) {
      state.entireDepartment = list;
    },
    changeEntirRole(state, list) {
      state.entireRole = list;
    },
    changeEntirMenu(state, list) {
      state.entireMenu = list;
    }
  },
  actions: {
    async getInitialDataAction({ commit }) {
      const departmentRes = await getPageList("/department/list", {
        offset: 0,
        size: 999
      });
      const { list: departmentList } = departmentRes.data.data;
      commit("changeEntireDepartment", departmentList);
      const roleRes = await getPageList("/department/list", {
        offset: 0,
        size: 999
      });
      const { list: roleList } = roleRes.data.data;
      commit("changeEntirRole", roleList);
      const menuRes = await getPageList("/menu/list", {});
      const { list: menuList } = menuRes.data.data;
      commit("changeEntirMenu", menuList);
    }
  },
  modules: {
    login,
    system,
    dashboard
  }
});
export default store;
export function initLocalStorge() {
  store.dispatch("login/LoadingLocalStorge");
}
export function useStore(): Store<IStore> {
  return useVuexStore();
}
