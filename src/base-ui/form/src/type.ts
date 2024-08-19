export type IformType = "input" | "password" | "select" | "datepicker";
export enum calLayoutItem {
  "xl" = 6, //4个
  "lg" = 8, //3个
  "md" = 12, //2个
  "sm" = 24 //1个
}
export interface IformItem {
  field: string;
  type: IformType;
  label: string;
  tip: string;
  options?: any;
  isHidden?: boolean;
}
export interface Iform {
  labelWidth?: string;
  calLayout?: { span: calLayoutItem };
  itemLayout?: any;
  formItems: IformItem[];
}
