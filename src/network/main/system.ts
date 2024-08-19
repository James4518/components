import { IDateType } from "@/store/type";
import hyrequest from "..";
export function getPageList(url: string, queryInfo: any) {
  return hyrequest.post<IDateType>({
    url: url,
    data: queryInfo
  });
}
export function deletePageData(url: string) {
  return hyrequest.delete<IDateType>({
    url: url
  });
}
export function createPageData(url: string, newData: any) {
  return hyrequest.post<IDateType>({
    url: url,
    data: newData
  });
}
export function editPageData(url: string, editData: any) {
  return hyrequest.patch<IDateType>({
    url: url,
    data: editData
  });
}
