<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter"
                style="width: 100px;"
                class="filter-item"
                placeholder="所属课题"
                v-model="listQueryAll.mainTopicName"> </el-input>
      <el-input @keyup.enter.native="handleFilter"
                style="width: 100px;"
                class="filter-item"
                placeholder="子课题名称"
                v-model="listQueryAll.subTopicName"> </el-input>
      <el-input @keyup.enter.native="handleFilter"
                style="width: 100px;"
                class="filter-item"
                placeholder="目标人群"
                v-model="listQueryAll.useTarget"> </el-input>
      <el-input @keyup.enter.native="handleFilter"
                style="width: 100px;"
                class="filter-item"
                placeholder="研究方向"
                v-model="listQueryAll.topicTpye"> </el-input>
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
    <el-row style='margin-bottom:10px'>
      <el-button type="warning"
                 @click="handleSubUser(1)">基因配置</el-button>
      <el-button style="margin-left: 10px;"
                 @click="handleSubUser(2)"
                 type="warning">位点配置</el-button>
      <el-button style="margin-left: 10px;"
                 @click="handleSubUser(3)"
                 type="warning">结果配置</el-button>
      <el-button style="margin-left: 10px;"
                 @click="handleSubUser(4)"
                 type="warning">课题人员</el-button>
    </el-row>
    <el-table :key='tableKey'
              :data="list"
              v-loading.body="listLoading"
              border
              fit
              highlight-current-row
              style="width: 100%">
      <el-table-column align="center"
                       label="选择"
                       width="65"> <template scope="scope">
          <el-radio v-model="radio"
                    :label="scope.row.id"
                    @change.native="getCurrentRow(scope.row)">&nbsp;</el-radio>
        </template> </el-table-column>
      <el-table-column align="center"
                       label="序号"
                       width="65"> <template scope="scope">
          <span>{{scope.$index + 1}}</span>
        </template> </el-table-column>
      <el-table-column width="180"
                       align="center"
                       label="主课题"> <template scope="scope">
          <span>{{scope.row.mainTopicName}}</span>
        </template> </el-table-column>
      <el-table-column width="200"
                       align="center"
                       label="子课题"> <template scope="scope">
          <span>{{scope.row.subTopicName}}</span>
        </template> </el-table-column>
      <el-table-column width="180"
                       align="center"
                       label="目标人群"> <template scope="scope">
          <span>{{scope.row.useTarget}}</span>
        </template> </el-table-column>
      <el-table-column width="180"
                       align="center"
                       label="研究方向"> <template scope="scope">
          <span>{{scope.row.topicTpye}}</span>
        </template> </el-table-column>
      <el-table-column width="180"
                       align="center"
                       label="药物/病种"> <template scope="scope">
          <span>{{scope.row.medicine}}</span>
        </template> </el-table-column>
      <el-table-column width="180"
                       align="center"
                       label="创建时间"> <template scope="scope">
          <span>{{scope.row.crtTime | dateformat}}</span>
        </template> </el-table-column>
      <el-table-column width="180"
                       align="center"
                       label="更新时间"> <template scope="scope">
          <span>{{scope.row.updTime | dateformat}}</span>
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
    <!-- 添加/编辑框 -->
    <el-dialog :title="textMap[dialogStatus]"
               :visible.sync="dialogFormVisible">
      <el-form :model="form"
               :rules="rules"
               ref="form"
               label-width="100px">
        <el-form-item label="主课题"
                      v-if="dialogStatus=='create'"
                      prop="parentId">
          <el-select v-model="form.parentId"
                     placeholder="请选择">
            <el-option v-for="item in topic"
                       :key='item.id'
                       :label="item.topicName"
                       :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="子课题名称"
                      prop="topicName">
          <el-input v-model="form.topicName"
                    placeholder="请输入课题名称"></el-input>
        </el-form-item>
        <el-form-item label="目标人群"
                      prop="useTarget">
          <el-input v-model="form.useTarget"
                    placeholder="请输入目标人群"></el-input>
        </el-form-item>
        <!-- v-if="dialogStatus=='create'" -->
        <el-form-item label="药物/疾病"
                      prop="medicineId">
          <el-input v-model="form.medicineId"
                    placeholder="请输入研究的药物或疾病"></el-input>
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
    <!-- 课题人员框 -->
    <el-dialog title="课题人员"
               :visible.sync="dialogSubUser">
      <SubUser :num='id' />
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogSubUser = false">返 回</el-button>
      </div>
    </el-dialog>
    <!-- 基因配置框 -->
    <el-dialog title="基因配置"
               size='large'
               :visible.sync="dialogGene">
      <SubGene :num='id' />
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogGene = false">返 回</el-button>
      </div>
    </el-dialog>
    <!-- 位点配置 -->
    <el-dialog title="位点配置"
               size='large'
               :visible.sync="dialogSpot">
      <SubSpot :num='id' />
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogSpot = false">返 回</el-button>
      </div>
    </el-dialog>
    <!-- 结果配置 -->
    <el-dialog title="结果配置"
               size='full'
               :visible.sync="dialogResult">
      <SubResult :num='id' />
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogResult = false">返 回</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script src='./index.js'></script>
