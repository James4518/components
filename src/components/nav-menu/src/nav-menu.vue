<template>
  <div class="nav-menu">
    <div class="logo">
      <img src="~@/assets/logo.svg" />
      <!-- <span v-if="!collapse">Vue3+Ts</span> -->
      <div v-if="!collapse" id="wavy">
        <span style="--i: 1">V</span>
        <span style="--i: 2">u</span>
        <span style="--i: 3">e</span>
        <span style="--i: 4">+</span>
        <span style="--i: 5">T</span>
        <span style="--i: 6">s</span>
      </div>
    </div>
    <el-menu
      :default-active="defaultValue"
      class="el-menu-vertical"
      :collapse="collapse"
    >
      <template v-for="item in userMenus" :key="item.id">
        <template v-if="item.type === 1">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon>
                <component :is="item.icon.split('el-icon-')[1]"></component>
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item
                :index="subitem.id + ''"
                @click="MenuItemClick(subitem)"
              >
                <i v-if="subitem.icon" :class="subitem.icon"></i>
                <span>{{ subitem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <template v-else>
          <el-menu-item :index="item.id + ''">
            <i v-if="item.icon" :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>
<script lang="ts">
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "@/store";
import { userMenus } from "@/store/login/type";
import { PathToMenu } from "@/utils/mapMenus";
export default {
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const userMenus = computed(() => store.state.login.userMenus);
    const currentPath = route.path;
    const menu = PathToMenu(userMenus.value, currentPath);
    const defaultValue = ref(menu.id + "");
    const MenuItemClick = (item: userMenus) => {
      console.log(item.url);
      router.push({
        path: item.url ?? "not-found"
      });
    };
    return {
      defaultValue,
      store,
      userMenus,
      MenuItemClick
    };
  }
};
</script>

<style lang="less" scoped>
.main-menu {
  height: 100%;
  background-color: #001529;
}

.logo {
  display: flex;
  height: 28px;
  padding: 12px 10px 8px 10px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  img {
    height: 100%;
    margin: 0 10px;
  }
  span {
    color: #fff;
    font-size: 16px;
    font-weight: 700;
    white-space: nowrap;
  }
  #wavy {
    position: relative;
    -webkit-box-reflect: below -6px linear-gradient(transparent, rgba(0, 0, 0, 0.2));
  }
  #wavy span {
    position: relative;
    display: inline-block;
    color: #fff;
    animation: animate 1s ease-in-out infinite;
    animation-delay: calc(0.1s * var(--i));
  }
}

.el-menu {
  border-right: none;
  user-select: none;
}

.el-sub-menu {
  span {
    color: #8b8386;
  }
  background-color: #001529 !important;
  .el-menu-item {
    padding-left: 50px !important;
    background-color: #0c2135;
  }

  .el-menu-item:hover {
    color: #fff;
  }

  .el-menu-item.is-active {
    background-color: #0a60bd;
  }
}
@keyframes animate {
  0% {
    transform: translateY(0px);
  }
  20% {
    transform: translateY(-12px);
  }
  40%,
  100% {
    transform: translateY(0px);
  }
}
</style>
