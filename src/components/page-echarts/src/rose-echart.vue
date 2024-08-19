<template>
  <div class="rose-echart">
    <baseEchart :options="option"></baseEchart>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import baseEchart from "@/base-ui/echart";
import { EChartsOption } from "echarts";

export default defineComponent({
  name: "dashboard",
  components: {
    baseEchart
  },
  props: {
    pieData: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const option = computed(() => {
      return {
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            name: "类别数据",
            type: "pie",
            radius: [5, 65],
            center: ["50%", "45%"],
            roseType: "area",
            itemStyle: {
              borderRadius: 8
            },
            data: props.pieData
          }
        ]
      };
    }) as any as EChartsOption;
    return {
      option
    };
  }
});
</script>

<style scoped></style>
