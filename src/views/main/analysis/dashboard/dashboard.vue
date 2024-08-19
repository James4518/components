<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <template v-for="item in amountList" :key="item.amount">
        <el-col :span="6" :xs="24" :sm="12" :md="8" :lg="6">
          <countCard v-bind="item" />
        </el-col>
      </template>
    </el-row>
    <el-row class="echarts">
      <el-col :span="7">
        <hyCard title="各类商品数量(饼图)">
          <pieEchart :pieData="goodsCount"></pieEchart>
        </hyCard>
      </el-col>
      <el-col :span="7">
        <hyCard title="各类商品数量(饼图)">
          <roseEchart :pieData="goodsCount"></roseEchart>
        </hyCard>
      </el-col>
      <el-col :span="10">
        <hyCard title="不同城市商品销量">
          <mapEchart :mapData="addressSale"></mapEchart>
        </hyCard>
      </el-col>
    </el-row>
    <el-row class="echarts">
      <el-col :span="12">
        <hyCard title="各类商品销量">
          <lineEchart v-bind="goodsSale"></lineEchart>
        </hyCard>
      </el-col>
      <el-col :span="12">
        <hyCard title="各类商品收藏">
          <barEchart v-bind="goodsFavor"></barEchart>
        </hyCard>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { computed, defineComponent } from "vue";
import hyCard from "@/base-ui/card";
import {
  pieEchart,
  roseEchart,
  lineEchart,
  barEchart,
  mapEchart
} from "@/components/page-echarts";
import countCard from "./countCard.vue";
export default defineComponent({
  name: "dashboard",
  components: {
    hyCard,
    countCard,
    pieEchart,
    roseEchart,
    lineEchart,
    barEchart,
    mapEchart
  },
  setup() {
    const store = useStore();
    store.dispatch("dashboard/getDashboardDataAction");
    const amountList = computed(() => store.state.dashboard.amountListData);
    const goodsCount = computed(() => {
      return store.state.dashboard.categoryGoodsCount.map((item) => {
        return { name: item.name, value: item.goodsCount };
      });
    });
    const goodsSale = computed(() => {
      const xLabel: string[] = [];
      const values: any[] = [];
      const categoryGoodsSale = store.state.dashboard.categoryGoodsSale;
      for (const item of categoryGoodsSale) {
        xLabel.push(item.name);
        values.push(item.goodsCount);
      }
      return { xLabel, values };
    });
    const goodsFavor = computed(() => {
      const xLabel: string[] = [];
      const values: any[] = [];
      const categoryGoodsFavor = store.state.dashboard.categoryGoodsFavor;
      for (let i = 0; i < categoryGoodsFavor.length - 1; i++) {
        const item = categoryGoodsFavor[i];
        xLabel.push(item.name);
        values.push(item.goodsFavor);
      }
      return { xLabel, values };
    });
    const addressSale = computed(() => {
      return store.state.dashboard.addressGoodsSale.map((item) => {
        return { name: item.address, value: item.count };
      });
    });
    return {
      amountList,
      goodsCount,
      goodsSale,
      goodsFavor,
      addressSale
    };
  }
});
</script>

<style scoped>
.el-col {
  padding: 5px;
}
.echarts {
  position: relative;
  top: 20px;
}
</style>
