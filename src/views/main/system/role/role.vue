<template>
  <div class="role">
    <page-search
      :search-config="formConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    ></page-search>
    <pageContent
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="role"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    ></pageContent>
    <pageModel
      ref="pageModelRef"
      :defaultInfo="defaultInfo"
      :modelConfig="modelConfig"
      :otherInfo="otherInfo"
      pageName="role"
    >
      <el-tree
        ref="elTreeRef"
        :data="menus"
        show-checkbox
        node-key="id"
        :props="{ children: 'children', label: 'name' }"
        @check="handleCheckChange"
      >
      </el-tree>
    </pageModel>
  </div>
</template>

<script lang="ts">
import { ElTree } from "element-plus";
import { computed, defineComponent, ref, nextTick } from "vue";
import pageSearch from "@/components/page-search";
import pageContent from "@/components/page-content";
import pageModel from "@/components/page-model";
import { formConfig } from "./config/search-config";
import { contentTableConfig } from "./config/content-config";
import { modelConfig } from "./config/model-config";
import { usePageSearch } from "@/hooks/usePageSearch";
import { usePageModel } from "@/hooks/usePageModel";
import { getMenuLeafKeys } from "@/utils/mapMenus";
import { useStore } from "@/store";
import { IRole } from "@/store/main/system/type";
import { userMenus } from "@/store/login/type";

export default defineComponent({
  name: "role",
  components: {
    pageSearch,
    pageContent,
    pageModel
  },
  setup() {
    const elTreeRef = ref<InstanceType<typeof ElTree>>();
    const editcb = (item: IRole) => {
      const leafKeys = getMenuLeafKeys(item.menuList);
      nextTick(() => {
        elTreeRef.value?.setCheckedKeys(leafKeys, false);
      });
    };
    const [pageContentRef, handleResetClick, handleQueryClick] =
      usePageSearch();
    const [defaultInfo, pageModelRef, handleNewData, handleEditData] =
      usePageModel(undefined, editcb);
    const store = useStore();
    const menus = computed(() => store.state.entireMenu);
    const otherInfo = ref({});
    const handleCheckChange = (data1: userMenus, data2: any) => {
      const checkedKeys = data2.checkedKeys;
      const halfCheckedKeys = data2.halfCheckedKeys;
      const menuList = [...checkedKeys, ...halfCheckedKeys];
      otherInfo.value = { menuList };
    };
    return {
      pageContentRef,
      elTreeRef,
      formConfig,
      modelConfig,
      contentTableConfig,
      handleResetClick,
      handleQueryClick,
      defaultInfo,
      pageModelRef,
      handleNewData,
      handleEditData,
      menus,
      otherInfo,
      handleCheckChange
    };
  }
});
</script>

<style lang="less">
.el-tree {
  margin-left: 30px;
}
</style>
