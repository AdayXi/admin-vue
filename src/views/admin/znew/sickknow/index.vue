<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-button class="filter-item"
                 type="primary"
                 v-waves
                 icon="search"
                 @click="getList('1')">已识别</el-button>
      <el-button class="filter-item"
                 type="primary"
                 v-waves
                 icon="search"
                 @click="getList('0')">未识别</el-button>
      <!-- 添加按钮 -->
      <el-button class="filter-item"
                 style="margin-left: 10px;"
                 @click="picUpdata"
                 type="primary"><i class="el-icon-upload el-icon--right"></i> 上传</el-button>
    </div>
    <el-table :key='tableKey'
              :data="list"
              v-loading.body="listLoading"
              border
              fit
              highlight-current-row
              @row-click='handleUpdate'
              style="width: 100%">
      <el-table-column align="center"
                       label="序号"
                       width="65"> <template scope="scope">
          <span>{{scope.$index + 1}}</span>
        </template> </el-table-column>
      <el-table-column width="200"
                       align="center"
                       label="姓名"> <template scope="scope">
          <span>{{scope.row.name}}</span>
        </template> </el-table-column>
      <el-table-column width="180"
                       align="center"
                       label="性别"> <template scope="scope">
          <span>{{scope.row.sex === '1'?'男':'女'}}</span>
        </template> </el-table-column>
      <el-table-column width="180"
                       align="center"
                       label="手机号"> <template scope="scope">
          <span>{{scope.row.mobile}}</span>
        </template> </el-table-column>
      <el-table-column width="200"
                       align="center"
                       label="身份证"> <template scope="scope">
          <span>{{scope.row.idcard}}</span>
        </template> </el-table-column>
      <el-table-column width="180"
                       align="center"
                       label="文件ID"> <template scope="scope">
          <span>{{scope.row.cid}}</span>
        </template> </el-table-column>
      <el-table-column width="180"
                       align="center"
                       :show-overflow-tooltip="true"
                       label="图片路径"> <template scope="scope">
          <span>{{scope.row.url}}</span>
        </template> </el-table-column>
      <el-table-column width="100"
                       align="center"
                       :show-overflow-tooltip="true"
                       label="状态"> <template scope="scope">
          <span>{{scope.row.status === '1'?'已通过':'未通过'}}</span>
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
    <div class='aa'>
      <el-dialog :title="textMap[dialogStatus]"
                 :visible.sync="dialogFormVisible"
                 :fullscreen="true">
        <el-upload class="upload-demo"
                   action="https://jsonplaceholder.typicode.com/posts/"
                   :file-list="fileList2"
                   list-type="picture">
        </el-upload>
        <el-form :model="form"
                 ref="form"
                 label-width="100px">
          <el-form-item label="病案号">
            <el-input v-model="form.mr"
                      @blur='blur'
                      placeholder="请输入病案号"></el-input>
          </el-form-item>
          <el-form-item label="识别号">
            <el-input v-model="form.ident"
                      placeholder="请输入识别号"></el-input>
          </el-form-item>
          <el-form-item label="入院次数">
            <el-input v-model="form.beHosp"
                      placeholder="请输入入院次数"></el-input>
          </el-form-item>
          <el-form-item label="健康卡号">
            <el-input v-model="form.healthCard"
                      placeholder="请输入健康卡号"></el-input>
          </el-form-item>
          <el-form-item label="医疗付款方式">
            <el-input v-model="form.payType"
                      placeholder="请输入医疗付款方式"></el-input>
          </el-form-item>
          <el-form-item label="接诊日期">
            <el-date-picker v-model="form.treatDate"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="请选择接诊日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="门诊医生">
            <el-input v-model="form.opDoctor"
                      placeholder="请输入门诊医生"></el-input>
          </el-form-item>
          <el-form-item label="经办人">
            <el-input v-model="form.operator"
                      placeholder="请输入经办人"></el-input>
          </el-form-item>
          <el-form-item label="确诊日期">
            <el-date-picker v-model="form.diagDate"
                            value-format="yyyy-MM-dd"
                            type="date"
                            placeholder="请选择确诊日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="联系人姓名">
            <el-input v-model="form.linkRela"
                      placeholder="请输入联系人姓名"></el-input>
          </el-form-item>
          <el-form-item label="联系人地址">
            <el-input v-model="form.linkAddr"
                      placeholder="请输入联系人地址"></el-input>
          </el-form-item>
          <el-form-item label="联系人电话">
            <el-input v-model="form.linkTel"
                      placeholder="请输入联系人电话"></el-input>
          </el-form-item>
          <el-form-item label="入院途径">
            <el-input v-model="form.beHospWay"
                      placeholder="请输入入院途径"></el-input>
          </el-form-item>
          <el-form-item label="入院科别">
            <el-input v-model="form.beHospDept"
                      placeholder="请输入入院科别"></el-input>
          </el-form-item>
          <el-form-item label="入院时间">
            <el-date-picker v-model="form.beHospDate"
                            value-format="yyyy-MM-dd"
                            type="date"
                            placeholder="请选择入院时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="转院科别">
            <el-input v-model="form.transDept"
                      placeholder="请输入转院科别"></el-input>
          </el-form-item>
          <el-form-item label="转院时间">
            <el-date-picker v-model="form.transDate"
                            value-format="yyyy-MM-dd"
                            type="date"
                            placeholder="请选择转院时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="出院科别">
            <el-input v-model="form.lhDept"
                      placeholder="请输入出院科别"></el-input>
          </el-form-item>
          <el-form-item label="出院时间">
            <el-date-picker v-model="form.lhDate"
                            value-format="yyyy-MM-dd"
                            type="date"
                            placeholder="请选择出院时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="住院天数">
            <el-input v-model="form.bhNum"
                      placeholder="请输入住院天数"></el-input>
          </el-form-item>
          <el-form-item label="门诊诊断">
            <el-input v-model="form.opDia"
                      placeholder="请输入门诊诊断"></el-input>
          </el-form-item>
          <el-form-item label="门诊诊断疾病编码">
            <el-input v-model="form.opDiaCode"
                      placeholder="请输入门诊诊断疾病编码"></el-input>
          </el-form-item>
          <el-form-item label="入院初诊诊断">
            <el-input v-model="form.inDia"
                      placeholder="请输入入院初诊诊断"></el-input>
          </el-form-item>
          <el-form-item label="入院初诊诊断疾病编码">
            <el-input v-model="form.inDiaDisCode"
                      placeholder="请输入入院初诊诊断疾病编码"></el-input>
          </el-form-item>
          <el-form-item label="出院诊断主要诊断">
            <el-input v-model="form.outMainDia"
                      placeholder="请输入出院诊断主要诊断"></el-input>
          </el-form-item>
          <el-form-item label="出院诊断主要诊断确诊日期">
            <el-date-picker v-model="form.outMainDiaDate"
                            value-format="yyyy-MM-dd"
                            type="date"
                            placeholder="请选择出院诊断主要诊断确诊日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="出院诊断主要诊断入院病情">
            <el-input v-model="form.outMainDiaDis"
                      placeholder="请输入出院诊断主要诊断入院病情"></el-input>
          </el-form-item>
          <el-form-item label="出院诊断主要诊断治疗天数">
            <el-input v-model="form.outMainDiaNum"
                      placeholder="请输入出院诊断主要诊断治疗天数"></el-input>
          </el-form-item>
          <el-form-item label="出院诊断主要诊断出院情况">
            <el-input v-model="form.outMainDiaSit"
                      placeholder="请输入出院诊断主要诊断出院情况"></el-input>
          </el-form-item>
          <el-form-item label="出院诊断主要诊断疾病编码">
            <el-input v-model="form.outMainDiaCode"
                      placeholder="请输入出院诊断主要诊断疾病编码"></el-input>
          </el-form-item>
          <el-form-item label="出院诊断其他诊断">
            <el-table :key='tableKey'
                      :data="addlist"
                      v-loading.body="listLoading"
                      border
                      fit
                      highlight-current-row
                      style="width:1000px">
              <el-table-column align="center"
                               label="序号"
                               width='70'> <template scope="scope">
                  <span>{{scope.$index + 1}}</span>
                </template> </el-table-column>
              <el-table-column label="病种名称"
                               width='200'>
                <template scope="scope">
                  <el-input v-model="scope.row.bzName"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="确诊日期"
                               width='200'>
                <template scope="scope">
                  <el-date-picker v-model="scope.row.outOtherDiaDate"
                                  value-format="yyyy-MM-dd"
                                  type="date"
                                  placeholder="请选择确诊日期">
                  </el-date-picker>
                </template>
              </el-table-column>
              <el-table-column label="入院病情"
                               width='200'>
                <template scope="scope">
                  <el-input v-model="scope.row.outOtherDiaDis"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="治疗天数"
                               width='200'>
                <template scope="scope">
                  <el-input v-model="scope.row.outOtherDiaNum"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="出院情况"
                               width='200'>
                <template scope="scope">
                  <el-input v-model="scope.row.outOtherDiaSit"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="疾病编码"
                               width='200'>
                <template scope="scope">
                  <el-input v-model="scope.row.outOtherDiaCode"></el-input>
                </template>
              </el-table-column>
              <el-table-column align="center"
                               label="操作"
                               width='90'> <template scope="scope">
                  <el-button v-if="userManager_btn_del"
                             size="small"
                             type="danger"
                             @click="del(scope.$index)">删除
                  </el-button>
                </template> </el-table-column>
            </el-table>
            <el-button v-if="userManager_btn_edit"
                       size="small"
                       type="success"
                       @click="add()">添加
            </el-button>
          </el-form-item>
          <el-form-item label="病理诊断">
            <el-input v-model="form.pathoDia"
                      placeholder="请输入病理诊断"></el-input>
          </el-form-item>
          <el-form-item label="病理号">
            <el-input v-model="form.pathoCode"
                      placeholder="请输入病理号"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer"
             class="dialog-footer">
          <el-button v-if="dialogStatus=='create'"
                     type="primary"
                     @click="create('form')">提 交</el-button>
          <el-button v-else
                     type="primary"
                     @click="update('form')">提 交</el-button>
          <el-button type="primary"
                     @click="refuse('form')">拒 绝</el-button>
          <el-button @click="cancel('form')">取 消</el-button>
        </div>
      </el-dialog>

    </div>
    <!-- 上传病例 -->
    <el-dialog title="上传"
               :visible.sync="dialogUpdata">
      <!-- 上传组件 -->
      <!-- :on-preview="handlePreview"
                 :on-remove="handleRemove"
                 :file-list="fileList" -->
      <el-upload class="upload-demo"
                 action="api/customer/gdbCaseFile/upload"
                 list-type="picture"
                 multiple
                 ref="upload">
        <el-button size="small"
                   type="primary">点击上传</el-button>
        <div slot="tip"
             class="el-upload__tip">只能上传jpg/png文件</div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import moment from 'moment'
import {
  page,
  addObj,
  getObj,
  delObj
  // putObj
} from 'api/new/sickknow/index';
import { mapGetters } from 'vuex';
export default {
  name: 'user',
  data() {
    return {
      dialogUpdata: false,
      id: undefined,
      nameid: {
      },
      form: {
        treatDate: '',
        diagDate: '',
        beHospDate: '',
        transDate: '',
        lhDate: '',
        outMainDiaDate: ''
      },
      cid: {
        cid: undefined
      },
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        type: 0,
        page: 1,
        limit: 10
      },
      // 其他诊断信息
      addlist: [
        {
          outOtherDiaDate: ''
        }
      ],
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
      fileList2: [{ url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }],
      userId: ''
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
    // 点击上传病例
    picUpdata() {
      if (this.$refs.upload) {
        this.$refs.upload.clearFiles()
      }
      this.dialogUpdata = true
    },
    // mr失去焦点判断是否存在
    blur() {
      this.nameid.mr = this.form.mr
      getObj(this.nameid)
        .then(res => {
          if (res.code === '201') {
            alert(res.message)
          }
        })
    },
    // 其他诊断数据添加
    add() {
      this.addlist.push({})
    },
    // 其他诊断数据删除
    del(row) {
      if (this.addlist.length > 1) {
        this.addlist.splice(row, 1)
      }
    },
    // 获取所有数据
    getList(num = 0) {
      this.listLoading = true;
      this.listQuery.type = num
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
        .then(response => {
          this.list = response.data.rows
          this.total = response.data.total
          this.listLoading = false
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
    // 添加按钮
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = 'create';
      this.dialogFormVisible = true;
    },
    handleUpdate(row) {
      if (row.type === 1) {
        return
      }
      this.userId = row.userId
      this.dialogFormVisible = true
      this.fileList2[0].url = row.url
      this.form.fileId = row.cid
      this.cid.cid = row.cid
    },
    handleDelete(row) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delObj({
            cid: row.id
          })
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
    refuse(formName) {
      const set = this.$refs;
      set[formName].validate(valid => {
        if (valid) {
          this.dialogFormVisible = false;
          delObj(this.cid).then(() => {
            this.dialogFormVisible = false;
            this.getList();
            this.$notify({
              title: '成功',
              message: '操作成功',
              type: 'success',
              duration: 2000
            });
          });
        } else {
          return false;
        }
      });
    },
    update(formName) {
      const set = this.$refs;
      set[formName].validate(valid => {
        if (valid) {
          // this.form.outOtherDia = JSON.stringify(this.addlist)
          this.form.treatDate = this.form.treatDate ? moment(this.form.treatDate).format('YYYY-MM-DD') : ''
          this.form.diagDate = this.form.diagDate ? moment(this.form.diagDate).format('YYYY-MM-DD') : ''
          this.form.beHospDate = this.form.beHospDate ? moment(this.form.beHospDate).format('YYYY-MM-DD') : ''
          this.form.transDate = this.form.transDate ? moment(this.form.transDate).format('YYYY-MM-DD') : ''
          this.form.lhDate = this.form.lhDate ? moment(this.form.lhDate).format('YYYY-MM-DD') : ''
          this.form.outMainDiaDate = this.form.outMainDiaDate ? moment(this.form.outMainDiaDate).format('YYYY-MM-DD') : ''
          this.form.patientId = this.userId
          if (!this.form.mr) {
            this.$notify({
              title: '失败',
              message: '病案号不能为空',
              type: 'error',
              duration: 2000
            });
            return
          }
          addObj(this.form).then(res => {
            if (res.code === '204') {
              this.$notify({
                title: '失败',
                message: '病案号已存在',
                type: 'error',
                duration: 2000
              });
              return
            }
            this.dialogFormVisible = false;
            this.getList();
            this.$notify({
              title: '成功',
              message: '提交成功',
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
        id: 0,
        name: '',
        price: 0,
        desc: '',
        reserve: ''

      };
    }
  }
}
</script>
<style>
.el-dialog__body {
  display: -webkit-box;
  display: box;
  display: -webkit-flex;
  display: flex;
}
.aa .el-dialog {
  top: 0px !important;
  margin: 0;
  width: 100%;
}
.upload-demo {
  width: 50%;
}
.el-form {
  width: 50%;
}
.aa .upload-demo a,
.aa .upload-demo label {
  display: none !important;
}
.aa .el-upload-list--picture .el-upload-list__item-thumbnail {
  margin-left: 0 !important;
  height: 100% !important;
}
.aa ul.el-upload-list--picture {
  position: fixed !important;
  top: 0 !important;
  left: 4px !important;
  width: 46%;
  height: 100vh;
}
.aa li.el-upload-list__item {
  width: 100% !important;
  height: 100% !important;
  padding: 0 !important;
  margin: 0 !important;
}
.aa li.el-upload-list__item img {
  width: 100%;
}
.aa .el-upload-list {
  margin-top: -15px !important;
}
</style>

