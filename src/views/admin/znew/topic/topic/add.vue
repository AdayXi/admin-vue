<template>
  <div>
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter"
                style="width: 200px;"
                class="filter-item"
                placeholder="请输入医生姓名"
                v-model="nameid.hospitalName"> </el-input>
      <el-button class="filter-item"
                 type="primary"
                 v-waves
                 icon="search"
                 @click="handleFilter(nameid.hospitalName)">搜索</el-button>
    </div>
    <el-table :key='tableKey'
              :data="list"
              v-loading.body="listLoading"
              border
              fit
              highlight-current-row
              style="width: 100%">
      <el-table-column align="center"
                       label="选择"
                       width="65"> <template scope="scope">
          <el-radio v-model="radio"
                    :label="scope.row.id"
                    @change.native="getCurrentRow(scope.row)"></el-radio>
        </template> </el-table-column>
      <el-table-column align="center"
                       label="序号"
                       width="65"> <template scope="scope">
          <span>{{scope.$index + 1}}</span>
        </template> </el-table-column>
      <el-table-column width="200"
                       align="center"
                       label="医生姓名"> <template scope="scope">
          <span>{{scope.row.name}}</span>
        </template> </el-table-column>
      <el-table-column width="180"
                       align="center"
                       label="医生电话"> <template scope="scope">
          <span>{{scope.row.mobile}}</span>
        </template> </el-table-column>
      <el-table-column width="180"
                       align="center"
                       label="所属医院"> <template scope="scope">
          <span>{{scope.row.hospitalName}}</span>
        </template> </el-table-column>
    </el-table>
    <div v-show="!listLoading"
         class="pagination-container">
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page.sync="listQuery.page"
                     :page-sizes="[10,20,30,40]"
                     :page-size="listQuery.limit"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total"> </el-pagination>
    </div>
  </div>
</template>

<script>
import {
  getObj
} from 'api/new/topic/topic/index'
export default {
  data() {
    return {
      list: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
      },
      tableKey: 0,
      total: null,
      nameid: {
        hospitalName: undefined
      },
      radio: ''
    }
  },
  methods: {
    handleAdd() {
      this.listLoading = true
      this.dialogVisibleAdd = true
      getObj(this.listQuery)
        .then(res => {
          this.list = res.data.rows
          this.total = res.data.total
          this.listLoading = false
        })
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.handleAdd()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.handleAdd()
    },
    handleFilter(obj) {
      this.listLoading = true;
      const reg = /^[0-9]*$/
      if (reg.test(obj)) {
        this.listQuery.mobild = obj
        this.listQuery.name = ''
      } else {
        this.listQuery.name = obj
        this.listQuery.mobild = ''
      }
      getObj(this.listQuery)
        .then(res => {
          if (res.code === 200) {
            this.list = res.data.rows;
            this.total = res.data.total;
          }
          if (res.code === 204) {
            alert(res.message)
          }
          this.listLoading = false;
        })
    },
    getCurrentRow(row) {
      this.$emit('event', row.id)
    }
  },
  mounted() {
    this.handleAdd()
  }
}
</script>

<style>
.el-radio__label {
  display: none;
}
</style>
