import { IcontentConfig } from "@/components/page-content/src/type";

export const contentTableConfig: IcontentConfig = {
  title: "部门列表",
  btnTitle: "新建部门",
  propsList: [
    { label: "部门名称", prop: "name", minWidth: "80px" },
    { label: "部门领导", prop: "leader", minWidth: "80px" },
    {
      label: "上级部门",
      prop: "parentId",
      minWidth: "80px",
      slotName: "parent"
    },
    {
      prop: "createAt",
      label: "创建时间",
      minWidth: "100px",
      slotName: "createAt"
    },
    { prop: "handle", label: "操作", minWidth: "120px", slotName: "handle" }
  ],
  showIndexColumn: false,
  showChooseColumn: false
};
