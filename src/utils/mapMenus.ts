import { IBreadcrumb } from "@/base-ui/breadcrumb";
import { userMenus } from "@/store/login/type";
import { RouteRecordRaw } from "vue-router";
let initMenu: any = null;
export function MenusToRoutes(userMenus: userMenus[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = [];
  const allRoutes: RouteRecordRaw[] = [];
  const routeFiles = require.context("../router/main", true, /\.ts/);
  routeFiles.keys().forEach((key) => {
    const route = require("../router/main" + key.split(".")[1]);
    allRoutes.push(route.default);
  });
  const _recurseGetRoute = (menus: userMenus[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url);
        if (route) routes.push(route);
        if (!initMenu) initMenu = menu;
      } else {
        if (menu.children) _recurseGetRoute(menu.children);
      }
    }
  };
  _recurseGetRoute(userMenus);
  return routes;
}
export function PathToMenu(
  userMenus: userMenus[],
  currentPath: string,
  breadcrumbs?: IBreadcrumb[]
): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const defaultMenu = PathToMenu(menu.children ?? [], currentPath);
      if (defaultMenu) {
        breadcrumbs?.push({ name: menu.name });
        breadcrumbs?.push({ name: defaultMenu.name });
        return defaultMenu;
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu;
    }
  }
}
export function MapBreadCrumb(userMenus: userMenus[], currentPath: string) {
  const breadcrumbs: IBreadcrumb[] = [];
  PathToMenu(userMenus, currentPath, breadcrumbs);
  return breadcrumbs;
}
export { initMenu };
export function MenusToPermissions(userMenus: userMenus[]) {
  const permissions: string[] = [];
  const _recurseGetPermission = (menus: userMenus[]) => {
    for (const menu of menus) {
      if (menu.type == 1 || menu.type == 2) {
        _recurseGetPermission(menu.children ?? []);
      } else {
        permissions.push(menu.permission!);
      }
    }
  };
  _recurseGetPermission(userMenus);
  return permissions;
}
export function getMenuLeafKeys(menuList: userMenus[]) {
  const leafKeys: number[] = [];
  const _recurseGetleaf = (menuList: userMenus[]) => {
    for (const menu of menuList) {
      if (menu.children) {
        _recurseGetleaf(menu.children);
      } else {
        leafKeys.push(menu.id);
      }
    }
  };
  _recurseGetleaf(menuList);
  return leafKeys;
}
