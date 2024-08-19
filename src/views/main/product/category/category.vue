<template>
  <div class="category">aa</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "category",
  setup() {
    // console.log(`${year}-${month}-${day}-${hour}-${minute}-${second}`);
    const time1 = 1695821160052;
    const time2 = "2024-12-24 15:30:00 UTC";
    return {
      time1,
      time2
    };
  }
});
</script>

<style scoped></style>
