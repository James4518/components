import { Iform, calLayoutItem } from "@/base-ui/form/src/type";

export const modelConfig: Iform = {
  formItems: [
    {
      field: "name",
      type: "input",
      label: "角色名",
      tip: "请输入角色名"
    },
    {
      field: "intro",
      type: "input",
      label: "角色权限",
      tip: "请输入角色权限"
    }
  ],
  calLayout: { span: calLayoutItem.sm },
  itemLayout: {}
};
