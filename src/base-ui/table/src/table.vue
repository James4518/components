<template>
  <div>
    <div class="header">
      <slot name="header"></slot>
      <span>{{ title }}</span>
      <div class="handle">
        <slot name="header-handle"></slot>
      </div>
    </div>
    <div class="myWrap">
      <el-table :data="listData" type="expand" v-bind="childrenProps">
        <el-table-column
          v-if="showChooseColumn"
          type="selection"
          align="center"
          width="60px"
        ></el-table-column>
        <el-table-column
          v-if="showIndexColumn"
          type="index"
          label="序号"
          align="center"
          width="60px"
        ></el-table-column>
        <template v-for="propItem in tableHeader" :key="propItem.prop">
          <el-table-column
            v-bind="propItem"
            align="center"
            show-overflow-tooltip
          >
            <template #default="scope">
              <slot :name="propItem.slotName" :row="scope.row">
                {{ scope.row[propItem.prop] }}
              </slot>
            </template>
          </el-table-column>
        </template>
      </el-table>
    </div>
    <div class="footer" v-if="showFooter">
      <slot name="footer">
        <el-pagination
          class="pageination"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listCount"
          :page-size="page.pageSize"
          :page-sizes="[5, 10, 15, 20]"
          :current-page="page.currentPage + 1"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, onMounted, PropType, ref } from "vue";
import { IpropsList } from "./type";
import { IDateType } from "@/store/type";
import { User } from "@/store/login/type";
import Sortable from "sortablejs";
export default defineComponent({
  props: {
    title: {
      type: String,
      defalut: ""
    },
    listData: {
      type: Array,
      required: true
    },
    listCount: {
      type: Number,
      defalut: 0
    },
    page: {
      type: Object,
      default: () => ({ currentPage: 0, pageSize: 10 })
    },
    propsList: {
      type: Array as PropType<IpropsList[]>,
      required: true
    },
    showIndexColumn: {
      type: Boolean,
      default: false
    },
    showChooseColumn: {
      type: Boolean,
      default: false
    },
    showFooter: {
      type: Boolean,
      default: true
    },
    childrenProps: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["chooseChanged", "update:page"],
  setup(props, { emit }) {
    const handleChoose = (value: IDateType<User>) => {
      emit("chooseChanged", value);
    };
    const handleSizeChange = (pageSize: number) => {
      console.log("pageSize", pageSize);
      emit("update:page", { ...props.page, pageSize });
    };
    const handleCurrentChange = (currentPage: number) => {
      console.log("currentPage", currentPage);
      emit("update:page", { ...props.page, currentPage });
    };
    Object.defineProperty(props, "propsList", {
      writable: true
    });
    let tableHeader = ref([...props.propsList]);
    onMounted(() => {
      columnDropInit();
    });
    const columnDropInit = () => {
      // 第一步，获取列容器
      const wrapperColumn: HTMLElement = document.querySelector(
        ".el-table__header-wrapper tr"
      )!;
      // 第二步，给列容器指定对应拖拽规则
      Sortable.create(wrapperColumn, {
        animation: 500,
        delay: 0,
        onEnd: (event) => {
          console.log(
            "拖拽完成以后发现表头数据并没有改变，所以需要我们手动更新表头数据",
            tableHeader.value
          );
          console.log(
            "根据旧索引和新索引去更新，其实就是交换位置",
            event.oldIndex,
            event.newIndex
          );
          // 接下来做索引的交换
          let tempTableHeader = [...tableHeader.value]; // 先存一份临时变量表头数据
          let temp; // 临时变量用于交换
          temp = tempTableHeader[event.oldIndex! - 2]; // 注意这里-2是因为，我在表格的前面加了两列（勾选框列，和序号列）
          tempTableHeader[event.oldIndex! - 2] =
            tempTableHeader[event.newIndex! - 2]; // 如果没有这两列，序号就是正常对应的，就不用减2
          tempTableHeader[event.newIndex! - 2] = temp;
          // 这里一定要先把表头数据清空，然后再下一轮中去赋值，否则会渲染错误
          nextTick(() => {
            tableHeader.value = tempTableHeader;
          });
        }
      });
    };
    return {
      tableHeader,
      handleChoose,
      handleSizeChange,
      handleCurrentChange
    };
  }
});
</script>

<style lang="less">
.header {
  display: flex;
  height: 45px;
  padding: 0px 5px;
  justify-content: space-between;
  align-items: center;
  span {
    display: flex;
    justify-content: center;
    font-size: 20px;
    font-weight: 700px;
  }
  .handle {
    align-items: center;
    .el-icon {
      size: 20px;
      position: relative;
      top: 5px;
    }
  }
}
.footer {
  margin-top: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  .el-pagination {
    text-align: right;
  }
}
</style>
