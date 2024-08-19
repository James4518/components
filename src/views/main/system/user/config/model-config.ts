import { Iform, calLayoutItem } from "@/base-ui/form/src/type";

export const modelConfig: Iform = {
  formItems: [
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
      field: "password",
      type: "password",
      label: "password",
      tip: "请输入密码",
      isHidden: true
    },
    {
      field: "cellphone",
      type: "input",
      label: "cellphone",
      tip: "请输入电话号码"
    },
    {
      field: "departmentId",
      type: "select",
      label: "部门",
      tip: "请选择部门",
      options: []
    },
    {
      field: "roleId",
      type: "select",
      label: "角色",
      tip: "请选择角色",
      options: []
    }
  ],
  calLayout: { span: calLayoutItem.sm },
  itemLayout: {}
};
