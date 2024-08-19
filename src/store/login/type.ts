export interface ILoginState {
  token: string;
  userInfo: userInfo;
  userMenus: userMenus[];
  permissions: string[];
}
export interface IloginRes {
  id: number;
  name: string;
  token: string;
}
export interface userInfo {
  code: number;
  data: User;
}
export interface User {
  id: number;
  name: string;
  realname: string;
  cellphone: number;
  enable: number;
  createAt: string;
  updateAt: string;
  role: Role;
  department: Department;
}
export interface Role {
  id: number;
  name: string;
  intro: string;
  createAt: string;
  updateAt: string;
}
export interface Department {
  id: number;
  name: string;
  parentId: number;
  createAt: string;
  updateAt: string;
  leader: string;
}
export interface userMenus {
  id: number;
  url: string;
  name: string;
  sort: number;
  type: number;
  icon: string;
  children?: userMenus[];
  parentId?: number;
  permission?: string;
}
