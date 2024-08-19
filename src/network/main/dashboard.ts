import { IDateType } from "@/store/type";
import hyrequest from "..";

enum DashboardAPI {
  amountListData = "/goods/amount/list",
  categoryGoodsCount = "/goods/category/count",
  categoryGoodsSale = "/goods/category/sale",
  categoryGoodsFavor = "/goods/category/favor",
  addressGoodsSale = "/goods/address/sale"
}
export function getAmountListData() {
  return hyrequest.get<IDateType>({
    url: DashboardAPI.amountListData
  });
}
export function getCategoryGoodsCount() {
  return hyrequest.get<IDateType>({
    url: DashboardAPI.categoryGoodsCount
  });
}
export function getCategoryGoodsSale() {
  return hyrequest.get<IDateType>({
    url: DashboardAPI.categoryGoodsSale
  });
}
export function getCategoryGoodsFavor() {
  return hyrequest.get<IDateType>({
    url: DashboardAPI.categoryGoodsFavor
  });
}
export function getAddressGoodsSale() {
  return hyrequest.get<IDateType>({
    url: DashboardAPI.addressGoodsSale
  });
}
