<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <!-- <el-input @keyup.enter.native="handleFilter"
                style="width: 200px;"
                class="filter-item"
                placeholder="请输入标题"
                v-model="nameid.deptName"> </el-input>
      <el-button class="filter-item"
                 type="primary"
                 v-waves
                 icon="search"
                 @click="handleFilter">搜索</el-button> -->
      <!-- 添加按钮 -->
      <el-button class="filter-item"
                 style="margin-left: 10px;"
                 @click="handleCreate"
                 type="primary"><i class="el-icon-upload el-icon--right"></i> 上传</el-button>
      <!-- v-if="userManager_btn_add" -->
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
                       label="文件ID"
                       :show-overflow-tooltip="true"> <template scope="scope">
          <span>{{scope.row.id}}</span>
        </template> </el-table-column>
      <el-table-column width="200"
                       align="center"
                       label="文件大小"> <template scope="scope">
          <span>{{scope.row.size}}B</span>
        </template> </el-table-column>
      <!-- <el-table-column width="180"
                       align="center"
                       label="状态"> <template scope="scope">
          <span>{{scope.row.type}}</span>
        </template> </el-table-column> -->
      <el-table-column width="200"
                       align="center"
                       label="文件路径"
                       :show-overflow-tooltip="true"> <template scope="scope">
          <span>{{scope.row.url}}</span>
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
          <el-button v-if="userManager_btn_del"
                     size="small"
                     type="success"
                     @click="downLoad(scope.row)">下载
            <!-- <a class='download'
               :href='scope.row.url'
               download=""
               title="下载">下载</a> -->
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
      <!-- 上传组件 -->
      <el-upload class="upload-demo"
                 action='/api/gene/gdbDb/uploadDb'
                 multiple
                 :on-success='uploadSuccess'
                 ref="upload">
        <el-button size="small"
                   type="primary">点击上传</el-button>
        <div slot="tip"
             class="el-upload__tip">只能上传 .txt 文件，且不超过500kb</div>
      </el-upload>
      <div slot="footer"
           class="dialog-footer">
        <!-- <el-button @click="cancel('form')">取 消</el-button> -->
        <!-- <el-button v-if="dialogStatus=='create'"
                   type="primary"
                   @click="create('form')">确 定</el-button>
        <el-button v-else
                   type="primary"
                   @click="update('form')">确 定</el-button> -->
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
} from 'api/new/geneUpdata/index';
import { mapGetters } from 'vuex';
export default {
  name: 'user',
  data() {
    return {
      rules: {
      },
      nameid: {
      },
      form: {
        title: undefined,
        content: undefined,
        remark: undefined
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
        create: '上传'
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
    // 上传成功之后
    uploadSuccess(res) {
      switch (res.code) {
        case '200':
          this.getList();
          break;

        default:
          this.$notify({
            title: '失败',
            message: res.message,
            type: 'error',
            duration: 2000
          });
          this.$refs.upload.clearFiles()
          break;
      }
    },
    // 下载文件
    downLoad(e) {
      const link = document.createElement('a')
      link.style.display = 'none'
      link.href = `/api/gene/gdbDb/downloadDbfile?path=${e.url}`
      // link.setAttribute('download', fileName)
      document.body.appendChild(link)
      link.click()
    },
    // 获取数据
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
      this.listLoading = true;
      if (!this.nameid.deptName) {
        this.nameid = {}
      }
      page(this.nameid)
        .then(res => {
          this.list = res.data.rows
          this.total = res.data.total
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
      if (this.$refs.upload) {
        this.$refs.upload.clearFiles()
      }
      // this.resetTemp();
      this.dialogStatus = 'create';
      this.dialogFormVisible = true;
      // 判断是不是第一次添加 不是的话清空已经上传的列表
    },
    handleUpdate(row) {
      this.form = row;
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
          delObj({ id: row.id })
            .then(() => {
              this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success',
                duration: 2000
              });
              this.getList()
              // const index = this.list.indexOf(row);
              // this.list.splice(index, 1);
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
    },
    update(formName) {
      const set = this.$refs;
      set[formName].validate(valid => {
        if (valid) {
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
        title: undefined,
        content: undefined,
        remark: undefined
      };
    }
  }
}
</script>
