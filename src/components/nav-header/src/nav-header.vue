<template>
  <div class="nav-header">
    <div @click="HandleClick" class="fold">
      <template v-if="isFold">
        <el-icon size="30px"><Fold /></el-icon>
      </template>
      <template v-else>
        <el-icon size="30"><Expand /></el-icon>
      </template>
    </div>
    <div class="content">
      <hyBreadCrumb :breadcrumbs="breadcrumbs"></hyBreadCrumb>
      <userInfo />
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed, defineComponent } from "vue";
import userInfo from "./userInfo.vue";
import { useStore } from "@/store";
import { useRoute } from "vue-router";
import { MapBreadCrumb } from "@/utils/mapMenus";
import hyBreadCrumb from "@/base-ui/breadcrumb";
export default defineComponent({
  components: {
    userInfo,
    hyBreadCrumb
  },
  emits: ["foldChanged"],
  setup(props, { emit }) {
    const store = useStore();
    const isFold = ref(false);
    const breadcrumbs = computed(() => {
      const userMenus = store.state.login.userMenus;
      const route = useRoute();
      const currentPath = route.path;
      return MapBreadCrumb(userMenus, currentPath);
    });
    const HandleClick = () => {
      isFold.value = !isFold.value;
      emit("foldChanged", isFold.value);
    };
    return {
      isFold,
      breadcrumbs,
      HandleClick
    };
  }
});
</script>

<style lang="less" scoped>
.nav-header {
  display: flex;
  width: 100%;
  .fold {
    cursor: pointer;
  }
  .content {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: space-between;
    padding-left: 10px;

    i {
      position: relative;
      bottom: 2px;
    }
  }
}
</style>
