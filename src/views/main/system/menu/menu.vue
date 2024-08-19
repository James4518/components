<template>
  <pageContent :contentTableConfig="contentTableConfig" pageName="menu">
  </pageContent>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import pageContent from "@/components/page-content";
import { contentTableConfig } from "./config/content-config";

export default defineComponent({
  name: "Menu",
  components: {
    pageContent
  },
  setup() {
    return { contentTableConfig };
  }
});
</script>

<style scoped></style>
