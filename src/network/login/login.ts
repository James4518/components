import { IAccount } from "@/views/login/cpns/type";
import { IloginRes, User } from "@/store/login/type";
import hyrequest from "@/network";
import { IDateType } from "@/store/type";

enum LoginApi {
  accountLogin = "/login",
  LoginUserInfo = "/users/",
  UserMenus = "/role/"
}
export function accountLoginRequest(account: IAccount) {
  return hyrequest.post<IDateType<IloginRes>>({
    url: LoginApi.accountLogin,
    data: account
  });
}
export function RequestUserInfoById(id: number) {
  return hyrequest.get<IDateType<User>>({
    url: LoginApi.LoginUserInfo + id
  });
}
export function requestUserMenusByRoleId(id: number) {
  return hyrequest.get<IDateType>({
    url: LoginApi.UserMenus + id + "/menu"
  });
}
