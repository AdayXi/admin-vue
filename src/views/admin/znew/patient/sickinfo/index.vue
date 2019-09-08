<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter"
                style="width: 200px;"
                class="filter-item"
                placeholder="请输入病种名称"
                v-model="nameid.name"> </el-input>
      <el-button class="filter-item"
                 type="primary"
                 v-waves
                 icon="search"
                 @click="handleFilter">搜索</el-button>
    </div>
    <el-table :key='tableKey'
              :data="list"
              v-loading.body="listLoading"
              border
              fit
              highlight-current-row
              style="width: 100%">
      <el-table-column align="center"
                       label="序号"
                       width="65"> <template scope="scope">
          <span>{{scope.$index + 1}}</span>
        </template> </el-table-column>
      <el-table-column width="200"
                       align="center"
                       label="病种名称"> <template scope="scope">
          <span>{{scope.row.bzName}}</span>
        </template> </el-table-column>
      <el-table-column width="200"
                       align="center"
                       label="用户名称"> <template scope="scope">
          <span>{{scope.row.username}}</span>
        </template> </el-table-column>
      <el-table-column width="180"
                       align="center"
                       label="创建时间"> <template scope="scope">
          <span>{{scope.row.crtTime | dateformat}}</span>
        </template> </el-table-column>
      <el-table-column width="180"
                       align="center"
                       label="更新时间"> <template scope="scope">
          <span>{{scope.row.updTime | dateformat}}</span>
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
  page,
  addObj,
  getObj,
  delObj,
  putObj
} from 'api/new/patient/sickinfo/index';
import { mapGetters } from 'vuex';
export default {
  name: 'user',
  data() {
    return {
      id: undefined,
      nameid: {
        name: undefined
      },
      form: {
        hospitalName: undefined,
        address: undefined,
        telPhone: undefined
      },

      list: [],
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
      },
      sexOptions: ['男', '女'],
      dialogFormVisible: false,
      dialogStatus: '',
      userManager_btn_edit: false,
      userManager_btn_del: false,
      userManager_btn_add: false,
      textMap: {
        update: '编辑',
        create: '创建'
      },
      tableKey: 0
    }
  },
  created() {
    this.getList();
    this.userManager_btn_edit = this.elements['userManager:btn_edit'];
    this.userManager_btn_del = this.elements['userManager:btn_del'];
    this.userManager_btn_add = this.elements['userManager:btn_add'];
  },
  computed: {
    ...mapGetters([
      'elements'
    ])
  },
  methods: {
    getList() {
      this.listLoading = true;
      page(this.listQuery)
        .then(response => {
          console.log(response)
          this.list = response.data.rows;
          this.total = response.data.total;
          this.listLoading = false;
        })
    },
    handleFilter() {
      this.listLoading = true;
      if (!this.nameid.name) {
        this.nameid = {}
      }
      page(this.nameid)
        .then(response => {
          if (response.code === 200) {
            this.list = response.data.rows;
            this.total = response.data.total
          } else if (response.code === 201) {
            alert(response.message)
          }
          this.nameid = {}
          this.listLoading = false;
        })
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    },
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = 'create';
      this.dialogFormVisible = true;
    },
    handleUpdate(row) {
      getObj(row.id)
        .then(response => {
          this.form = response.data;
          this.dialogFormVisible = true;
          this.dialogStatus = 'update';
        });
    },
    handleDelete(row) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delObj(row.id)
            .then(() => {
              this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success',
                duration: 2000
              });
              const index = this.list.indexOf(row);
              this.list.splice(index, 1);
            });
        });
    },
    create(formName) {
      const set = this.$refs;
      set[formName].validate(valid => {
        if (valid) {
          // let form = JSON.stringify(this.form)
          // console.log(JSON.stringify(this.form))
          addObj(this.form)
            .then(response => {
              console.log(response)
              this.dialogFormVisible = false;
              this.getList();
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              });
            })
        } else {
          return false;
        }
      });
    },
    cancel(formName) {
      this.dialogFormVisible = false;
      this.$refs[formName].resetFields();
    },
    update(formName) {
      const set = this.$refs;
      set[formName].validate(valid => {
        if (valid) {
          this.dialogFormVisible = false;
          console.log(this.form)
          putObj(this.form).then(response => {
            console.log(response)
            this.dialogFormVisible = false;
            this.getList();
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            });
          });
        } else {
          return false;
        }
      });
    },
    resetTemp() {
      this.form = {
        hospitalName: undefined,
        address: undefined,
        telPhone: undefined
      };
    }
  }
}
</script>
