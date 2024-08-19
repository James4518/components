<template>
  <div class="pie-echart">
    <baseEchart :options="option"></baseEchart>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import baseEchart from "@/base-ui/echart";
import * as echarts from "echarts";
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
    const option = computed(() => {
      return {
        title: {
          text: "可缩放",
          subtext: "Gradient Color, Shadow, Click Zoom"
        },
        xAxis: {
          data: props.xLabel,
          axisLabel: {
            inside: true,
            color: "#fff"
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          z: 10
        },
        yAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: "#999"
          }
        },
        dataZoom: [
          {
            type: "inside"
          }
        ],
        series: [
          {
            type: "bar",
            showBackground: true,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#83bff6" },
                { offset: 0.5, color: "#188df0" },
                { offset: 1, color: "#188df0" }
              ])
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#2378f7" },
                  { offset: 0.7, color: "#2378f7" },
                  { offset: 1, color: "#83bff6" }
                ])
              }
            },
            data: props.values
          }
        ]
      };
    }) as any as EChartsOption;
    // // Enable data zoom when user click bar.
    // const zoomSize = 6;
    // const myChart = echartDivRef.value
    // myChart.on("click", function (params: any) {
    //   console.log(props.xLabel[Math.max(params.dataIndex - zoomSize / 2, 0)]);
    //   myChart.dispatchAction({
    //     type: "dataZoom",
    //     startValue: props.xLabel[Math.max(params.dataIndex - zoomSize / 2, 0)],
    //     endValue:
    //       props.xLabel[
    //         Math.min(params.dataIndex + zoomSize / 2, props.values.length - 1)
    //       ]
    //   });
    // });
    return {
      option
    };
  }
});
</script>

<style scoped>
.echarts {
  touch-action: none; /* Disable touch gestures */
  overflow: hidden; /* Hide any overflow content */
}
</style>
