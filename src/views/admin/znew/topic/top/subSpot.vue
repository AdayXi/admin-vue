<template>
  <div class="app-container calendar-list-container">
    <div style='margin-bottom:10px;display:flex'>
      <div>
        主课题 <el-input v-model="listAll.mainTopicName"
                  style='width:140px;margin-right:50px;'
                  disabled
                  placeholder="请输入内容"></el-input>
      </div>
      <div>
        子课题 <el-input v-model="listAll.subTopicName"
                  style='width:140px;margin-right:50px;'
                  disabled
                  placeholder="请输入内容"></el-input>
      </div>
      <div>
        药物/病种 <el-input v-model="listAll.medicine"
                  style='width:140px;margin-right:50px;'
                  disabled
                  placeholder="请输入内容"></el-input>
      </div>
      <div>
        <el-form :model="form"
                 :rules="rules"
                 ref="form"
                 style='display:flex;'>
          <el-form-item label="基因选择"
                        style='display:flex'
                        prop="geneId">
            <el-select v-model="form.geneId"
                       style='width:140px;'
                       placeholder="请选择"
                       @visible-change='change'
                       @change='optionChange'
                       :loading="loading">
              <el-option v-for="item in listSelect"
                         :key='item.id'
                         :label="item.gene"
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
      <el-table-column width="200"
                       align="center"
                       label="RSID"> <template scope="scope">
          <span>{{scope.row.rsid}}</span>
        </template> </el-table-column>
      <el-table-column width="180"
                       align="center"
                       label="位点"> <template scope="scope">
          <span>{{scope.row.geneLocus}}</span>
        </template> </el-table-column>
      <el-table-column width="180"
                       align="center"
                       label="PharmGkb循证等级"> <template scope="scope">
          <span>{{scope.row.pharmgkbV}}</span>
        </template> </el-table-column>
      <el-table-column width="180"
                       align="center"
                       label="创建时间"> <template scope="scope">
          <span>{{scope.row.crtTime}}</span>
        </template> </el-table-column>
      <el-table-column width="180"
                       align="center"
                       label="修改时间"> <template scope="scope">
          <span>{{scope.row.updTime}}</span>
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
    <div style='display:flex'>
      <el-form :model="form"
               :rules="rules"
               ref="form"
               style='display:flex;margin-top:10px;'>
        <el-form-item label="RSID"
                      prop="rsid"
                      style='display:flex'>
          <el-input v-model="form.rsid"
                    :disabled="editOpen"
                    style='width:160px;margin-right:30px;'
                    placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="位点"
                      width='100px;'
                      prop="geneLocus"
                      style='display:flex'>
          <el-input v-model="form.geneLocus"
                    style='width:160px;margin-right:30px;'
                    placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="PharmGkb循证等级"
                      width='100px;'
                      prop="pharmgkbV"
                      style='display:flex'>
          <el-input v-model="form.pharmgkbV"
                    :disabled="editOpen"
                    style='width:160px;'
                    placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <div>
        <el-button v-if="dialogStatus !== 'update'"
                   style="margin-left: 50px;margin-top:10px;"
                   @click="handleCreate('form')"
                   type="primary"
                   icon="edit">添加</el-button>
        <el-button v-else
                   style="margin-left: 50px;margin-top:10px;"
                   @click="update('form')"
                   type="success"
                   icon="edit">编辑</el-button>
        <el-button v-if="dialogStatus === 'update'"
                   style="margin-left: 50px;margin-top:10px;"
                   @click="handle"
                   type="success"
                   plain>取消编辑</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  page,
  getObj,
  addObj,
  putObj,
  delObj
} from 'api/new/topic/top/subSpot';
import { mapGetters } from 'vuex';
export default {
  props: ['num'],
  data() {
    return {
      rules: {
        rsid: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        geneLocus: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        pharmgkbV: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ]
      },
      loading: false,
      id: undefined,
      nameid: {},
      setAdmin: {},
      form: {
        geneId: '',
        rsid: '',
        geneLocus: '',
        pharmgkbV: ''
      },
      edit: {},
      updataform: {},
      topic: null,
      list: null,
      listAll: {},
      listSelect: null,
      total: null,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 10
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
      text: '请在右上角选择基因查看数据',
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
      this.form.geneId = ''
      this.listQuery.geneId = ''
      this.list = null
      this.text = '请在右上角选择基因查看数据'
      this.getList(newVal)
      this.listAll = newVal
    }
  },
  methods: {
    getList(obj) {
      this.listAll = obj
      this.listQuery.subTopicId = obj.id
      if (!this.listQuery.geneId) {
        return false
      }
      this.listLoading = true
      page(this.listQuery)
        .then(res => {
          this.list = res.data.rows
          this.total = res.data.total
          if (!this.total) {
            this.text = '暂无数据'
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
      if (!this.form.geneId) {
        alert('请在右上角选择基因进行添加')
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
            this.form.rsid = ''
            this.form.geneLocus = ''
            this.form.pharmgkbV = ''
          })
        } else {
          return false
        }
      })
    },
    handleUpdate(row) {
      this.dialogStatus = 'update'
      this.editOpen = true
      this.form.subTopicId = this.listAll.id
      this.form.rsid = row.rsid
      this.form.geneLocus = row.geneLocus
      this.form.pharmgkbV = row.pharmgkbV
      this.edit.id = row.id
    },
    update(formName) {
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          this.edit.geneLocus = this.form.geneLocus
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
      this.form.rsid = ''
      this.form.geneLocus = ''
      this.form.pharmgkbV = ''
    },
    handleDelete(row) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delObj({
            id: row.id
          })
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
    change(open) {
      if (open) {
        this.loading = true
        getObj({
          subTopicId: this.listAll.id
        })
          .then(res => {
            if (res.code === '200') {
              this.listSelect = res.data
              this.loading = false
            }
          })
      }
    },
    optionChange(id) {
      this.listQuery.geneId = id
      this.getList(this.listAll)
      this.handle()
    }
  }
}
</script>
