import { Module } from "vuex";
import { IDateType, IRootState } from "../type";
import {
  RequestUserInfoById,
  accountLoginRequest,
  requestUserMenusByRoleId
} from "@/network/login/login";
import { IAccount } from "@/views/login/cpns/type";
import cache from "@/utils/cache";
import router from "@/router";
import { MenusToPermissions, MenusToRoutes } from "@/utils/mapMenus";
import { ILoginState, userInfo, userMenus } from "./type";

const loginMoudle: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: "",
      userInfo: {
        code: 0,
        data: {
          id: 0,
          name: "",
          realname: "",
          cellphone: 0,
          enable: 0,
          createAt: "",
          updateAt: "",
          role: { id: 0, name: "", intro: "", createAt: "", updateAt: "" },
          department: {
            id: 0,
            name: "",
            parentId: 0,
            createAt: "",
            updateAt: "",
            leader: ""
          }
        }
      },
      userMenus: [],
      permissions: []
    };
  },
  mutations: {
    changeToken(state, token: string) {
      state.token = token;
    },
    changeUserInfo(state, userInfo: userInfo) {
      state.userInfo = userInfo;
    },
    changeUserMenus(state, userMenus: userMenus[]) {
      state.userMenus = userMenus;
      const routes = MenusToRoutes(userMenus);
      routes.forEach((route) => {
        router.addRoute("main", route);
      });
      const permissions = MenusToPermissions(userMenus);
      state.permissions = permissions;
    }
  },
  actions: {
    async accountLoginAction({ commit, dispatch }, payload: IAccount) {
      //实现登录逻辑
      const LoginResult = await accountLoginRequest(payload);
      const { id, token } = LoginResult.data.data;
      commit("changeToken", token);
      cache.setCache("token", token);
      dispatch("getInitialDataAction", null, { root: true });
      //请求用户信息
      const userInfoRes = await RequestUserInfoById(id);
      const userInfo = userInfoRes.data;
      commit("changeUserInfo", userInfo);
      cache.setCache("userInfo", userInfo);
      //请求用户菜单
      const userMenusRes: IDateType<userMenus> = await requestUserMenusByRoleId(
        userInfo.data.role.id
      );
      const userMenu = userMenusRes.data.data;
      commit("changeUserMenus", userMenu);
      cache.setCache("UserMenus", userMenu);
      //页面跳转
      router.push("/main");
    },
    LoadingLocalStorge({ commit, dispatch }) {
      const token = cache.getCache("token");
      if (token) {
        commit("changeToken", token);
        dispatch("getInitialDataAction", null, { root: true });
      }
      const userInfo = cache.getCache("userInfo");
      if (userInfo) commit("changeUserInfo", userInfo);
      const userMenu = cache.getCache("UserMenus");
      if (userMenu) commit("changeUserMenus", userMenu);
    }
  }
};
export default loginMoudle;
