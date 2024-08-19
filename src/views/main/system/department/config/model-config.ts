import { Iform } from "@/base-ui/form/src/type";
export const modelConfig: Iform = {
  formItems: [
    {
      field: "name",
      type: "input",
      label: "部门名称",
      tip: "请输入部门名称"
    },
    {
      field: "leader",
      type: "input",
      label: "部门领导",
      tip: "请输入部门领导"
    },
    {
      field: "parentId",
      type: "select",
      label: "上级部门",
      tip: "请选择上级部门",
      options: []
    }
  ]
};
