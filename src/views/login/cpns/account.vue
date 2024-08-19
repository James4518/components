<template>
  <div class="panel-account">
    <el-form :model="account" :rules="accountRules" ref="formRef">
      <el-form-item label="帐号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { ElForm, FormRules } from "element-plus";
import { defineComponent, reactive, ref } from "vue";
import cache from "@/utils/cache";
import useStore from "@/store/index";
import { IAccount } from "./type";

export default defineComponent({
  setup() {
    const store = useStore;
    // 1.定义account数据
    const account = reactive<IAccount>({
      name: cache.getCache("name") ?? "",
      password: cache.getCache("password") ?? ""
    });
    // 2.定义校验规则
    const accountRules: FormRules = {
      name: [
        { required: true, message: "必须输入帐号信息!", trigger: "blur" },
        {
          pattern: /^[a-z0-9]{4,20}$/,
          message: "必须是4~20数字或字母组成",
          trigger: "blur"
        }
      ],
      password: [
        { required: true, message: "必须输入密码信息！", trigger: "blur" },
        {
          pattern: /^[a-z0-9]{5,}$/,
          message: "必须是5位以上数字或字母组成",
          trigger: "blur"
        }
      ]
    };
    const formRef = ref<InstanceType<typeof ElForm>>();
    const action = (isKeepPassword: boolean) => {
      formRef.value?.validate((valid) => {
        if (valid) {
          if (isKeepPassword) {
            cache.setCache("name", account.name);
            cache.setCache("password", account.password);
          } else {
            cache.deleteCache("name");
            cache.deleteCache("password");
          }
          store.dispatch("login/accountLoginAction", { ...account });
        }
      });
    };
    return {
      account,
      accountRules,
      formRef,
      action
    };
  }
});
</script>

<style lang="less" scoped>
.pane-account {
  color: red;
}
</style>
