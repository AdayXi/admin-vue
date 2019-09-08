<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter"
                style="width: 200px;"
                class="filter-item"
                placeholder="病人姓名"
                v-model="listQuery.name"> </el-input>
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
          <span>{{scope.$index+1}}</span>
        </template> </el-table-column>
      <el-table-column width="200"
                       align="center"
                       label="样本编号"> <template scope="scope">
          <span>{{scope.row.yhdmId}}</span>
        </template> </el-table-column>
      <el-table-column width="110"
                       align="center"
                       label="受理日期"> <template scope="scope">
          <span>{{scope.row.updTime}}</span>
        </template> </el-table-column>
      <el-table-column width="110"
                       align="center"
                       label="病人姓名"> <template scope="scope">
          <span>{{scope.row.name}}</span>
        </template> </el-table-column>
      <el-table-column align="center"
                       label="性别"> <template scope="scope">
          <span>{{scope.row.sex === '1'?'男':'女'}}</span>
        </template> </el-table-column>
      <el-table-column align="center"
                       label="年龄"> <template scope="scope">
          <span>{{scope.row.age}}</span>
        </template> </el-table-column>
      <el-table-column width='100'
                       align="center"
                       label="临床诊断"> <template scope="scope">
          <span>{{scope.row.jcr}}</span>
        </template> </el-table-column>
      <el-table-column align="center"
                       label="项目"> <template scope="scope">
          <span>{{scope.row.project}}</span>
        </template> </el-table-column>
      <el-table-column width='150'
                       align="center"
                       label="药物"> <template scope="scope">
          <span>{{scope.row.medicine}}</span>
        </template> </el-table-column>
      <el-table-column width='150'
                       align="center"
                       label="位点"> <template scope="scope">
          <span>{{scope.row.bit}}</span>
        </template> </el-table-column>
      <el-table-column align="center"
                       label="结果"> <template scope="scope">
          <span>{{scope.row.result}}</span>
        </template> </el-table-column>
      <el-table-column width='200'
                       align="center"
                       label="创建时间"> <template scope="scope">
          <span>{{scope.row.crtTime}}</span>
        </template> </el-table-column>
    </el-table>
    <div v-show="!listLoading"
         class="pagination-container">
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page.sync="listQuery.page"
                     :page-sizes="[10,20,30, 50]"
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
  // delObj,
  putObj
} from 'api/admin/sample/index';
import { mapGetters } from 'vuex';
export default {
  name: 'user',
  data() {
    return {
      form: {
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入用户',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 20,
            message: '长度在 3 到 20 个字符',
            trigger: 'blur'
          }
        ],
        username: [
          {
            required: true,
            message: '请输入账户',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 20,
            message: '长度在 3 到 20 个字符',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            min: 5,
            max: 20,
            message: '长度在 5 到 20 个字符',
            trigger: 'blur'
          }
        ]
      },
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        name: undefined
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
      page(this.listQuery)
        .then(response => {
          console.log(response)
          this.list = response.data.rows;
          this.total = response.data.total;
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
    create(formName) {
      const set = this.$refs;
      set[formName].validate(valid => {
        if (valid) {
          addObj(this.form)
            .then(() => {
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
          this.form.password = undefined;
          putObj(this.form.id, this.form).then(() => {
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
      };
    }
  }
}
</script>
