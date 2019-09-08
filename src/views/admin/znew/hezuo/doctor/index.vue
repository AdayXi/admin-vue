<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input
        @keyup.enter.native="handleFilter"
        style="width: 200px;"
        class="filter-item"
        placeholder="医院名称"
        v-model="nameid.hospitalName"
      ></el-input>
      <el-button
        class="filter-item"
        type="primary"
        v-waves
        icon="search"
        @click="handleFilter(nameid.hospitalName)"
      >搜索</el-button>
      <el-button
        class="filter-item"
        v-if="userManager_btn_add"
        style="margin-left: 10px;"
        @click="handleCreate"
        type="primary"
        icon="edit"
      >添加</el-button>
    </div>
    <el-table
      :key="tableKey"
      :data="list"
      v-loading.body="listLoading"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column align="center" label="序号" width="65">
        <template scope="scope">
          <span>{{scope.$index + 1}}</span>
        </template>
      </el-table-column>
      <el-table-column width="200" align="center" label="医院名称">
        <template scope="scope">
          <span>{{scope.row.hospitalName}}</span>
        </template>
      </el-table-column>
      <el-table-column width="180" align="center" label="医院地址">
        <template scope="scope">
          <span>{{scope.row.address}}</span>
        </template>
      </el-table-column>
      <el-table-column width="180" align="center" label="医院电话">
        <template scope="scope">
          <span>{{scope.row.telPhone}}</span>
        </template>
      </el-table-column>
      <el-table-column width="180" align="center" label="创建时间">
        <template scope="scope">
          <span>{{scope.row.crtTime | dateformat}}</span>
        </template>
      </el-table-column>
      <el-table-column width="180" align="center" label="更新时间">
        <template scope="scope">
          <span>{{scope.row.updTime | dateformat}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="150">
        <template scope="scope">
          <el-button
            v-if="userManager_btn_edit"
            size="small"
            type="success"
            @click="handleUpdate(scope.row)"
          >编辑</el-button>
          <el-button
            v-if="userManager_btn_del"
            size="small"
            type="danger"
            @click="handleDelete(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="listQuery.page"
        :page-sizes="[10,20,30,40]"
        :page-size="listQuery.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="医院名称" prop="hospitalName">
          <el-input v-model="form.hospitalName" placeholder="请输入医院名称"></el-input>
        </el-form-item>
        <el-form-item label="医院地址" prop="address">
          <el-input v-model="form.address" placeholder="请输入医院地址"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="telPhone">
          <el-input v-model="form.telPhone" placeholder="请输入联系方式"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('form')">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="create('form')">确 定</el-button>
        <el-button v-else type="primary" @click="update('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { page, addObj, getObj, delObj, putObj } from "api/new/doctor/index";
import { mapGetters } from "vuex";
export default {
  name: "user",
  data() {
    const validatePhone = (rule, value, callback) => {
      if (/^1[34578]{1}\d*$/.test(value) == false) {
        callback(new Error("请输入正确的手机号"));
      } else {
        callback();
      }
    };
    return {
      rules: {
        hospitalName: [
          { required: true, message: "请输入医院名称", trigger: "blur" }
        ],
        address: [
          { required: true, message: "请输入医院地址", trigger: "blur" }
        ],
        telPhone: [
          { required: true, message: "请输入联系方式", trigger: "blur" },
          { validator: validatePhone, trigger: "blur" }
        ]
      },
      nameid: {
        hospitalName: undefined
      },
      form: {
        hospitalName: "",
        address: "",
        telPhone: ""
      },
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
      },
      sexOptions: ["男", "女"],
      dialogFormVisible: false,
      dialogStatus: "",
      userManager_btn_edit: false,
      userManager_btn_del: false,
      userManager_btn_add: false,
      textMap: {
        update: "编辑",
        create: "创建"
      },
      tableKey: 0
    };
  },
  created() {
    console.log(this.elements);
    this.getList();
    this.userManager_btn_edit = this.elements["userManager:btn_edit"];
    this.userManager_btn_del = this.elements["userManager:btn_del"];
    this.userManager_btn_add = this.elements["userManager:btn_add"];
  },
  computed: {
    ...mapGetters(["elements"])
  },
  methods: {
    getList() {
      this.listLoading = true;
      page(this.listQuery).then(response => {
        this.list = response.data.rows;
        this.total = response.data.total;
        this.listLoading = false;
      });
    },
    handleFilter() {
      this.listLoading = true;
      if (!this.nameid.hospitalName) {
        this.nameid = {};
      }
      getObj(this.nameid).then(response => {
        if (response.code === 200) {
          this.list = response.data.rows;
          this.total = response.data.total;
        }
        this.listLoading = false;
      });
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
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
    },
    handleUpdate(row) {
      this.form = row;
      this.dialogFormVisible = true;
      this.dialogStatus = "update";
    },
    handleDelete(row) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        delObj(row.id).then(() => {
          this.$notify({
            title: "成功",
            message: "删除成功",
            type: "success",
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
          addObj(this.form).then(response => {
            console.log(response);
            this.dialogFormVisible = false;
            this.getList();
            this.$notify({
              title: "成功",
              message: "创建成功",
              type: "success",
              duration: 2000
            });
          });
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
              title: "成功",
              message: "更新成功",
              type: "success",
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
};
</script>
