<template>
  <div class="hy-form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item v-if="!item.isHidden" :label="item.label">
              <template v-if="item.type == 'input' || item.type == 'password'">
                <el-input
                  :show-password="item.type == 'password'"
                  v-model="formData[`${item.field}`]"
                  :placeholder="item.tip"
                >
                </el-input>
              </template>
              <template v-else-if="item.type == 'select'">
                <el-select
                  :placeholder="item.tip"
                  v-model="formData[`${item.field}`]"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                  >
                    {{ option.title }}
                  </el-option>
                </el-select>
              </template>
              <template v-else-if="item.type == 'datepicker'">
                <el-date-picker
                  v-bind="item.options"
                  v-model="formData[`${item.field}`]"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent, ref, watch } from "vue";
import { IformItem, calLayoutItem } from "./type";
export default defineComponent({
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    formItems: {
      type: Array as PropType<IformItem[]>,
      default: () => []
    },
    labelWidth: {
      type: String,
      default: "100px"
    },
    itemStyle: {
      type: Object,
      default: () => ({ padding: "10px 40px" })
    },
    colLayout: {
      type: Object,
      default: () => ({ span: calLayoutItem })
    }
  },
  setup(props, { emit }) {
    const formData = ref({ ...props.modelValue });
    watch(formData, (newval) => emit("update:modelValue", newval), {
      deep: true
    });
    return {
      formData
    };
  }
});
</script>
<style scoped></style>
