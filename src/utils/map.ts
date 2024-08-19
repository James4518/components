import { useStore } from "@/store";
const store = useStore();
const departmentList = store.state.system.departmentList;
const getNameById = (id: number) => {
  const department = departmentList.find((item) => item.id === id);
  return department ? department.name : "";
};
export default getNameById;
