import { Iform, calLayoutItem } from "@/base-ui/form/src/type";

export const modelConfig: Iform = {
  formItems: [
    {
      field: "name",
      type: "input",
      label: "商品名称",
      tip: "请输入商品名称"
    },
    {
      field: "oldPrice",
      type: "input",
      label: "原价",
      tip: "请输入原价"
    },
    {
      field: "newPrice",
      type: "input",
      label: "现价",
      tip: "请输入现价"
    },
    {
      field: "saleCount",
      type: "input",
      label: "库存",
      tip: "请输入库存"
    },
    {
      field: "imgUrl",
      type: "input",
      label: "图片",
      tip: "请输入图片地址"
    }
  ],
  calLayout: { span: calLayoutItem.sm },
  itemLayout: {}
};
