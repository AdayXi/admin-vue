<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter"
                style="width: 200px;"
                class="filter-item"
                placeholder="请输入药物名称"
                v-model="nameid.drugName"> </el-input>
      <el-button class="filter-item"
                 type="primary"
                 v-waves
                 icon="search"
                 @click="handleFilter()">搜索</el-button>
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
      <el-table-column width="180"
                       align="center"
                       label="药物名称"> <template scope="scope">
          <span>{{scope.row.drugName}}</span>
        </template> </el-table-column>
      <el-table-column width="200"
                       align="center"
                       label="使用方法"> <template scope="scope">
          <span>{{scope.row.useMethod}}</span>
        </template> </el-table-column>
      <el-table-column width="200"
                       align="center"
                       label="启用"> <template scope="scope">
          <span>{{scope.row.enabled}}</span>
        </template> </el-table-column>
      <el-table-column width="180"
                       align="center"
                       label="开始时间"> <template scope="scope">
          <span>{{scope.row.startDate}}</span>
        </template> </el-table-column>
      <el-table-column width="180"
                       align="center"
                       label="截至时间"> <template scope="scope">
          <span>{{scope.row.endDate}}</span>
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
        <el-form-item label="使用方法"
                      prop="mr">
          <el-input v-model="form.useMethod"
                    placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="药物名称"
                      prop="address">
          <el-input v-model="form.drugName"
                    placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="开始时间"
                      prop="telPhone">
          <el-input v-model="form.startDate"
                    placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="截至时间"
                      prop="telPhone">
          <el-input v-model="form.endDate"
                    placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="使用时间"
                      prop="telPhone">
          <el-input v-model="form.使用时间"
                    placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="包装规格"
                      prop="telPhone">
          <el-input v-model="form.spec"
                    placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="规格"
                      prop="telPhone">
          <el-input v-model="form.signoDosage"
                    placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="使用方法"
                      prop="telPhone">
          <el-input v-model="form.administration"
                    placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="使用方式"
                      prop="telPhone">
          <el-input v-model="form.frequency"
                    placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="总数量"
                      prop="telPhone">
          <el-input v-model="form.total"
                    placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="计量"
                      prop="telPhone">
          <el-input v-model="form.unit"
                    placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="药品厂商"
                      prop="telPhone">
          <el-input v-model="form.factory"
                    placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="其他使用时间"
                      prop="telPhone">
          <el-input v-model="form.otherUseTime"
                    placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="入院途径"
                      prop="telPhone">
          <el-input v-model="form.beHospWay"
                    placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="入院科别"
                      prop="telPhone">
          <el-input v-model="form.beHospDept"
                    placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="入院时间"
                      prop="telPhone">
          <el-input v-model="form.beHospDate"
                    placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="转院科别"
                      prop="telPhone">
          <el-input v-model="form.transDept"
                    placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="转院时间"
                      prop="telPhone">
          <el-input v-model="form.transDate"
                    placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="出院科别"
                      prop="telPhone">
          <el-input v-model="form.lhDept"
                    placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="出院时间"
                      prop="telPhone">
          <el-input v-model="form.lhDate"
                    placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="住院天数"
                      prop="telPhone">
          <el-input v-model="form.bhNum"
                    placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="门诊诊断"
                      prop="telPhone">
          <el-input v-model="form.opDia"
                    placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="门诊诊断疾病编码"
                      prop="telPhone">
          <el-input v-model="form.opDiaCode"
                    placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="入院初诊诊断"
                      prop="telPhone">
          <el-input v-model="form.inDia"
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
} from 'api/new/patient/durgdata/index';
import { mapGetters } from 'vuex';
export default {
  name: 'user',
  data() {
    return {
      id: undefined,
      nameid: {
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
          this.list = response.data.data.rows;
          this.total = response.data.data.total;
          this.listLoading = false;
        })
    },
    handleFilter() {
      this.listLoading = true;
      if (!this.nameid.drugName) {
        this.nameid = {}
      }
      page(this.nameid)
        .then(response => {
          if (response.code === '200') {
            this.list = response.data.data.rows;
            this.total = response.data.data.total;
          } else if (response.code === '201') {
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
