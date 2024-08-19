<template>
  <div class="content">
    <hy-table
      :listData="dataList"
      :propsList="contentTableConfig.propsList"
      :listCount="dataCount"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
    >
      <template #header-handle>
        <el-button
          type="primary"
          size="small"
          v-if="isCreate"
          @click="handleNewClick"
        >
          {{ contentTableConfig?.btnTitle ?? "新建数据" }}
        </el-button>
        <el-icon size="20px" @click="handleRefreshClick">
          <Refresh></Refresh>
        </el-icon>
      </template>
      <template #createAt="scope">
        <span>{{ filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #handle="scope">
        <div class="handle-btns">
          <el-button
            icon="Edit"
            size="small"
            text
            id="editIcon"
            v-if="isUpdate"
            @click="handleEditClick(scope.row)"
          >
            编辑
          </el-button>
          <el-button
            icon="DeleteFilled"
            size="small"
            text
            id="deleteIcon"
            v-if="isDelete"
            @click="handleDeleteClick(scope.row)"
          >
            删除
          </el-button>
        </div>
      </template>
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </hy-table>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, ref, watch } from "vue";
import { useStore } from "@/store";
import { usePermission } from "@/hooks/usePermission";
import hyTable from "@/base-ui/table";
import { IpropsList } from "@/base-ui/table/src/type";
export default defineComponent({
  components: {
    hyTable
  },
  props: {
    contentTableConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  emits: ["newBtnClick", "editBtnClick"],
  setup(props, { emit }) {
    const store = useStore();
    const isCreate = usePermission(props.pageName, "create");
    const isUpdate = usePermission(props.pageName, "update");
    const isDelete = usePermission(props.pageName, "delete");
    const isQuery = usePermission(props.pageName, "query");
    const pageInfo = ref({ currentPage: 0, pageSize: 10 });
    watch(pageInfo, () => getPageData());
    const getPageData = (query: any = {}) => {
      if (!isQuery) return;
      store.dispatch("system/getPageListAction", {
        pageName: props.pageName,
        queryInfo: {
          offset: pageInfo.value.currentPage * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...query
        }
      });
    };
    getPageData();
    const dataList = computed(() =>
      store.getters["system/pageListData"](props.pageName)
    );
    const dataCount = computed(() =>
      store.getters[`system/pageListCount`](props.pageName)
    );
    const demo = getCurrentInstance();
    const filters = demo?.appContext.config.globalProperties.$filters;
    const otherPropSlots = props.contentTableConfig?.propsList.filter(
      (item: IpropsList) => {
        if (item.slotName == "id") return false;
        if (item.slotName == "name") return false;
        if (item.slotName == "createAt") return false;
        if (item.slotName == "handle") return false;
        return true;
      }
    );
    const handleNewClick = () => {
      emit("newBtnClick");
    };
    const handleEditClick = (item: any) => {
      emit("editBtnClick", item);
    };
    const handleDeleteClick = (item: any) => {
      store.dispatch("system/deletePageDataAction", {
        pageName: props.pageName,
        id: item.id
      });
    };
    const handleRefreshClick = () => {
      store.dispatch("system/getPageListAction", {
        pageName: props.pageName,
        queryInfo: {
          offset: pageInfo.value.currentPage * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize
        }
      });
    };
    return {
      dataList,
      isCreate,
      isUpdate,
      isDelete,
      isQuery,
      pageInfo,
      getPageData,
      dataCount,
      filters,
      otherPropSlots,
      handleNewClick,
      handleEditClick,
      handleDeleteClick,
      handleRefreshClick
    };
  }
});
</script>

<style scoped>
.content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
  i {
    font-size: 14px;
  }
}
.handle-btns {
  padding: 0px;
  #editIcon {
    color: blue;
  }
  #deleteIcon {
    color: red;
    margin-left: 0px;
  }
}
</style>
