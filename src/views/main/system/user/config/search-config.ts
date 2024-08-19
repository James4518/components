import { Iform, calLayoutItem } from "@/base-ui/form/src/type";
export const formConfig: Iform = {
  labelWidth: "120px",
  calLayout: {
    span: calLayoutItem.xl
  },
  formItems: [
    {
      field: "id",
      type: "input",
      label: "id",
      tip: "请输入id"
    },
    {
      field: "name",
      type: "input",
      label: "name",
      tip: "请输入用户名"
    },
    {
      field: "realname",
      type: "input",
      label: "realname",
      tip: "请输入真实姓名"
    },
    {
      field: "cellphone",
      type: "input",
      label: "cellphone",
      tip: "请输入电话号码"
    },
    {
      field: "enable",
      type: "select",
      label: "status",
      tip: "请选择状态",
      options: [
        { title: "启用", value: 1 },
        { title: "禁用", value: 0 }
      ]
    },
    {
      field: "createAt",
      type: "datepicker",
      label: "createAt",
      tip: "请选择创建时间",
      options: {
        type: "daterange",
        startPlaceholder: "start time",
        endPlaceholder: "end time"
      }
    }
  ]
};
