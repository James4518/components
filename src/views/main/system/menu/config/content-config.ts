export const contentTableConfig = {
  title: "菜单列表",
  propsList: [
    { prop: "name", label: "菜单名", minWidth: "100" },
    { prop: "type", label: "类型", minWidth: "60" },
    { prop: "url", label: "Url", minWidth: "100" },
    { prop: "icon", label: "icon", minWidth: "100" }
  ],
  childrenProps: {
    rowKey: "id",
    treeProp: {
      children: "children"
    }
  },
  showIndexColumn: false,
  showChooseColumn: false,
  showFooter: false
};
