<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isCollapse ? '70px' : '210px'">
        <NavMenu :collapse="isCollapse"></NavMenu>
      </el-aside>
      <el-container class="page">
        <el-header class="page-header">
          <NavHeader @foldChanged="handleFold"></NavHeader>
        </el-header>
        <el-main class="page-content">
          <!-- <NotAuth v-if="!isAuth"></NotAuth> -->
          <!-- <router-view v-slot="{ Component }">
            <KeepAlive>
              <component :is="Component">{{ Component }}</component>
            </KeepAlive>
          </router-view> -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts">
import { ref } from "vue";
//import NotAuth from "../NotAuth.vue";
import NavMenu from "@/components/nav-menu";
import NavHeader from "@/components/nav-header";
export default {
  components: {
    //NotAuth,
    NavMenu,
    NavHeader
  },
  setup() {
    const isCollapse = ref(false);
    const handleFold = (isFold: boolean) => {
      isCollapse.value = isFold;
    };
    return {
      isCollapse,
      handleFold
    };
  }
};
</script>

<style scoped lang="less">
.main {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  min-width: 900px;
  min-height: 150px;
}
.main-content,
.page {
  height: 100%;
}
.page-content {
  height: calc(100%-48px);
}
.el-header,
.el-footer {
  display: flex;
  color: #333;
  text-align: center;
  align-items: center;
}
.el-header {
  height: 48px !important;
}

.el-aside {
  background-color: #001529;
  overflow-x: hidden;
  overflow-y: auto;
  line-height: 200px;
  text-align: left;
  cursor: pointer;
  transition: width 0.3s linear;
}
.el-main {
  color: #333;
  text-align: center;
  background-color: #f0f2f5;
}
</style>
