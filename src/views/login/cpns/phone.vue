<template>
  <div class="panel-phone">
    <el-form label-width="60px">
      <el-form-item label="手机号">
        <el-input />
      </el-form-item>
      <el-form-item label="验证码">
        <div class="verify-code">
          <el-input />
          <el-button class="get-btn" type="primary">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { ElForm, FormRules } from "element-plus";
import { defineComponent, reactive, ref } from "vue";
import cache from "@/utils/cache";
import useStore from "@/store/index";
import { Iphone } from "./type";

export default defineComponent({
  setup() {
    const store = useStore;
    // 1.定义account数据
    const phone = reactive<Iphone>({
      cellphone: cache.getCache("cellphone") ?? "",
      code: cache.getCache("code") ?? ""
    });
    // 2.定义校验规则
    const phoneRules: FormRules = {
      cellphone: [
        { required: true, message: "请输入手机号", trigger: "blur" },
        {
          pattern:
            /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/,
          message: "请输入正确的手机号",
          trigger: "blur"
        }
      ],
      code: [
        { required: true, message: "请输入验证码", trigger: "blur" },
        {
          pattern: /^[0-9]{4}$/,
          message: "4位数字",
          trigger: "blur"
        }
      ]
    };
    return {
      phone,
      phoneRules
    };
  }
});
</script>

<style lang="less" scoped>
.panel-phone {
  color: red;
}

.verify-code {
  display: flex;

  .get-btn {
    margin-left: 8px;
  }
}
</style>
