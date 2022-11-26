<template>
  <div class="container">
    <div class="search">
      <el-form class="search-item" :model="searchForm" ref="searchRef">
        <el-form-item class="search-item-input" prop="name">
          <span>姓名：</span>
          <el-input
            v-model="searchForm.name"
            placeholder="姓名,支持模糊查询"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item class="search-item-input" prop="phone">
          <span>手机：</span>
          <el-input
            v-model="searchForm.phone"
            placeholder="手机号,支持模糊查询"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item class="search-item-input" prop="villageName">
          <span>村名：</span>
          <el-input
            v-model="searchForm.villageName"
            placeholder="村名,支持模糊查询"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item class="search-item-button">
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
      <!-- <el-button class="option-item" @click="handleDelete">删除</el-button> -->
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
    </div>
    <div class="table">
      <div class="table-view">
        <!-- TODO:某几列排序 -->
        <el-table
          :data="pageData"
          stripe
          height="700"
          @selection-change="handleSelectionChange"
          :header-cell-style="{
            color: '#222',
          }"
          :row-style="{
            color: '#888',
          }"
        >
          <el-table-column type="selection" />

          <el-table-column label="姓名" align="center" sortable prop="name.val">
            <template #default="scope">
              <div @dblclick="handleInputShow(scope.$index, scope.row, 'name')">
                <el-input
                  v-show="scope.row.name.visible"
                  :ref="`input-name-${scope.$index}`"
                  v-model="modifiedData"
                  @blur="handleInputBlur(scope.row, 'name')"
                  @keydown.esc="handleInputBlur(scope.row, 'name')"
                  @keydown.enter="handleInputEnter(scope.row, 'name')"
                ></el-input>
                <span v-show="!scope.row.name.visible">{{
                  scope.row.name.val
                }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="性别" align="center">
            <template #default="scope">
              <div @dblclick="handleInputShow(scope.$index, scope.row, 'sex')">
                <el-input
                  v-show="scope.row.sex.visible"
                  :ref="`input-sex-${scope.$index}`"
                  v-model="modifiedData"
                  @blur="handleInputBlur(scope.row, 'sex')"
                  @keydown.esc="handleInputBlur(scope.row, 'sex')"
                  @keydown.enter="handleInputEnter(scope.row, 'sex')"
                ></el-input>
                <span v-show="!scope.row.sex.visible">{{
                  scope.row.sex.val
                }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="年龄" align="center" sortable prop="age.val">
            <template #default="scope">
              <div @dblclick="handleInputShow(scope.$index, scope.row, 'age')">
                <el-input
                  v-show="scope.row.age.visible"
                  :ref="`input-age-${scope.$index}`"
                  v-model="modifiedData"
                  @blur="handleInputBlur(scope.row, 'age')"
                  @keydown.esc="handleInputBlur(scope.row, 'age')"
                  @keydown.enter="handleInputEnter(scope.row, 'age')"
                ></el-input>
                <span v-show="!scope.row.age.visible">{{
                  scope.row.age.val
                }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="手机" align="center">
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

          <el-table-column label="政治面貌" align="center">
            <template #default="scope">
              <div
                @dblclick="
                  handleInputShow(scope.$index, scope.row, 'political')
                "
              >
                <el-input
                  v-show="scope.row.political.visible"
                  :ref="`input-political-${scope.$index}`"
                  v-model="modifiedData"
                  @blur="handleInputBlur(scope.row, 'political')"
                  @keydown.esc="handleInputBlur(scope.row, 'political')"
                  @keydown.enter="handleInputEnter(scope.row, 'political')"
                ></el-input>
                <span v-show="!scope.row.political.visible">{{
                  scope.row.political.val
                }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="学历" align="center">
            <template #default="scope">
              <div
                @dblclick="
                  handleInputShow(scope.$index, scope.row, 'education')
                "
              >
                <el-input
                  v-show="scope.row.education.visible"
                  :ref="`input-education-${scope.$index}`"
                  v-model="modifiedData"
                  @blur="handleInputBlur(scope.row, 'education')"
                  @keydown.esc="handleInputBlur(scope.row, 'education')"
                  @keydown.enter="handleInputEnter(scope.row, 'education')"
                ></el-input>
                <span v-show="!scope.row.education.visible">{{
                  scope.row.education.val
                }}</span>
              </div>
            </template>
          </el-table-column>
          <!-- TODO: 双击浮现村选择器 -->
          <el-table-column label="所在村" align="center">
            <template #default="scope">
              <div>
                <!-- <el-input
                  v-show="scope.row.villageName.visible"
                  :ref="`input-villageName-${scope.$index}`"
                  v-model="modifiedData"
                  @blur="handleInputBlur(scope.row, 'villageName')"
                  @keydown.esc="handleInputBlur(scope.row, 'villageName')"
                  @keydown.enter="handleInputEnter(scope.row, 'villageName')"
                ></el-input> -->
                <span>{{ scope.row.villageName.val }}</span>
              </div>
            </template>
          </el-table-column>

          <!-- <el-table-column label="负责人电话" align="center">
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
          </el-table-column> -->

          <!-- <el-table-column label="贫困人数" align="center">
            <template #default="scope">
              <span>{{ scope.row.poorTotal.val }}</span>
            </template>
          </el-table-column> -->
          <!-- <el-table-column label="操作" align="center" /> -->
        </el-table>
      </div>
      <div class="page">
        <el-pagination
          v-model:currentPag="tableParams.pageNum"
          v-model:page-size="tableParams.pageSize"
          background
          layout="total, sizes, prev, pager, next"
          :total="tableParams.total"
          :page-sizes="[12, 30, 50, 100]"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>

  <el-dialog
    customClass="customWidth"
    v-model="addFormDialogVisible"
    title="新增信息"
    width="520px"
  >
    <el-form :model="addForm">
      <el-form-item label="名字" prop="name">
        <el-input v-model="addForm.name"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <!-- <el-input v-model="addForm.sex"></el-input> -->
        <el-radio-group v-model="addForm.sex" size="default">
          <el-radio-button label="男" />
          <el-radio-button label="女" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model="addForm.age"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="phone">
        <el-input v-model="addForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="政治面貌" prop="political">
        <el-input v-model="addForm.political"></el-input>
      </el-form-item>
      <el-form-item label="学历" prop="education">
        <!-- <el-input v-model="addForm.education"></el-input> -->
        <el-select
          v-model="addForm.education"
          placeholder="选择学历"
          size="default"
          :popper-append-to-body="false"
        >
          <el-option
            v-for="item in eduList"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="村/居委会" prop="village">
        <!-- <el-input v-model="addForm.village"></el-input> -->
        <el-select
          v-model="addForm.village"
          filterable
          placeholder="选择所属的村/居委会"
          size="default"
          :popper-append-to-body="false"
        >
          <el-option
            v-for="item in villageList"
            :key="item.vid"
            :label="item.villageName"
            :value="item.vid"
          />
        </el-select>
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
import { PersonalService } from "@/script/axios/api/api"
import { onMounted, reactive, ref, unref, getCurrentInstance } from "vue"
import { ElNotification } from "element-plus"
import { ArrowDown, Opportunity } from "@element-plus/icons-vue"
const { proxy } = getCurrentInstance() as any

onMounted(() => {
  getPage()
})
/**
 * @type 搜索栏
 */
// 表单数据
const searchForm = reactive({
  name: "",
  phone: "",
  villageName: "",
})
let searchRef = ref()
const resetForm = () => {
  const form = unref(searchRef)
  form.resetFields()
  getPage()
}

const handleSearch = async () => {
  const res: any = await PersonalService.search({
    name: searchForm.name || null,
    phone: searchForm.phone || null,
    villageName: searchForm.villageName || null,
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
// 上传
const handleUpload = async (file: any) => {
  console.log("file: ", file)
  let formData = new FormData()
  formData.append("file", file)
  const res: any = await PersonalService.uploadData(formData)
  console.log("res: ", res)
  if (res.code === 200) {
    const { msg, success } = res.data
    ElNotification({
      type: "success",
      title: msg,
      message: `成功上传${success}个`,
    })
    getPage()
  } else {
    ElNotification({
      type: "warning",
      message: res.data.msg,
    })
  }
  // return true
}

// 下载
const handleDownload = async () => {
  const res: any = await PersonalService.downloadPersonal({
    pageSize: tableParams.pageSize,
    pageNum: tableParams.pageNum,
  })
  console.log("res: ", res)
  // console.log("blob: ", blob)
  const url = window.URL.createObjectURL(res)
  const el = document.createElement("a")
  el.style.display = "none"
  el.href = url
  el.setAttribute("download", `贫困人员信息.xlsx`)
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
  getPage()
}
const handleCurrentChange = (val: number) => {
  console.log("val: ", val)
  tableParams.pageNum = val
  if (
    searchForm.villageName == "" &&
    searchForm.name == "" &&
    searchForm.phone == ""
  ) {
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
    selectionList.push(e.uid.val)
  })
  console.log("selectionList: ", selectionList)
}

// 删除 选中数组: selectionList
const handleDelete = async () => {
  console.log("handle delete")
  if (selectionList.length) {
    const res: any = await PersonalService.delete({
      selectionList: selectionList,
    })
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
  const res: any = await PersonalService.getPage({
    pageNum: tableParams.pageNum,
    pageSize: tableParams.pageSize,
  })
  //   console.log("pageData: ", pageData)
  if (res.code == 200) {
    console.log("res: ", res)
    // 清空上一个数组
    pageData.length = 0
    pageData.push(...res.data)
    tableParams.total = res.total
    console.log("pageData: ", pageData)
  }
}

// 增加数据
const eduList = reactive(["博士", "研究生", "本科", "中学", "小学", "其他"]) //学历选择
const villageList = reactive<any[]>([])
const getVillageList = async () => {
  const res: any = await PersonalService.getVillageList()
  console.log("res: ", res)
  if (res.code === 200) {
    villageList.length = 0
    villageList.push(...res.data)
  }
}
let addFormDialogVisible = ref(false)
const addForm = reactive({
  name: "",
  sex: "",
  age: "",
  phone: "",
  political: "",
  education: "",
  village: "",
})
const handleAddButton = () => {
  getVillageList()
  addFormDialogVisible.value = true
}
const handleFormAddConfirm = async () => {
  const res = await PersonalService.addForm(addForm)
  console.log("res: ", res)

  addFormDialogVisible.value = false
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
  console.log("row: ", row)
  row[key].val = modifiedData.value
  const res: any = await PersonalService.edit({
    uid: row.uid.val,
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
</script>

<style lang="scss" scoped>
.container {
  padding: 14px 50px;
  overflow: hidden;
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
      .search-item-button {
      }
    }
  }

  .option {
    display: flex;
    justify-content: start;
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
  // width: 520px !important;
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
        width: 200px;
        margin: 14px;
      }
    }
  }
}
</style>
