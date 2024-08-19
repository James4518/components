<template>
  <div class="login-panel">
    <!-- 顶部的标题 -->
    <div class="contain"><h1 id="title">后台管理系统</h1></div>
    <!-- 中间的tabs切换 -->
    <div class="tabs">
      <el-tabs type="border-card" stretch>
        <!-- 1.账号登录的Pane -->
        <el-tab-pane>
          <template #label>
            <div class="icon">
              <el-icon size="20px"><UserFilled /></el-icon>
              <span class="text">帐号登录</span>
            </div>
          </template>
          <panel-account ref="accountRef" />
        </el-tab-pane>
        <!-- 2.手机登录的Pane -->
        <el-tab-pane name="phone">
          <template #label>
            <div class="icon">
              <el-icon size="20px"><Iphone /></el-icon>
              <span class="text">手机登录</span>
            </div>
          </template>
          <PanelPhone></PanelPhone>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div id="control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button type="primary" class="login-btn" @click="btnclick()"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import PanelAccount from "./account.vue";
import PanelPhone from "./phone.vue";

export default defineComponent({
  components: {
    PanelAccount,
    PanelPhone
  },
  setup() {
    const accountRef = ref<InstanceType<typeof PanelAccount>>();
    const isKeepPassword = ref(true);
    // const titleId = document.getElementById("title");
    const btnclick = () => {
      accountRef.value?.action(isKeepPassword.value);
    };
    return {
      accountRef,
      isKeepPassword,
      btnclick
    };
  }
});
</script>

<style lang="less" scoped>
.login-panel {
  width: 330px;
  margin-bottom: 150px;
  .contain {
    filter: contrast(30);
  }
  #title {
    text-align: center;
    margin-bottom: 15px;
    letter-spacing: -50px;
    animation: showup 6s linear forwards;
  }
  @keyframes showup {
    0% {
      filter: blur(3px);
    }
    100% {
      letter-spacing: 10px;
    }
  }
  #control {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }
  .login-btn {
    margin-top: 10px;
    width: 100%;
  }
  .icon {
    .el-icon {
      position: relative;
      right: 7px;
      top: 5px;
    }
  }
}
</style>
