<template>
  <div class="header-info">
    <div class="operation">
      <el-icon size="18px"><bell /></el-icon>
      <el-icon size="18px"><ChatDotRound /></el-icon>
      <el-icon size="18px"><Postcard /></el-icon>
    </div>
    <div class="info">
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-avatar size="small"><User /> </el-avatar>
          <span>{{ name }}</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item icon>用户信息</el-dropdown-item>
            <el-dropdown-item>系统管理</el-dropdown-item>
            <el-dropdown-item divided @click="handleExitClick">
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { computed } from "vue";
import cache from "@/utils/cache";
import { useRouter } from "vue-router";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const name = computed(() => store.state.login.userInfo.data.name);
    const handleExitClick = () => {
      cache.deleteCache("token");
      router.push("/main");
    };
    return {
      name,
      handleExitClick
    };
  }
};
</script>
<style scoped>
.header-info {
  display: flex;
  align-items: center;
  .operation {
    display: inline-flex;
    margin-right: 10px;
    .el-icon {
      padding: 6px;
    }
  }
}

.info {
  .el-dropdown-link {
    display: flex;
    align-items: center;
    span {
      left: 5px;
    }
  }
  :global(.el-dropdown-menu__item) {
    line-height: 36px !important;
    padding: 6px 22px;
  }
}
</style>
