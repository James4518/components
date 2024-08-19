import { Iform, calLayoutItem } from "@/base-ui/form/src/type";
export const formConfig: Iform = {
  labelWidth: "120px",
  calLayout: {
    span: calLayoutItem.xl
  },
  formItems: [
    {
      field: "name",
      type: "input",
      label: "name",
      tip: "请输入角色名"
    },
    {
      field: "intro",
      type: "input",
      label: "intro",
      tip: "请输入权限"
    },
    {
      field: "createAt",
      type: "datepicker",
      label: "创建时间",
      tip: "请选择创建时间",
      options: {
        type: "daterange",
        startPlaceholder: "start time",
        endPlaceholder: "end time"
      }
    }
  ]
};
