<template>
  <!-- 加图表
  1 人口排名
  2 贫困人口占比
-->
  <div class="chart-view">
    <div class="chart-item">
      <chart-bar
        v-if="chartData.popTotal.show"
        :data="chartData.popTotal"
        height="400px"
      ></chart-bar>
    </div>
    <div class="chart-item">
      <chart-bar
        v-if="chartData.popPoor.show"
        :data="chartData.popPoor"
        height="400px"
      ></chart-bar>
    </div>
  </div>
  <div class="container">
    <div class="search">
      <el-form class="search-item" :model="searchForm" ref="searchRef">
        <el-form-item class="search-item-input" prop="villageName">
          <span>村名：</span>
          <el-input
            v-model="searchForm.villageName"
            placeholder="村名/居委会,支持模糊查询"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item class="search-item-input" prop="charge">
          <span>村负责人：</span>
          <el-input
            v-model="searchForm.charge"
            placeholder="负责人,支持模糊查询"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item class="search-item">
          <el-button @click="handleSearch">搜索</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="option">
      <el-dropdown class="option-item">
        <el-button>
          更多操作
          <el-icon><arrow-down /></el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <el-upload
                class="upload"
                action=""
                :limit="1"
                accept=".xlsx"
                :before-upload="handleUpload"
              >
                上传数据
              </el-upload>
            </el-dropdown-item>
            <el-dropdown-item @click="handleDownload"
              >下载数据</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <!-- <el-select placeholder="更多操作" :popper-append-to-body="false">
        <el-option
          label="导出Excel"
          value="export"
          @click="handleDownload"
        ></el-option>
      </el-select> -->
      <!-- TODO：功能增加pop confirm弹出确认框 -->
      <el-popconfirm title="确定要删除所选的行吗？" @confirm="handleDelete">
        <template #reference>
          <el-button class="option-item">删除</el-button>
        </template>
      </el-popconfirm>
      <el-button class="option-item" @click="handleAddButton">新增</el-button>
      <!-- TODO: 元素:icon(?) 触发hover出现popover -->
      <el-popover
        placement="bottom-start"
        title="提示"
        :width="200"
        trigger="hover"
        content="双击某个数据可以进行在线修改，回车（Enter）保存修改，Esc取消/点击空白处操作"
      >
        <template #reference>
          <div slot="reference" class="option-item tips">
            <el-icon :size="24" color="#ffd43b"><opportunity /></el-icon>
          </div>
        </template>
      </el-popover>

      <!-- <div slot="reference" class="option-item tips">
        <el-icon :size="24" color="#ffd43b"><opportunity /></el-icon>
      </div> -->
    </div>
    <div class="table">
      <div class="table-view">
        <!-- TODO:某几列排序 -->
        <el-table
          :data="pageData"
          stripe
          @selection-change="handleSelectionChange"
          :header-cell-style="{
            color: '#222',
          }"
          :row-style="{
            color: '#888',
          }"
        >
          <el-table-column type="selection" />

          <el-table-column
            label="村名"
            align="center"
            sortable
            prop="villageName.val"
          >
            <template #default="scope">
              <div
                @dblclick="
                  handleInputShow(scope.$index, scope.row, 'villageName')
                "
              >
                <el-input
                  v-show="scope.row.villageName.visible"
                  :ref="`input-villageName-${scope.$index}`"
                  v-model="modifiedData"
                  @blur="handleInputBlur(scope.row, 'villageName')"
                  @keydown.esc="handleInputBlur(scope.row, 'villageName')"
                  @keydown.enter="handleInputEnter(scope.row, 'villageName')"
                ></el-input>
                <span v-show="!scope.row.villageName.visible">{{
                  scope.row.villageName.val
                }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column
            label="总人数"
            align="center"
            sortable
            :sort-method="sortByNum"
          >
            <template #default="scope">
              <div
                @dblclick="
                  handleInputShow(scope.$index, scope.row, 'peopleNum')
                "
              >
                <el-input
                  v-show="scope.row.peopleNum.visible"
                  :ref="`input-peopleNum-${scope.$index}`"
                  v-model="modifiedData"
                  @blur="handleInputBlur(scope.row, 'peopleNum')"
                  @keydown.esc="handleInputBlur(scope.row, 'peopleNum')"
                  @keydown.enter="handleInputEnter(scope.row, 'peopleNum')"
                ></el-input>
                <span v-show="!scope.row.peopleNum.visible">{{
                  scope.row.peopleNum.val
                }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="负责人" align="center">
            <template #default="scope">
              <div
                @dblclick="handleInputShow(scope.$index, scope.row, 'charge')"
              >
                <el-input
                  v-show="scope.row.charge.visible"
                  :ref="`input-charge-${scope.$index}`"
                  v-model="modifiedData"
                  @blur="handleInputBlur(scope.row, 'charge')"
                  @keydown.esc="handleInputBlur(scope.row, 'charge')"
                  @keydown.enter="handleInputEnter(scope.row, 'charge')"
                ></el-input>
                <span v-show="!scope.row.charge.visible">{{
                  scope.row.charge.val
                }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="职务" align="center">
            <template #default="scope">
              <div
                @dblclick="
                  handleInputShow(scope.$index, scope.row, 'chargeOffice')
                "
              >
                <el-input
                  v-show="scope.row.chargeOffice.visible"
                  :ref="`input-chargeOffice-${scope.$index}`"
                  v-model="modifiedData"
                  @blur="handleInputBlur(scope.row, 'chargeOffice')"
                  @keydown.esc="handleInputBlur(scope.row, 'chargeOffice')"
                  @keydown.enter="handleInputEnter(scope.row, 'chargeOffice')"
                ></el-input>
                <span v-show="!scope.row.chargeOffice.visible">{{
                  scope.row.chargeOffice.val
                }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="负责人电话" align="center">
            <template #default="scope">
              <div
                @dblclick="handleInputShow(scope.$index, scope.row, 'phone')"
              >
                <el-input
                  v-show="scope.row.phone.visible"
                  :ref="`input-phone-${scope.$index}`"
                  v-model="modifiedData"
                  @blur="handleInputBlur(scope.row, 'phone')"
                  @keydown.esc="handleInputBlur(scope.row, 'phone')"
                  @keydown.enter="handleInputEnter(scope.row, 'phone')"
                ></el-input>
                <span v-show="!scope.row.phone.visible">{{
                  scope.row.phone.val
                }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="贫困人数" align="center">
            <template #default="scope">
              <!-- <el-input
                  v-show="scope.row.povertyTotal.visible"
                  :ref="`input-povertyTotal-${scope.$index}`"
                  v-model="modifiedData"
                  @blur="handleInputBlur(scope.row, 'povertyTotal')"
                  @keydown.esc="handleInputBlur(scope.row, 'povertyTotal')"
                  @keydown.enter="handleInputEnter(scope.row, 'povertyTotal')"
                ></el-input> -->
              <span>{{ scope.row.poorTotal.val }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column label="操作" align="center" /> -->
        </el-table>
      </div>
      <div class="page">
        <el-pagination
          background
          layout="total, prev, pager, next"
          :total="tableParams.total"
          :page-size="12"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>

  <el-dialog v-model="addFormDialogVisible" title="新增信息" width="880px">
    <el-form :model="addForm" ref="addField">
      <el-form-item label="村名" prop="villageName">
        <el-input v-model="addForm.villageName"></el-input>
      </el-form-item>
      <el-form-item label="村总人数" prop="peopleNum">
        <el-input v-model="addForm.peopleNum"></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="local">
        <el-input v-model="addForm.local"></el-input>
      </el-form-item>
      <el-form-item label="负责人" prop="charge">
        <el-input v-model="addForm.charge"></el-input>
      </el-form-item>
      <el-form-item label="负责人职务" prop="chargeOffice">
        <el-input v-model="addForm.chargeOffice"></el-input>
      </el-form-item>
      <el-form-item label="负责人手机号" prop="phone">
        <el-input v-model="addForm.phone"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addFormDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleFormAddConfirm">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { VillageService } from "@/script/axios/api/api"
import { onMounted, reactive, ref, unref, getCurrentInstance } from "vue"
import { ElNotification } from "element-plus"
import { ArrowDown, Opportunity } from "@element-plus/icons-vue"
import { ChartBar } from "@/components/charts/index"
const { proxy } = getCurrentInstance() as any

onMounted(() => {
  getPage()
  getChartData()
})
/**
 * chart数据
 */
const chartData: any = reactive({
  popTotal: {
    name: [],
    value: [],
    show: false,
    color: ["#375BF8"],
  },
  popPoor: {
    name: [],
    value: [],
    show: false,
    color: ["#30D5D9"],
  },
})
const getChartData = async () => {
  const res: any = await VillageService.getChartData()
  console.log("getChartData: ", res)
  const { code } = res
  if (code === 200) {
    const { total, poor } = res.data
    // chartData.popTotal.name.push(total.name)
    // 写总人数的option属性
    total.color = ["#375BF8"]
    total.title = "村总人数"
    chartData.popTotal = total

    // 写贫困人口的option属性
    poor.color = ["#42C0F0"]
    poor.title = "村贫困人口人数"
    chartData.popPoor = poor
  }
}

/**
 * @type 搜索栏
 */
// 表单数据
const searchForm = reactive({
  villageName: "",
  charge: "",
})
let searchRef = ref()
const resetForm = () => {
  const form = unref(searchRef)
  form.resetFields()
  getPage()
}

const handleSearch = async () => {
  const res: any = await VillageService.search({
    villageName: searchForm.villageName || null,
    charge: searchForm.charge || null,
    pageNum: tableParams.pageNum,
    pageSize: tableParams.pageSize,
  })
  console.log("res: ", res)
  if (res.code === 200) {
    pageData.length = 0
    pageData.push(...res.data)
    tableParams.total = res.total
  }
}

/**
 * @type 更多操作
 */
// 上传 TODO:上传后前端解析并展示，确认后保存至数据库
const handleUpload = async (file: any) => {
  console.log("file: ", file)
  let formData = new FormData()
  formData.append("file", file)
  // formData.append("fileName", file.name)
  const res: any = await VillageService.uploadData(formData)
  console.log("res: ", res)
  if (res.code === 200) {
    const { msg, success, failure } = res.data
    ElNotification({
      type: "success",
      title: msg,
      message: `成功上传${success}个,失败${failure}个`,
    })
    getPage()
  } else {
    ElNotification({
      type: "warning",
      message: res.data.msg,
    })
  }
}

// 下载
const handleDownload = async () => {
  const res: any = await VillageService.downloadVillage()
  console.log("res: ", res)
  // console.log("blob: ", blob)
  const url = window.URL.createObjectURL(res)
  const el = document.createElement("a")
  el.style.display = "none"
  el.href = url
  el.setAttribute("download", `贫困村信息.xlsx`)
  document.querySelectorAll("body")[0].append(el)
  el.click()
  el.remove()
}

/**
 * @type 表格Table
 */
// 表格操作
const tableParams = reactive({
  pageNum: 1,
  pageSize: 12,
  total: 12,
  villageName: "",
  charge: "",
})

const handleSizeChange = (val: number) => {
  tableParams.pageSize = val
}
const handleCurrentChange = (val: number) => {
  console.log("val: ", val)
  tableParams.pageNum = val
  if (searchForm.villageName == "" && searchForm.charge == "") {
    getPage()
  } else {
    handleSearch()
  }
}

// 列表选中操作
let selectionList: any[] = []
const handleSelectionChange = (val: any) => {
  console.log("val: ", val)
  selectionList.length = 0
  val.forEach((e: any) => {
    selectionList.push(e.vid.val)
  })
  console.log("selectionList: ", selectionList)
}

// 删除 选中数组: selectionList
const handleDelete = async () => {
  console.log("handle delete")
  if (selectionList.length) {
    const res: any = await VillageService.delete({
      selectionList: selectionList,
    })
    console.log("res: ", res)
    if (res.code === 200) {
      ElNotification({
        title: "删除成功",
        message: "如有误操作，请联系开发者复原数据",
        type: "success",
        duration: 3000,
      })
      getPage()
    }
  } else {
    ElNotification({
      message: "请先选择需要操作的行",
      type: "warning",
      duration: 3000,
    })
  }
}

// 表格数据
let pageData = reactive<any[]>([])
const getPage = async () => {
  const res: any = await VillageService.getPage({
    pageNum: tableParams.pageNum,
    pageSize: tableParams.pageSize,
  })
  //   console.log("pageData: ", pageData)
  if (res.code == 200) {
    // 清空上一个数组
    pageData.length = 0
    pageData.push(...res.data)
    tableParams.total = res.total
    console.log("pageData: ", pageData)
  }
}

// 增加数据
let addFormDialogVisible = ref(false)
const addForm = reactive({
  villageName: "",
  peopleNum: "",
  local: "",
  charge: "",
  chargeOffice: "",
  phone: "",
})
const handleAddButton = () => {
  addFormDialogVisible.value = true
}
const addField = ref()
const handleFormAddConfirm = async () => {
  const res = await VillageService.addForm(addForm)
  console.log("res: ", res)

  addFormDialogVisible.value = false
  const form = unref(addField)
  form.resetFields()
}

// 列表单项修改
const modifiedData = ref("")
const handleInputShow = (index: number, row: any, key: string) => {
  modifiedData.value = row[key].val
  row[key].visible = true

  proxy.$refs[`input-${key}-${index}`].focus()
}
const handleInputBlur = (row: any, key: string) => {
  row[key].visible = false
}
const handleInputEnter = async (row: any, key: string) => {
  row[key].val = modifiedData.value
  const res: any = await VillageService.edit({
    vid: row.vid.val,
    key: key,
    newData: modifiedData.value,
  })
  console.log("res: ", res)
  if (res.code == 200) {
    ElNotification({
      message: res.msg,
      type: "success",
      duration: 1000,
    })
  }
  row[key].visible = false
}

// 排序
const sortByNum = (a: any, b: any) => {
  // console.log("sort", a.peopleNum.val - b.peopleNum.val)
  return a.peopleNum.val - b.peopleNum.val
}
</script>

<style lang="scss" scoped>
.chart-view {
  display: flex;
  height: 410px;
  width: 100%;
  background: #ececec;
  .chart-item {
    flex: 1;
    height: 400px;
    background: #fff;
    &:first-child {
      margin-right: 10px;
    }
  }
}
.container {
  padding: 14px 50px;
  .search {
    display: flex;
    justify-content: space-between;
    .search-item {
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      .search-item-input,
      .search-item-button {
        margin-right: 24px;
        :deep(.el-form-item__content) {
          flex-wrap: nowrap;
        }
        span {
          white-space: nowrap;
        }
        .el-input {
          width: 200px;
        }
      }
    }
  }

  .option {
    display: flex;
    justify-content: start;
    align-items: center;
    margin-top: 20px;
    .option-item {
      margin-left: 12px;
    }
    .el-select {
      width: 120px;
      .el-select-dropdown {
      }
    }
    .el-button {
    }
    .tips {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: 3px dotted transparent;
      &:hover {
        border-color: #ffd43b;
        cursor: pointer;
        // transform: translateY(-5px);
        // background: #ccc;
      }
      // line-height: 30px;
    }
  }
  .table {
    margin-top: 14px;
    .table-view {
      :deep(.el-table) {
        .el-table__cell {
          padding: 0;
          .cell {
            height: 40px;
            line-height: 40px;
            .el-input {
              .el-input__inner {
                text-align: center;
              }
            }
          }
        }
      }
    }
    .page {
      margin-top: 14px;
      display: flex;
      justify-content: end;
    }
  }
}
.el-dialog {
  overflow: hidden;
  .el-dialog__header {
    // height: 40px;
    padding: 0;
  }
  .el-dialog__body {
    .el-form {
      display: flex;
      flex-wrap: wrap;
      justify-content: start;
      .el-form-item {
        width: 250px;
        margin: 14px;
      }
    }
  }
}
</style>
