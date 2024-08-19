import { Module } from "vuex";
import { IDashboardState } from "./type";
import { IRootState } from "@/store/type";
import {
  getAddressGoodsSale,
  getAmountListData,
  getCategoryGoodsCount,
  getCategoryGoodsFavor,
  getCategoryGoodsSale
} from "@/network/main/dashboard";

const dashboardMoudle: Module<IDashboardState, IRootState> = {
  namespaced: true,
  state() {
    return {
      amountListData: [],
      categoryGoodsCount: [],
      categoryGoodsSale: [],
      categoryGoodsFavor: [],
      addressGoodsSale: []
    };
  },
  mutations: {
    changeAmountList(state, list) {
      state.amountListData = list;
    },
    changeGoodsCount(state, list) {
      state.categoryGoodsCount = list;
    },
    changeGoodsSale(state, list) {
      state.categoryGoodsSale = list;
    },
    changeGoodsFavor(state, list) {
      state.categoryGoodsFavor = list;
    },
    changeAddressGoodsSale(state, list) {
      state.addressGoodsSale = list;
    }
  },
  actions: {
    async getDashboardDataAction({ commit }) {
      const amountRes = await getAmountListData();
      commit("changeAmountList", amountRes.data.data);
      const GoodsCountRes = await getCategoryGoodsCount();
      commit("changeGoodsCount", GoodsCountRes.data.data);
      const GoodsSaleRes = await getCategoryGoodsSale();
      commit("changeGoodsSale", GoodsSaleRes.data.data);
      const GoodsFavorRes = await getCategoryGoodsFavor();
      commit("changeGoodsFavor", GoodsFavorRes.data.data);
      const AddressGoodsSaleRes = await getAddressGoodsSale();
      commit("changeAddressGoodsSale", AddressGoodsSaleRes.data.data);
    }
  }
};
export default dashboardMoudle;
