<template>
  <div class="page-search">
    <hy-form v-bind="searchConfig" v-model="formData">
      <template #header>
        <h2>高级检索</h2>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button icon="RefreshRight" @click="handleResetClick"
            >reset</el-button
          >
          <el-button icon="Search" @click="handleQueryClick">search</el-button>
        </div>
      </template>
    </hy-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import hyForm from "@/base-ui/form";

export default defineComponent({
  name: "user",
  components: {
    hyForm
  },
  props: {
    searchConfig: {
      type: Object,
      required: true
    }
  },
  emits: ["resetBtnClick", "queryBtnClick"],
  setup(props, { emit }) {
    const formItems = props.searchConfig?.formItems ?? [];
    const formOriginData: any = {};
    for (const item of formItems) {
      formOriginData[item.field] = "";
    }
    const formData = ref(formOriginData);
    const handleResetClick = () => {
      for (const key in formOriginData) {
        formData.value[`${key}`] = formOriginData[key];
      }
      emit("resetBtnClick");
    };
    const handleQueryClick = () => {
      emit("queryBtnClick", formData.value);
    };
    return {
      formData,
      handleResetClick,
      handleQueryClick
    };
  }
});
</script>

<style>
.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
