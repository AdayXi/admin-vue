<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter"
                style="width: 200px;"
                class="filter-item"
                placeholder="课题名称或研究方向"
                v-model="id"> </el-input>
      <el-button class="filter-item"
                 type="primary"
                 v-waves
                 icon="search"
                 @click="handleFilter">搜索</el-button>
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
      <el-table-column width="200"
                       align="center"
                       label="课题名称"> <template scope="scope">
          <span>{{scope.row.topicName}}</span>
        </template> </el-table-column>
      <el-table-column width="180"
                       align="center"
                       label="研究方向"> <template scope="scope">
          <span>{{scope.row.topicTpye}}</span>
        </template> </el-table-column>
      <el-table-column width="180"
                       align="center"
                       label="备注信息"> <template scope="scope">
          <span>{{scope.row.remark}}</span>
        </template> </el-table-column>
      <el-table-column width="180"
                       align="center"
                       label="子课题总数"> <template scope="scope">
          <span>{{scope.row.num}}</span>
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
                       width="260"> <template scope="scope">
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
          <el-button size="small"
                     type="warning"
                     @click="Add(scope.row)">添加负责人
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
        <el-form-item label="主课题名称"
                      prop="topicName">
          <el-input v-model="form.topicName"
                    placeholder="请输入主课题名称"></el-input>
        </el-form-item>
        <el-form-item label="研究方向"
                      prop="topicTpye">
          <el-input v-model="form.topicTpye"
                    placeholder="请输入研究方向"></el-input>
        </el-form-item>
        <el-form-item label="备注"
                      prop="remark">
          <el-input v-model="form.remark"
                    placeholder="请输入备注"></el-input>
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
    <el-dialog title="添加负责人"
               :visible.sync="dialogVisibleAdd"
               top='0'
               width='70%'>
      <Add @event='listId' />
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisibleAdd = false">取 消</el-button>
        <el-button type="primary"
                   @click="setAdmin">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Add from './add.vue'
import {
  page,
  addObj,
  // getObj,
  delObj,
  putObj,
  setadmin
} from 'api/new/topic/topic/index';
import { mapGetters } from 'vuex';
export default {
  components: {
    Add
  },
  name: 'user',
  data() {
    return {
      rules: {
        topicName: [
          { required: true, message: '请输入主课题名称', trigger: 'blur' }
        ],
        topicTpye: [
          { required: true, message: '请输入研究方向', trigger: 'blur' }
        ],
        remark: [
          { required: true, message: '请输入备注', trigger: 'blur' }
        ]
      },
      id: '',
      nameid: {
      },
      form: {
        topicName: undefined,
        topicTpye: undefined,
        remark: undefined
      },

      list: null,
      listLoading: true,
      total: null,
      listQuery: {
        page: 1,
        limit: 10
      },
      sexOptions: ['男', '女'],
      dialogFormVisible: false,
      dialogVisibleAdd: false,
      dialogStatus: '',
      userManager_btn_edit: false,
      userManager_btn_del: false,
      userManager_btn_add: false,
      textMap: {
        update: '编辑',
        create: '创建'
      },
      tableKey: 0,
      listid: {}
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
        .then(res => {
          this.list = res.data.rows;
          this.total = res.data.total;
          this.listLoading = false;
        })
    },
    handleFilter() {
      this.listLoading = true
      this.listQuery.topicName = this.id
      if (!this.id) {
        delete this.listQuery.topicName
        delete this.listQuery.topicTpye
      }
      page(this.listQuery)
        .then(res => {
          if (!res.data.total) {
            delete this.listQuery.topicName
            this.listQuery.topicTpye = this.id
            page(this.listQuery)
              .then(res => {
                this.list = res.data.rows
                this.total = res.data.total
                this.listLoading = false
                delete this.listQuery.topicTpye
              })
            return false
          }
          this.list = res.data.rows
          this.total = res.data.total
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
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = 'create';
      this.dialogFormVisible = true;
    },
    handleUpdate(row) {
      this.form = row
      this.dialogFormVisible = true;
      this.dialogStatus = 'update';
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
              this.getList()
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
    Add(row) {
      this.dialogVisibleAdd = true
      this.listid.id = row.id
    },
    listId(data) {
      this.listid.doctorId = data
    },
    setAdmin() {
      if (!this.listid.doctorId) {
        return
      }
      setadmin(this.listid).then(res => {
        this.dialogVisibleAdd = false
        this.getList();
        this.$notify({
          title: '成功',
          message: res.message,
          type: 'success',
          duration: 2000
        });
      });
    },
    create(formName) {
      const set = this.$refs;
      set[formName].validate(valid => {
        if (valid) {
          // const form = JSON.stringify(this.form)
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
          putObj(this.form).then(() => {
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
        chanName: undefined,
        topicTpye: undefined,
        remark: undefined
      };
    }
  }
}
</script>
