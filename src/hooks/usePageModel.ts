import pageModel from "@/components/page-model";
import { User } from "@/store/login/type";
import { ref } from "vue";
type cbFn = (item?: any) => void;
export function usePageModel(newcb?: cbFn, editcb?: cbFn) {
  const defaultInfo = ref({});
  const pageModelRef = ref<InstanceType<typeof pageModel>>();
  const handleNewData = () => {
    defaultInfo.value = {};
    if (pageModelRef.value) {
      pageModelRef.value.dialogVisible = true;
      pageModelRef.value.isEdit = false;
    }
    newcb && newcb();
  };
  const handleEditData = (item: User) => {
    defaultInfo.value = { ...item };
    if (pageModelRef.value) {
      pageModelRef.value.dialogVisible = true;
      pageModelRef.value.isEdit = true;
    }
    editcb && editcb(item);
  };
  return [defaultInfo, pageModelRef, handleNewData, handleEditData];
}
