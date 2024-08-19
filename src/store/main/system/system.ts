import { Module } from "vuex";
import { IPageList, IPageListRes, Igoods, Ilist, IsystemState } from "./type";

import {
  createPageData,
  deletePageData,
  editPageData,
  getPageList
} from "@/network/main/system";
import { IDateType, IRootState } from "@/store/type";
import { User, userMenus } from "@/store/login/type";

const systemMoudle: Module<IsystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      departmentList: [],
      departmentCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0
    };
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`];
      };
    },
    pageListCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`];
      };
    }
  },
  mutations: {
    changeUsersList(state, usersList: IDateType<User>[]) {
      state.usersList = usersList;
    },
    changeUsersCount(state, usersCount: number) {
      state.usersCount = usersCount;
    },
    changeDepartmentList(state, departmentList: Ilist[]) {
      state.departmentList = departmentList;
    },
    changeDepartmentCount(state, departmentCount: number) {
      state.departmentCount = departmentCount;
    },
    changeRoleList(state, roleList: IDateType<Ilist>[]) {
      state.roleList = roleList;
    },
    changeRoleCount(state, roleCount: number) {
      state.roleCount = roleCount;
    },
    changeGoodsList(state, goodsList: Igoods[]) {
      state.goodsList = goodsList;
    },
    changeGoodsCount(state, goodsCount: number) {
      state.goodsCount = goodsCount;
    },
    changeMenuList(state, menuList: IDateType<userMenus>[]) {
      state.menuList = menuList;
    },
    changeMenuCount(state, menuCount: number) {
      state.menuCount = menuCount;
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: IPageList) {
      const pageName = payload.pageName;
      const pageUrl = `/${pageName}/list`;
      const pageRes: IDateType<IPageListRes> = await getPageList(
        pageUrl,
        payload.queryInfo
      );
      const { list, totalCount } = pageRes.data.data;
      const changedPageName =
        pageName.slice(0, 1).toUpperCase() + pageName.slice(1);
      commit(`change${changedPageName}List`, list);
      commit(`change${changedPageName}Count`, totalCount);
    },
    async deletePageDataAction({ dispatch }, payload) {
      const { pageName, id } = payload;
      const pageUrl = `/${pageName}/${id}`;
      await deletePageData(pageUrl);
      dispatch("getPageListAction", {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      });
    },
    async createPageDataAction({ dispatch }, payload: any) {
      const { pageName, newData } = payload;
      const pageUrl = `/${pageName}`;
      await createPageData(pageUrl, newData);
      dispatch("getPageListAction", {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      });
    },
    async editPageDataAction({ dispatch }, payload: any) {
      const { pageName, editData, id } = payload;
      const pageUrl = `/${pageName}/${id}`;
      await editPageData(pageUrl, editData);
      dispatch("getPageListAction", {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      });
    }
  }
};
export default systemMoudle;
