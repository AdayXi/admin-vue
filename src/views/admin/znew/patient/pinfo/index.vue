<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter"
                style="width: 200px;"
                class="filter-item"
                placeholder="请输入患者姓名"
                v-model="id"> </el-input>
      <el-button class="filter-item"
                 type="primary"
                 v-waves
                 icon="search"
                 @click="handleFilter(id)">搜索</el-button>
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
                       label="患者姓名"> <template scope="scope">
          <span>{{scope.row.name}}</span>
        </template> </el-table-column>
      <el-table-column width="200"
                       align="center"
                       label="用户昵称"> <template scope="scope">
          <span>{{scope.row.username}}</span>
        </template> </el-table-column>
      <el-table-column width="180"
                       align="center"
                       label="性别"> <template scope="scope">
          <span>{{scope.row.sex==1?'男':'女'}}</span>
        </template> </el-table-column>
      <el-table-column width="180"
                       align="center"
                       label="联系方式"> <template scope="scope">
          <span>{{scope.row.mobile}}</span>
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
      <el-table-column align="center"
                       label="操作"
                       width="150"> <template scope="scope">
          <el-button v-if="userManager_btn_edit"
                     size="small"
                     type="success"
                     @click="handleUpdate(scope.row)">查看详情
          </el-button>
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
    <el-dialog title="列表详情"
               :visible.sync="dialogFormVisible">
      <el-form :model="form"
               ref="form"
               label-width="100px">
        <el-form-item label="用户昵称"
                      prop="username">
          <el-input v-model="form.username"
                    placeholder="请输入用户昵称"></el-input>
        </el-form-item>
        <el-form-item label="患者姓名"
                      prop="address">
          <el-input v-model="form.name"
                    placeholder="请输入患者姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别"
                      prop="telPhone">
          <el-input v-model="form.sex"
                    placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="患者联系方式"
                      prop="telPhone">
          <el-input v-model="form.mobile"
                    placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="固定电话"
                      prop="telPhone">
          <el-input v-model="form.telPhone"
                    placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="邮箱"
                      prop="telPhone">
          <el-input v-model="form.email"
                    placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="年龄"
                      prop="telPhone">
          <el-input v-model="form.age"
                    placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="生日"
                      prop="telPhone">
          <el-input v-model="form.birthday"
                    placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="身份证号"
                      prop="telPhone">
          <el-input v-model="form.idcard"
                    placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="民族"
                      prop="telPhone">
          <el-input v-model="form.nation"
                    placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="出生地"
                      prop="telPhone">
          <el-input v-model="form.birthplace"
                    placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="现居住地"
                      prop="telPhone">
          <el-input v-model="form.address"
                    placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="所属医院id"
                      prop="telPhone">
          <el-input v-model="form.hospitalId"
                    placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="患者联系人关系"
                      prop="telPhone">
          <el-input v-model="form.patientRel"
                    placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="患者联系人姓名"
                      prop="telPhone">
          <el-input v-model="form.patientRelname"
                    placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="患者联系人的联系方式"
                      prop="telPhone">
          <el-input v-model="form.patientRelphone"
                    placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="医保卡"
                      prop="telPhone">
          <el-input v-model="form.yibaoka"
                    placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="步骤标识"
                      prop="telPhone">
          <el-input v-model="form.step"
                    placeholder=""></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="cancel('form')">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  page,
  addObj,
  getObj,
  delObj,
  putObj
} from 'api/new/patient/pinfo/index';
import { mapGetters } from 'vuex';
export default {
  name: 'user',
  data() {
    return {
      id: undefined,
      nameid: {
        // name: undefined
      },
      form: {
        hospitalName: undefined,
        address: undefined,
        telPhone: undefined
      },

      list: null,
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
          this.list = response.data.rows;
          this.total = response.data.total;
          this.listLoading = false;
        })
    },
    handleFilter(obj) {
      this.listLoading = true;
      const reg = /^[0-9]*$/
      if (reg.test(obj)) {
        this.nameid.mobile = obj
      } else {
        this.nameid.name = obj
      }
      if (!this.nameid.mobile && !this.nameid.name) {
        this.nameid = {}
      }
      page(this.nameid)
        .then(response => {
          if (response.code === 200) {
            this.list = response.data.rows;
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
          console.log(response)
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
