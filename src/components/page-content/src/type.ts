import { IpropsList } from "@/base-ui/table/src/type";

export interface IcontentConfig {
  title?: string;
  btnTitle?: string;
  propsList: IpropsList[];
  showIndexColumn: boolean;
  showChooseColumn: boolean;
}
