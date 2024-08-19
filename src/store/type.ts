import { ILoginState } from "./login/type";
import { IsystemState } from "./main/system/type";
import { IDashboardState } from "./main/analysis/type";

export interface IDateType<T = any> {
  code: number;
  data: {
    code: number;
    data: T;
  };
}
export interface IRootState {
  name: string;
  age: number;
  entireDepartment: any[];
  entireRole: any[];
  entireMenu: any[];
}
export interface IRootWithMoudle {
  login: ILoginState;
  system: IsystemState;
  dashboard: IDashboardState;
}
export type IStore = IRootState & IRootWithMoudle;
