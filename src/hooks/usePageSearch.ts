import { ref } from "vue";
import pageContent from "@/components/page-content";
export function usePageSearch() {
  const pageContentRef = ref<InstanceType<typeof pageContent>>();
  const handleResetClick = () => {
    pageContentRef.value?.getPageData();
  };
  const handleQueryClick = (query: any) => {
    pageContentRef.value?.getPageData(query);
    console.log(pageContentRef.value);
  };
  return [pageContentRef, handleResetClick, handleQueryClick];
}
