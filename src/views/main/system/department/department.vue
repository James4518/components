<template>
  <div class="department">
    <page-search
      :search-config="formConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    />
    <pageContent
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="department"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    >
      <template #leader="scope">
        <span>{{ scope.row[scope.prop] }}</span>
      </template>
      <template #parent="scope">
        <span>{{ getNameById(scope.row.parentId) }}</span>
      </template>
    </pageContent>
    <pageModel
      ref="pageModelRef"
      :defaultInfo="defaultInfo"
      :modelConfig="modelConfigRef"
      pageName="department"
    >
    </pageModel>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted, computed } from "vue";
import pageSearch from "@/components/page-search";
import pageContent from "@/components/page-content";
import pageModel from "@/components/page-model";
import { usePageSearch } from "@/hooks/usePageSearch";
import { usePageModel } from "@/hooks/usePageModel";
import formConfig from "./config/search-config";
import { contentTableConfig } from "./config/content-config";
import { modelConfig } from "./config/model-config";
import { useStore } from "@/store";
export default defineComponent({
  name: "user",
  components: {
    pageSearch,
    pageContent,
    pageModel
  },
  setup() {
    const [pageContentRef, handleResetClick, handleQueryClick] =
      usePageSearch();
    const [defaultInfo, pageModelRef, handleNewData, handleEditData] =
      usePageModel();
    const store = useStore();
    const departmentList = store.state.system.departmentList;
    const getNameById = ref((id: number) => {
      const department = departmentList.find((item) => item.id === id);
      return department ? department.name : undefined;
    });
    const modelConfigRef = computed(() => {
      const parentIdItem = modelConfig.formItems.find(
        (item) => item.field == "parentId"
      );
      parentIdItem!.options = store.state.entireDepartment.map((item) => {
        return { title: item.name, value: item.id };
      });
      return modelConfig;
    });
    // onMounted(() => {
    //   getNameById.value(1);
    // });
    return {
      pageContentRef,
      formConfig,
      contentTableConfig,
      modelConfigRef,
      handleResetClick,
      handleQueryClick,
      defaultInfo,
      pageModelRef,
      handleNewData,
      handleEditData,
      getNameById
    };
  }
});
</script>

<style scoped></style>
