<template>
  <div class="app-container calendar-list-container">
    <div style='margin-bottom:10px;display:flex'>
      <div>
        主课题 <el-input v-model="listAll.mainTopicName"
                  style='width:140px;margin-right:30px;'
                  disabled
                  placeholder="请输入内容"></el-input>
      </div>
      <div>
        子课题 <el-input v-model="listAll.subTopicName"
                  style='width:140px;margin-right:30px;'
                  disabled
                  placeholder="请输入内容"></el-input>
      </div>
      <div>
        药物/病种 <el-input v-model="listAll.medicine"
                  style='width:140px;margin-right:30px;'
                  disabled
                  placeholder="请输入内容"></el-input>
      </div>
      <div>
        <el-form :model="listQuery"
                 style='display:flex;'>
          <el-form-item label="基因选择"
                        style='display:flex'>
            <el-select v-model="listQuery.geneId"
                       style='width:140px;margin-right:30px;'
                       placeholder="请选择"
                       @visible-change='geneChange'
                       @change='optionGeneChange'
                       :loading="loading">
              <el-option v-for="item in geneSelect"
                         :key='item.id'
                         :label="item.gene"
                         :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-form :model="listQuery"
                 style='display:flex;'>
          <el-form-item label="位点选择"
                        style='display:flex'>
            <el-select v-model="listQuery.locusId"
                       style='width:140px;'
                       :no-data-text='SpotText'
                       placeholder="请选择"
                       @change='optionSpotChange'>
              <el-option v-for="item in spotSelect"
                         :key='item.id'
                         :label="item.rsid"
                         :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-table :key='tableKey'
              :data="list"
              v-loading.body="listLoading"
              border
              fit
              :empty-text="text"
              highlight-current-row>
      <el-table-column align="center"
                       label="序号"
                       width="65"> <template scope="scope">
          <span>{{scope.$index + 1}}</span>
        </template> </el-table-column>
      <el-table-column width="170"
                       align="center"
                       label="基因型"> <template scope="scope">
          <span>{{scope.row.gentype}}</span>
        </template> </el-table-column>
      <el-table-column width="170"
                       align="center"
                       label="PharmGkb用药建议"> <template scope="scope">
          <span>{{scope.row.pharmgkbM}}</span>
        </template> </el-table-column>
      <el-table-column width="180"
                       align="center"
                       label="三济基因型"> <template scope="scope">
          <span>{{scope.row.locusImp}}</span>
        </template> </el-table-column>
      <el-table-column width="180"
                       align="center"
                       label="三济用药建议(新版)"> <template scope="scope">
          <span>{{scope.row.sjGeneType}}</span>
        </template> </el-table-column>
      <el-table-column width="180"
                       align="center"
                       label="位点结果影响"> <template scope="scope">
          <span>{{scope.row.sjSuggest}}</span>
        </template> </el-table-column>
      <el-table-column width="180"
                       align="center"
                       label="创建时间"> <template scope="scope">
          <span>{{scope.row.crtTime | dateformat}}</span>
        </template> </el-table-column>
      <el-table-column width="180"
                       align="center"
                       label="修改时间"> <template scope="scope">
          <span>{{scope.row.updTime | dateformat}}</span>
        </template> </el-table-column>
      <el-table-column align="center"
                       label="操作"
                       width="150"> <template scope="scope">
          <el-button size="small"
                     type="success"
                     @click="handleUpdate(scope.row)">编辑
          </el-button>
          <el-button size="small"
                     type="danger"
                     @click="handleDelete(scope.row)">删除
          </el-button>
        </template> </el-table-column>
    </el-table>
    <div style='display:flex;'>
      <el-form :model="form"
               :rules="rules"
               ref="form"
               style='display:flex;margin-top:10px;flex-flow:row wrap'>
        <el-form-item label="基因型"
                      prop="gentype"
                      style='display:flex'>
          <el-input v-model="form.gentype"
                    :disabled="editOpen"
                    style='width:160px;margin-right:30px;'
                    placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="PharmGkb用药建议"
                      width='100px;'
                      prop="pharmgkbM"
                      style='display:flex'>
          <el-input v-model="form.pharmgkbM"
                    style='width:160px;margin-right:30px;'
                    placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="三济基因型"
                      width='100px;'
                      prop="locusImp"
                      style='display:flex'>
          <el-input v-model="form.locusImp"
                    :disabled="editOpen"
                    style='width:160px;margin-right:30px;'
                    placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="三济用药建议(新版)"
                      width='100px;'
                      prop="sjGeneType"
                      style='display:flex'>
          <el-input v-model="form.sjGeneType"
                    :disabled="editOpen"
                    style='width:160px;margin-right:30px;'
                    placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="位点结果影响"
                      width='100px;'
                      prop="sjSuggest"
                      style='display:flex'>
          <el-input v-model="form.sjSuggest"
                    :disabled="editOpen"
                    style='width:160px;'
                    placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label=""
                      width='100px;'
                      prop="pharmgkbV"
                      style='display:flex'>
          <div>
            <el-button v-if="dialogStatus !== 'update'"
                       style="margin-left: 50px;"
                       @click="handleCreate('form')"
                       type="primary"
                       icon="edit">添加</el-button>
            <el-button v-else
                       style="margin-left: 50px;"
                       @click="update('form')"
                       type="success"
                       icon="edit">编辑</el-button>
            <el-button v-if="dialogStatus === 'update'"
                       style="margin-left: 50px;"
                       @click="handle"
                       type="success"
                       plain>取消编辑</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {
  page,
  getObjGene,
  getObjSpot,
  addObj,
  putObj,
  delObj
} from 'api/new/topic/top/subResult';
import { mapGetters } from 'vuex';
export default {
  props: ['num'],
  data() {
    return {
      rules: {
        gentype: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        pharmgkbM: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        locusImp: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        sjGeneType: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        sjSuggest: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ]
      },
      loading: false,
      id: undefined,
      nameid: {},
      setAdmin: {},
      form: {
        gentype: '',
        pharmgkbM: '',
        locusImp: '',
        sjGeneType: '',
        sjSuggest: ''
      },
      edit: {},
      updataform: {},
      topic: null,
      list: null,
      listAll: {},
      geneSelect: null,
      spotSelect: null,
      total: null,
      listLoading: false,
      listQuery: {
        subTopicId: '',
        geneId: '',
        locusId: ''

      },
      listQueryAll: {
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
      text: '请在右上角选择基因和位点查看数据',
      SpotText: '先选择基因',
      editOpen: false
    }
  },
  created() {
    this.getList(this.num);
    this.userManager_btn_edit = this.elements['userManager:btn_edit'];
    this.userManager_btn_del = this.elements['userManager:btn_del'];
    this.userManager_btn_add = this.elements['userManager:btn_add'];
  },
  computed: {
    ...mapGetters([
      'elements'
    ])
  },
  watch: {
    num(newVal) {
      this.listQuery.geneId = ''
      this.listQuery.locusId = ''
      this.form.locusId = ''
      this.list = null
      this.text = '请在右上角选择基因和位点查看数据'
      this.getList(newVal)
      this.listAll = newVal
    }
  },
  methods: {
    getList(obj) {
      this.listAll = obj
      this.listQuery.subTopicId = obj.id
      if (!this.listQuery.locusId) {
        return false
      }
      this.listLoading = true
      page(this.listQuery)
        .then(res => {
          if (res.code === '200') {
            this.list = res.data
            if (!this.list.length) {
              this.text = '没有数据'
            }
          }
          this.listLoading = false
        })
    },
    handleFilter() {
      this.listLoading = true;
      for (const key in this.listQueryAll) {
        if (this.listQueryAll[key]) {
          this.listQuery[key] = this.listQueryAll[key]
        } else {
          delete this.listQuery[key]
        }
      }
      page(this.listQuery)
        .then(res => {
          this.list = res.data.data.rows
          this.total = res.data.data.total
          this.listLoading = false;
        })
    },
    handleCreate(formName) {
      this.form.subTopicId = this.listAll.id
      if (!this.form.locusId) {
        alert('请在右上角选择位点进行添加')
        return
      }
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          addObj(this.form).then(() => {
            this.getList(this.listAll)
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
            this.empty()
          })
        } else {
          return false
        }
      })
    },
    handleUpdate(row) {
      this.dialogStatus = 'update'
      this.form.subTopicId = this.listAll.id
      this.form.gentype = row.gentype
      this.form.pharmgkbM = row.pharmgkbM
      this.form.locusImp = row.locusImp
      this.form.sjGeneType = row.sjGeneType
      this.form.sjSuggest = row.sjSuggest
      this.edit.id = row.id
    },
    update(formName) {
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          this.edit.gentype = this.form.gentype
          this.edit.pharmgkbM = this.form.pharmgkbM
          this.edit.locusImp = this.form.locusImp
          this.edit.sjGeneType = this.form.sjGeneType
          this.edit.sjSuggest = this.form.sjSuggest
          putObj(this.edit).then(() => {
            this.getList(this.listAll)
            this.handle()
            this.$notify({
              title: '成功',
              message: '编辑成功',
              type: 'success',
              duration: 2000
            })
          })
        } else {
          return false
        }
      })
    },
    handle() {
      this.editOpen = false
      this.dialogStatus = ''
      this.empty()
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
              this.getList(this.listAll)
            });
        });
    },
    cancel(formName) {
      this.dialogFormVisible = false;
      this.$refs[formName].resetFields();
    },
    geneChange(open) {
      if (open) {
        this.loading = true
        getObjGene(this.listAll.id)
          .then(res => {
            if (res.code === '200') {
              this.geneSelect = res.data
              this.loading = false
            }
          })
      }
    },
    optionGeneChange(id) {
      this.listQuery.locusId = ''
      this.form.locusId = ''
      getObjSpot({
        subTopicId: this.listAll.id,
        geneId: id
      })
        .then(res => {
          if (res.code === '200') {
            this.spotSelect = res.data
            if (!res.data.length) {
              this.SpotText = '无数据'
            }
          }
        })
      this.handle()
    },
    optionSpotChange() {
      this.form.geneId = this.listQuery.geneId
      this.form.locusId = this.listQuery.locusId
      this.getList(this.listAll)
    },
    empty() {
      this.form.gentype = ''
      this.form.pharmgkbM = ''
      this.form.locusImp = ''
      this.form.sjGeneType = ''
      this.form.sjSuggest = ''
    }
  }
}
</script>
