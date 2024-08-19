<template>
  <div class="line-echart">
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
    xLabel: {
      type: Array,
      required: true
    },
    values: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const option = computed<EChartsOption>(() => {
      return {
        xAxis: {
          type: "category",
          data: props.xLabel as string[]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: props.values as any[],
            type: "line",
            smooth: true
          }
        ]
      };
    });
    return {
      option
    };
  }
});
</script>

<style scoped></style>
