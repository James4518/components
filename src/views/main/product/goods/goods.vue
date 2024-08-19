<template>
  <pageContent
    :contentTableConfig="contentTableConfig"
    pageName="goods"
    @newBtnClick="handleNewData"
    @editBtnClick="handleEditData"
  >
    <template #imgUrl="scope">
      <el-image
        style="width: 60px; height: 60px"
        :src="scope.row.imgUrl"
        :preview-src-list="[scope.row.imgUrl]"
      ></el-image>
    </template>
    <template #oldPrice="scope">{{ "￥" + scope.row.oldPrice }}</template>
    <template #newPrice="scope">{{ "￥" + scope.row.newPrice }}</template>
  </pageContent>
  <pageModel
    ref="pageModelRef"
    :defaultInfo="defaultInfo"
    :modelConfig="modelConfig"
    pageName="goods"
  >
  </pageModel>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import pageContent from "@/components/page-content";
import pageModel from "@/components/page-model";
import { contentTableConfig } from "./config/content-config";
import { modelConfig } from "./config/model-config";
import { usePageModel } from "@/hooks/usePageModel";

export default defineComponent({
  name: "goods",
  components: {
    pageContent,
    pageModel
  },
  setup() {
    const [defaultInfo, pageModelRef, handleNewData, handleEditData] =
      usePageModel();
    return {
      contentTableConfig,
      modelConfig,
      defaultInfo,
      pageModelRef,
      handleNewData,
      handleEditData
    };
  }
});
</script>
