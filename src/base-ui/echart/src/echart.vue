<template>
  <div class="base">
    <div ref="echartDivRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script lang="ts">
import useEchart from "../hooks/useEchart";
import { EChartsOption } from "echarts";
//import * as echarts from "echarts";
import { onMounted, ref, watchEffect, PropType, defineComponent } from "vue";
export default defineComponent({
  props: {
    options: {
      type: Object as PropType<EChartsOption>,
      required: true
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "300px"
    }
  },
  setup(props) {
    const echartDivRef = ref<HTMLElement>();
    onMounted(() => {
      const { setOptions } = useEchart(echartDivRef.value!);
      watchEffect(() => setOptions(props.options));
    });
    return {
      echartDivRef
    };
  }
});
// const props = withDefaults(
//   defineProps<{
//     options: echarts.EChartsOption;
//     width?: string;
//     height?: string;
//   }>(),
//   {
//     width: "100%",
//     height: "320px"
//   }
// );
// const echartDivRef = ref<HTMLElement>();
// onMounted(() => {
//   const { setOptions } = useEchart(echartDivRef.value!);
//   watchEffect(() => setOptions(props.options));
// });
</script>
