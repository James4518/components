export const contentTableConfig = {
  title: "商品列表",
  btnTitile: "新建商品",
  propsList: [
    { prop: "name", label: "商品名", minWidth: "100", slotName: "name" },
    { prop: "oldPrice", label: "原价", minWidth: "80", slotName: "oldPrice" },
    { prop: "newPrice", label: "现价", minWidth: "80", slotName: "newPrice" },
    { prop: "imgUrl", label: "图片", minWidth: "100", slotName: "imgUrl" },
    {
      prop: "saleCount",
      label: "库存",
      minWidth: "80",
      slotName: "saleCount"
    },
    {
      prop: "createAt",
      label: "创建时间",
      minWidth: "200",
      slotName: "createAt"
    },
    { label: "操作", minWidth: "120px", slotName: "handle" }
  ],
  showIndexColumn: true,
  showChooseColumn: true,
  showFooter: false
};
