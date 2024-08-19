<template>
  <div class="page-model">
    <el-dialog v-model="dialogVisible" width="30%" center destroy-on-close>
      <template #header>
        {{ isEdit ? "编辑" : "新建" }}
      </template>
      <hyForm v-bind="modelConfig" v-model="formData"></hyForm>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="handleConfirmClick">
            Confirm
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import hyForm from "@/base-ui/form";
import store from "@/store";
export default defineComponent({
  components: {
    hyForm
  },
  props: {
    pageName: {
      type: String,
      required: true
    },
    modelConfig: {
      type: Object,
      required: true
    },
    defaultInfo: {
      type: Object,
      default: () => ({})
    },
    otherInfo: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const dialogVisible = ref(false);
    const isEdit = ref(false);
    const formData = ref<any>({});
    const handleConfirmClick = () => {
      dialogVisible.value = false;
      if (Object.keys(props.defaultInfo).length) {
        store.dispatch("system/editPageDataAction", {
          pageName: props.pageName,
          editData: { ...formData.value, ...props.otherInfo },
          id: props.defaultInfo.id
        });
      } else {
        store.dispatch("system/createPageDataAction", {
          pageName: props.pageName,
          newData: { ...formData.value, ...props.otherInfo }
        });
      }
    };
    watch(
      () => props.defaultInfo,
      (newVal) => {
        for (const item of props.modelConfig.formItems) {
          formData.value[`${item.field}`] = newVal[`${item.field}`];
        }
      }
    );
    return {
      isEdit,
      dialogVisible,
      formData,
      handleConfirmClick
    };
  }
});
</script>

<style lang="less">
.el-dialog {
  .el-dialog_header,
  .el-dialog_body {
    padding: 0px;
  }
  .el-dialog_header {
    font-size: 50px;
  }
}
</style>
