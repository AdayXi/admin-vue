<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-select v-model="value9"
                 filterable
                 remote
                 placeholder="请输入手机号码前4位"
                 :remote-method="remoteMethod"
                 :loading="loading">
        <el-option v-for="item in options4"
                   :key="item.id"
                   :label="item.name + item.mobile"
                   :value="item.id">
        </el-option>
      </el-select>
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
                       label="医生姓名"> <template scope="scope">
          <span>{{scope.row.name}}</span>
        </template> </el-table-column>
      <el-table-column width="180"
                       align="center"
                       label="医生电话"> <template scope="scope">
          <span>{{scope.row.mobile}}</span>
        </template> </el-table-column>
      <el-table-column width="180"
                       align="center"
                       label="所属医院"> <template scope="scope">
          <span>{{scope.row.hospitalName}}</span>
        </template> </el-table-column>
      <el-table-column width="180"
                       align="center"
                       label="设置管理员">
        <template scope="scope">
          <!--  -->
          <el-switch v-model="switch1[scope.$index].open"
                     :on-value='0'
                     :off-value='1'
                     @change.native="setChange(scope.row)"
                     active-color="#13ce66"
                     inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="操作"
                       width="150"> <template scope="scope">
          <el-button size="small"
                     type="danger"
                     @click="handleDelete(scope.row)">删除
          </el-button>
        </template> </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {
  getObj,
  Doctorlike,
  addSubUser,
  delSubUser,
  setSubUserAdmin
} from 'api/new/topic/top/index';
import { mapGetters } from 'vuex';
export default {
  props: ['num'],
  data() {
    return {
      value888: 0,
      value1: true,
      switch1: [],
      options4: [],
      value9: '',
      // list: [],
      loading: false,
      id: undefined,
      nameid: {},
      setAdmin: {},
      form: {
        parentId: '',
        topicName: '',
        useTarget: '',
        medicineId: '',
        remark: ''
      },
      updataform: {},
      topic: null,
      list: null,
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
    this.getList(this.num.id);
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
      this.getList(newVal.id)
    }
  },
  methods: {
    getList(id) {
      this.listLoading = true;
      this.nameid.topicId = id
      this.setAdmin.topicId = id
      getObj(id)
        .then(res => {
          this.list = res.data;
          this.listLoading = false;
          this.switch1 = []
          res.data.forEach(value => {
            const openNum = value.role
            this.switch1.push({
              id: value.patientId,
              open: openNum
            })
          });
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
    handleCreate() {
      if (!this.nameid.doctorId || !this.nameid.topicId) {
        alert('请搜索并至少选择一个医生')
        return
      }
      if (!(typeof this.nameid.doctorId === 'number')) {
        alert('请搜索并至少选择一个医生')
        return
      }
      this.listLoading = true;
      addSubUser(this.nameid)
        .then(res => {
          if (res.code === '200') {
            this.getList(this.nameid.topicId)
            this.value9 = ''
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            });
            this.listLoading = false;
          } else if (res.code === '201') {
            alert(res.message)
            this.listLoading = false;
          }
        })
    },
    handleUpdate(row) {
      this.dialogStatus = 'update'
      this.dialogFormVisible = true;
      this.form = {}
      this.form.topicName = row.subTopicName
      this.form.useTarget = row.useTarget
      this.form.remark = row.remark
      this.form.id = row.id
    },
    handleDelete(row) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delSubUser(row.id)
            .then(() => {
              this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success',
                duration: 2000
              });
              this.getList(this.nameid.topicId)
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
    remoteMethod(query) {
      this.nameid.doctorId = this.value9
      this.value9 = query
      if (query.length >= 4) {
        this.loading = true;
        Doctorlike(query).then(res => {
          this.options4 = res.data
          this.loading = false;
        })
      } else {
        this.options4 = [];
      }
    },
    setChange(row) {
      this.switch1.forEach(value => {
        if (row.patientId === value.id) {
          if (!value.open) {
            value.open = 0
            this.setAdmin.doctorId = row.patientId
            setSubUserAdmin(this.setAdmin)
              .then(res => {
                if (res.code === '200') {
                  this.$notify({
                    title: '成功',
                    message: '设置管理员成功',
                    type: 'success',
                    duration: 2000
                  });
                }
              })
          }
        } else {
          value.open = 1
        }
      });
    }
  }
}
</script>
