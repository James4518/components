const formConfig = {
  pageName: "department",
  formItems: [
    {
      field: "name",
      type: "input",
      label: "name",
      tip: "请输入部门名称"
    },
    {
      field: "leader",
      type: "input",
      label: "leader",
      tip: "请输入部门领导"
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

export default formConfig;
