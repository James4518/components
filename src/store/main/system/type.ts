import { User, userMenus } from "@/store/login/type";
import { IDateType } from "@/store/type";

export interface IsystemState {
  usersList: IDateType<User>[];
  usersCount: number;
  departmentList: Ilist[];
  departmentCount: number;
  roleList: IDateType<Ilist>[];
  roleCount: number;
  goodsList: Igoods[];
  goodsCount: number;
  menuList: IDateType<userMenus>[];
  menuCount: number;
}
export interface IPageList {
  pageName: string;
  queryInfo: {
    offset: number;
    size: number;
  };
}
export interface IPageListRes {
  list: User[];
  totalCount: number;
}
export interface Ilist {
  id: number;
  name: string;
  parentId: number;
  parentName: string;
  leader: string;
  createAt: string;
  updateAt: string;
}
export interface IRole {
  id: number;
  name: string;
  intro: string;
  menuList: userMenus[];
  createAt: string;
  updateAt: string;
}
export interface Igoods {
  id: number;
  name: string;
  desc: string;
  status: number;
  imgUrl: string;
  oldPrice: string;
  newPrice: string;
  address: string;
  categoryId: number;
  favorCount: number;
  inventoryCount: number;
  saleCount: number;
  createAt: string;
  updateAt: string;
}
