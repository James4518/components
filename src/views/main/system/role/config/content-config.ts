import { IcontentConfig } from "@/components/page-content/src/type";

export const contentTableConfig: IcontentConfig = {
  title: "角色列表",
  propsList: [
    { prop: "id", label: "编号", minWidth: "80", slotName: "id" },
    { prop: "name", label: "角色名", minWidth: "80", slotName: "name" },
    { prop: "intro", label: "权限", minWidth: "80", slotName: "intro" },
    {
      prop: "createAt",
      label: "创建时间",
      minWidth: "120",
      slotName: "createAt"
    },
    { prop: "handle", label: "操作", minWidth: "120px", slotName: "handle" }
  ],
  showIndexColumn: true,
  showChooseColumn: true
};
