import SubUser from '../subUser'
import SubGene from '../subGene'
import SubSpot from '../subSpot'
import SubResult from '../subResult'
import { page, addObj, delObj, putObj, getTopic } from 'api/new/topic/top/index'
import { mapGetters } from 'vuex'
export default {
  components: {
    SubUser,
    SubGene,
    SubSpot,
    SubResult
  },
  name: 'user',
  data() {
    return {
      rules: {
        parentId: [
          {
            type: 'number',
            required: true,
            message: '请选择主课题',
            trigger: 'change'
          }
        ],
        topicName: [
          { required: true, message: '请输入子课题', trigger: 'blur' }
        ],
        useTarget: [
          { required: true, message: '请输入目标人群', trigger: 'blur' }
        ],
        medicineId: [
          { required: true, message: '请输入药物或疾病', trigger: 'blur' }
        ],
        // remark: [{ required: true, message: '请输入备注', trigger: 'blur' }],
        topicTpye: [{ required: true, message: '请输入备注', trigger: 'blur' }]
      },
      id: undefined,
      nameid: {
        hospitalName: undefined
      },
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
      listLoading: true,
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

      // 课题人员
      dialogSubUser: false,
      // 基因配置
      dialogGene: false,
      // 位点配置
      dialogSpot: false,
      // 结果配置
      dialogResult: false,

      dialogStatus: '',
      userManager_btn_edit: false,
      userManager_btn_del: false,
      userManager_btn_add: false,
      textMap: {
        update: '编辑',
        create: '创建'
      },
      tableKey: 0,
      radio: ''
    }
  },
  created() {
    this.getList()
    this.userManager_btn_edit = this.elements['userManager:btn_edit']
    this.userManager_btn_del = this.elements['userManager:btn_del']
    this.userManager_btn_add = this.elements['userManager:btn_add']
  },
  computed: {
    ...mapGetters(['elements'])
  },
  methods: {
    getList() {
      this.listLoading = true
      page(this.listQuery).then(res => {
        this.list = res.data.data.rows
        this.total = res.data.data.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listLoading = true
      for (const key in this.listQueryAll) {
        if (this.listQueryAll[key]) {
          this.listQuery[key] = this.listQueryAll[key]
        } else {
          delete this.listQuery[key]
        }
      }
      page(this.listQuery).then(res => {
        this.list = res.data.data.rows
        this.total = res.data.data.total
        this.listLoading = false
      })
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    handleUpdate(row) {
      this.dialogStatus = 'updata'
      this.dialogFormVisible = true
      this.form = {}
      this.form.topicName = row.subTopicName
      this.form.useTarget = row.useTarget
      this.form.medicineId = row.medicine
      this.form.remark = row.remark
      this.form.id = row.id
    },
    handleDelete(row) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delObj(row.id).then(() => {
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
          this.getList()
        })
      })
    },
    create(formName) {
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          addObj(this.form).then(() => {
            this.dialogFormVisible = false
            this.getList()
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
    cancel(formName) {
      this.dialogFormVisible = false
      this.$refs[formName].resetFields()
    },
    update(formName) {
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          this.dialogFormVisible = false
          putObj(this.form).then(() => {
            this.dialogFormVisible = false
            this.getList()
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
    resetTemp() {
      this.form = {
        parentId: '',
        topicName: '',
        useTarget: '',
        medicineId: '',
        remark: ''
      }
    },
    get() {
      this.listLoading = true
      this.listQuery.limit = 1000
      getTopic(this.listQuery).then(res => {
        this.topic = res.data.rows
        this.listQuery.limit = 10
        this.listLoading = false
      })
    },
    // 课题人员
    handleSubUser(num) {
      if (!this.id) {
        this.$notify({
          title: '警告',
          message: '请至少选择一个课题',
          type: 'warning',
          duration: 4000
        })
        return
      }
      switch (num) {
        case 1:
          this.dialogGene = true
          break
        case 2:
          this.dialogSpot = true
          break
        case 3:
          this.dialogResult = true
          break
        case 4:
          this.dialogSubUser = true
          break
      }
    },
    // 单选框
    getCurrentRow(row) {
      this.id = row
    }
  },
  mounted() {
    this.get()
  }
}
