<template>
  <div class="user">
    <page-search
      :search-config="formConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    ></page-search>
    <pageContent
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="users"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    >
      <template #status="scope">
        <el-button :type="scope.row.enable ? 'success' : 'danger'" plain>
          {{ scope.row.enable ? "启用" : "禁用" }}
        </el-button>
      </template>
    </pageContent>
    <pageModel
      pageName="users"
      ref="pageModelRef"
      :defaultInfo="defaultInfo"
      :modelConfig="modelConfigRef"
    ></pageModel>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import pageSearch from "@/components/page-search";
import pageContent from "@/components/page-content";
import pageModel from "@/components/page-model";
import { formConfig } from "./config/search-config";
import { contentTableConfig } from "./config/content-config";
import { modelConfig } from "./config/model-config";
import { usePageSearch } from "@/hooks/usePageSearch";
import { usePageModel } from "@/hooks/usePageModel";
import { useStore } from "@/store";
export default defineComponent({
  name: "user",
  components: {
    pageSearch,
    pageContent,
    pageModel
  },
  setup() {
    const store = useStore();
    const modelConfigRef = computed(() => {
      const departmentItem = modelConfig.formItems.find(
        (item) => item.field == "departmentId"
      );
      departmentItem!.options = store.state.entireDepartment.map((item) => {
        return { title: item.name, value: item.id };
      });
      const roleItem = modelConfig.formItems.find(
        (item) => item.field == "roleId"
      );
      roleItem!.options = store.state.entireRole.map((item) => {
        return { title: item.name, value: item.id };
      });
      return modelConfig;
    });
    const newcb = () => {
      const pwItem = modelConfig.formItems.find(
        (item) => item.field === "password"
      );
      pwItem!.isHidden = false;
    };
    const editcb = () => {
      const pwItem = modelConfig.formItems.find(
        (item) => item.field === "password"
      );
      pwItem!.isHidden = true;
    };
    const [pageContentRef, handleResetClick, handleQueryClick] =
      usePageSearch();
    const [defaultInfo, pageModelRef, handleNewData, handleEditData] =
      usePageModel(newcb, editcb);
    return {
      pageContentRef,
      formConfig,
      modelConfigRef,
      contentTableConfig,
      handleResetClick,
      handleQueryClick,
      defaultInfo,
      pageModelRef,
      handleNewData,
      handleEditData
    };
  }
});
</script>
