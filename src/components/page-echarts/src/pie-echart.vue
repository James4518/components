<template>
  <div class="pie-echart">
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
        tooltip: {
          trigger: "item"
        },
        legend: {
          orient: "horizontal",
          left: "left"
        },
        series: [
          {
            name: "分类数据",
            type: "pie",
            radius: "50%",
            data: props.pieData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
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
