<template>
  <div class="app-container calendar-list-container">
    <div style='margin-bottom:10px'>
      主课题 <el-input v-model="listAll.mainTopicName"
                style='width:140px;margin-right:50px;'
                disabled
                placeholder="请输入内容"></el-input>
      子课题 <el-input v-model="listAll.subTopicName"
                style='width:140px;margin-right:50px;'
                disabled
                placeholder="请输入内容"></el-input>
      药物/病种 <el-input v-model="listAll.medicine"
                style='width:140px;'
                disabled
                placeholder="请输入内容"></el-input>
    </div>
    <el-table :key='tableKey'
              :data="list"
              v-loading.body="listLoading"
              border
              fit
              highlight-current-row>
      <el-table-column align="center"
                       label="序号"
                       width="65"> <template scope="scope">
          <span>{{scope.$index + 1}}</span>
        </template> </el-table-column>
      <el-table-column width="200"
                       align="center"
                       label="基因编码"> <template scope="scope">
          <span>{{scope.row.gene}}</span>
        </template> </el-table-column>
      <el-table-column width="180"
                       align="center"
                       label="三济基因编码"> <template scope="scope">
          <span>{{scope.row.sjCode}}</span>
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
        <el-form-item label="基因名称"
                      prop="gene"
                      style='display:flex'>
          <el-input v-model="form.gene"
                    style='width:160px;margin-right:50px;'
                    placeholder="请输入基因名称"></el-input>
        </el-form-item>
        <el-form-item label="三济基因名称"
                      width='100px;'
                      prop="sjCode"
                      style='display:flex'>
          <el-input v-model="form.sjCode"
                    style='width:160px;'
                    placeholder="请输入三济基因名称"></el-input>
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
  addObj,
  putObj,
  delObj
} from 'api/new/topic/top/subGene';
import { mapGetters } from 'vuex';
export default {
  props: ['num'],
  data() {
    return {
      rules: {
        gene: [
          { required: true, message: '请输入基因名称', trigger: 'blur' }
        ],
        sjCode: [
          { required: true, message: '请输入三济基因名称', trigger: 'blur' }
        ]
      },
      id: undefined,
      nameid: {},
      setAdmin: {},
      form: {
        gene: '',
        sjCode: ''
      },
      updataform: {},
      topic: null,
      list: null,
      listAll: {},
      total: null,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 10
      },
      listQueryAll: {
        mainTopicName: '',
        subTopicName: '',
        useTarget: '',
        topicTpye: ''
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
      this.getList(newVal)
      this.listAll = newVal
    }
  },
  methods: {
    getList(obj) {
      this.listAll = obj
      this.listLoading = true
      this.listQuery.subTopicId = obj.id
      page(this.listQuery)
        .then(res => {
          this.list = res.data.rows
          this.total = res.data.total
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
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          addObj(this.form).then(() => {
            this.getList(this.listAll)
            this.form.gene = ''
            this.form.sjCode = ''
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        } else {
          return false
        }
      })
    },
    handleUpdate(row) {
      this.dialogStatus = 'update'
      this.form.subTopicId = this.listAll.id
      this.form.id = row.id
      this.form.gene = row.gene
      this.form.sjCode = row.sjCode
    },
    update(formName) {
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          putObj(this.form).then(() => {
            this.getList(this.listAll)
            this.handle()
            this.$notify({
              title: '成功',
              message: '创建成功',
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
      this.dialogStatus = ''
      this.form = {}
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
    }
  }
}
</script>
