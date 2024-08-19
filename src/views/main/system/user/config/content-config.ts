import { IcontentConfig } from "@/components/page-content/src/type";

export const contentTableConfig: IcontentConfig = {
  title: "用户列表",
  btnTitle: "新建用户",
  propsList: [
    { prop: "id", label: "编号", minWidth: "80", slotName: "id" },
    { prop: "name", label: "用户名", minWidth: "100", slotName: "name" },
    { prop: "status", label: "状态", minWidth: "100", slotName: "status" },
    {
      prop: "cellphone",
      label: "电话号码",
      minWidth: "110",
      slotName: "cellphone"
    },
    {
      prop: "createAt",
      label: "创建时间",
      minWidth: "130",
      slotName: "createAt"
    },
    { prop: "handle", label: "操作", minWidth: "120px", slotName: "handle" }
  ],
  showIndexColumn: true,
  showChooseColumn: true
};
