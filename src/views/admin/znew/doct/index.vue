<template>
  <div class="app-container calendar-list-container">
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
      <el-button class="filter-item"
                 v-if="userManager_btn_add"
                 style="margin-left: 10px;"
                 @click="handleCreate"
                 type="primary"
                 icon="edit">添加</el-button>
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
      <el-table-column width="100"
                       align="center"
                       label="医生姓名"> <template scope="scope">
          <span>{{scope.row.name}}</span>
        </template> </el-table-column>
      <el-table-column width="100"
                       align="center"
                       label="医生性别"> <template scope="scope">
          <span>{{scope.row.sex == 1?'男':'女'}}</span>
        </template> </el-table-column>
      <el-table-column width="180"
                       align="center"
                       label="身份证号"> <template scope="scope">
          <span>{{scope.row.idCard}}</span>
        </template> </el-table-column>
      <el-table-column width="180"
                       align="center"
                       label="手机号"> <template scope="scope">
          <span>{{scope.row.mobile}}</span>
        </template> </el-table-column>
      <el-table-column width="180"
                       align="center"
                       label="渠道类型"> <template scope="scope">
          <span>{{scope.row.chanName}}</span>
        </template> </el-table-column>
      <el-table-column width="180"
                       align="center"
                       label="固定电话"> <template scope="scope">
          <span>{{scope.row.telPhone}}</span>
        </template> </el-table-column>
      <el-table-column width="180"
                       align="center"
                       label="所属医院"> <template scope="scope">
          <span>{{scope.row.hospitalName}}</span>
        </template> </el-table-column>
      <el-table-column width="180"
                       align="center"
                       label="所属科室"> <template scope="scope">
          <span>{{scope.row.deptName}}</span>
        </template> </el-table-column>
      <el-table-column width="180"
                       align="center"
                       label="邀请连接二维码"> <template scope="scope">
          <span>{{scope.row.qrCode}}</span>
        </template> </el-table-column>
      <el-table-column width="180"
                       align="center"
                       label="邀请码"> <template scope="scope">
          <span>{{scope.row.invitationCode}}</span>
        </template> </el-table-column>
      <el-table-column width="180"
                       align="center"
                       label="居住地"> <template scope="scope">
          <span>{{scope.row.address}}</span>
        </template> </el-table-column>
      <el-table-column width="180"
                       align="center"
                       label="出生地"> <template scope="scope">
          <span>{{scope.row.birthplace}}</span>
        </template> </el-table-column>
      <el-table-column width="180"
                       align="center"
                       label="职称"> <template scope="scope">
          <span>{{scope.row.title}}</span>
        </template> </el-table-column>
      <el-table-column width="180"
                       align="center"
                       label="创建时间"> <template scope="scope">
          <span>{{scope.row.crtTime}}</span>
        </template> </el-table-column>
      <el-table-column width="180"
                       align="center"
                       label="更新时间"> <template scope="scope">
          <span>{{scope.row.updTime}}</span>
        </template> </el-table-column>
      <el-table-column align="center"
                       label="操作"
                       width="150"> <template scope="scope">
          <el-button v-if="userManager_btn_edit"
                     size="small"
                     type="success"
                     @click="handleUpdate(scope.row)">编辑
          </el-button>
          <el-button v-if="userManager_btn_del"
                     size="small"
                     type="danger"
                     @click="handleDelete(scope.row)">删除
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
    <el-dialog :title="textMap[dialogStatus]"
               :visible.sync="dialogFormVisible">
      <el-form :model="form"
               :rules="rules"
               ref="form"
               label-width="100px">
        <el-form-item label="医生姓名"
                      prop="name">
          <el-input v-model.trim="form.name"
                    placeholder="请输入医生姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别"
                      prop="sex">
          <template>
            <el-radio-group v-model="radio"
                            @change='radioChange'>
              <el-radio :label="0">女</el-radio>
              <el-radio :label="1">男</el-radio>
            </el-radio-group>
          </template>
        </el-form-item>
        <el-form-item label="身份证号"
                      prop="idCard">
          <el-input v-model="form.idCard"
                    placeholder="请输入身份证号"></el-input>
        </el-form-item>
        <el-form-item label="手机号码"
                      prop="mobile">
          <el-input v-model="form.mobile"
                    placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item label="所属医院"
                      prop="hospitalName">
          <el-select v-model="form.hospitalName"
                     @change="id1"
                     placeholder="请选择">
            <el-option v-for="item in doctorall"
                       :key='item.id'
                       :label="item.hospitalId"
                       :value="item.hospitalName">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属渠道"
                      prop="chanName">
          <el-select v-model="form.chanName"
                     @change="id2"
                     placeholder="请选择">
            <el-option v-for="item in channel"
                       :key='item.id'
                       :label="item.chanid"
                       :value="item.chanName">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属科室"
                      prop="deptName">
          <el-select v-model="form.deptName"
                     @change="id3"
                     placeholder="请选择">
            <el-option v-for="item in dept"
                       :key='item.id'
                       :label="item.deptid"
                       :value="item.deptName">
            </el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="cancel('form')">取 消</el-button>
        <el-button v-if="dialogStatus=='create'"
                   type="primary"
                   @click="create('form')">确 定</el-button>
        <el-button v-else
                   type="primary"
                   @click="update('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  page,
  addObj,
  // getObj,
  delObj,
  putObj
} from 'api/new/doct/index';

import {
  doctor,
  channel,
  dept
} from 'api/new/store/index';
import { mapGetters } from 'vuex';
export default {
  name: 'user',
  data() {
    const validatePhone = (rule, value, callback) => {
      if (/^1[34578]{1}\d{9}$/.test(value) === false) {
        callback(new Error('请输入正确的手机号'));
      } else {
        callback();
      }
    }
    const validateIdcard = (rule, value, callback) => {
      if (/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value) === false) {
        callback(new Error('请输入正确的身份证号码'));
      } else {
        callback();
      }
    }
    return {
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 4, message: '长度在 2 到 4 个字符', trigger: 'blur' }
        ],
        idCard: [
          { required: true, message: '请输入身份证', trigger: 'blur' },
          { validator: validateIdcard, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: validatePhone, trigger: 'blur' }
        ],
        hospitalName: [
          { required: true, message: '请选择所属医院', trigger: 'change' }
        ],
        chanName: [
          { required: true, message: '请选择所属渠道', trigger: 'change' }
        ],
        deptName: [
          { required: true, message: '请选择所属科室', trigger: 'change' }
        ]
      },
      nameid: {
        hospitalName: undefined
      },
      radio: 0,
      form: {
        name: '',
        sex: 0,
        idCard: '',
        mobile: '',
        hospitalName: '',
        chanName: '',
        deptName: ''
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
      tableKey: 0,
      doctorall: [],
      channel: [],
      dept: []
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
    id1(a) {
      let obj = {};
      obj = this.doctorall.find(item => item.hospitalName === a);
      this.form.hospitalName = obj.hospitalName
      this.form.hospitalId = obj.id
    },
    id2(a) {
      let obj = {};
      obj = this.channel.find(item => item.chanName === a);
      this.form.chanName = obj.chanName
      this.form.chanid = obj.id
    },
    id3(a) {
      let obj = {};
      obj = this.dept.find(item => item.deptName === a);
      this.form.deptName = obj.deptName
      this.form.deptid = obj.id
    },
    get() {
      doctor(this.listQuery)
        .then(res => {
          this.doctorall = res.data.rows
          // console.log(this.doctorall)
        })
      channel(this.listQuery)
        .then(res => {
          this.channel = res.data.rows
          // console.log(data)
        })
      dept(this.listQuery)
        .then(res => {
          this.dept = res.data.rows
          // console.log(data)
        })
    },
    radioChange(e) {
      // console.log(this.form)
      this.form.sex = e
      console.log(this.form.sex)
    },
    getList() {
      this.listLoading = true;
      page(this.listQuery)
        .then(res => {
          this.list = res.data.rows;
          this.total = res.data.total;
          this.listLoading = false;
        })
    },
    handleFilter(obj) {
      this.listLoading = true;
      const reg = /^[0-9]*$/
      if (reg.test(obj)) {
        this.listQuery.mobild = obj
        this.listQuery.name = undefined
      } else {
        this.listQuery.name = obj
        this.listQuery.mobild = undefined
      }
      page(this.listQuery)
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
      this.dialogFormVisible = true
      this.dialogStatus = 'update'
      this.form = row
    },
    handleDelete(row) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delObj({ id: row.id })
            .then(() => {
              this.getList()
              this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success',
                duration: 2000
              });
              // const index = this.list.indexOf(row);
              // this.list.splice(index, 1);
            });
        });
    },
    create(formName) {
      const set = this.$refs;
      set[formName].validate(valid => {
        if (valid) {
          this.listLoading = true;
          addObj(this.form)
            .then(res => {
              this.listLoading = false;
              if (res.code === '200') {
                this.$notify({
                  title: '成功',
                  message: '创建成功',
                  type: 'success',
                  duration: 2000
                });
                this.dialogFormVisible = false
                this.getList()
                return
              }
              this.$notify({
                title: '失败',
                message: res.message,
                type: 'error',
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
          putObj(this.form).then(() => {
            this.dialogFormVisible = false;
            this.getList();
            this.$notify({
              title: '成功',
              message: '编辑成功',
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
        name: '',
        idCard: '',
        mobile: '',
        sex: 0,
        hospitalName: '',
        chanName: '',
        deptName: ''
      };
    }
  },
  mounted() {
    this.get()
  }
}
</script>
