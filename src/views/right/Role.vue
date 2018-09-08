<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加角色 -->
    <el-button @click="addDialogFormVisible = true" type="success" plain style="margin-bottom:10px">添加角色</el-button>
    <!-- 表格 -->
    <el-table :data="tableData5" style="width: 100%" border="">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-row v-for="first in scope.row.children" :key='first.id'>
            <el-col :span="4">
              <el-tag closable type="success" @close='deleteRole(scope.row,first.id)'>
                {{first.authName}}
              </el-tag>
            </el-col>
            <el-col :span="20">
              <el-row v-for="second in first.children" :key='second.id'>
                <el-col :span="4">
                  <el-tag closable type="info" @close='deleteRole(scope.row,second.id)'>
                    {{second.authName}}
                  </el-tag>
                </el-col>
                <el-col :span="20">
                  <el-tag v-for="last in second.children" :key='last.id' closable type="danger" @close='deleteRole(scope.row,last.id)'>
                    {{last.authName}}
                  </el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row v-if="!scope.row.children.length">
            <el-col>该角色没有任何权限，请前往添加</el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index" width="50">
      </el-table-column>
      <el-table-column label="角色名称" prop="roleName">
      </el-table-column>
      <el-table-column label="描述" prop="roleDesc">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip content="编辑" placement="top">
            <el-button @click="showUpdateBox(scope.row)" type="warning" icon="el-icon-edit" plain></el-button>
          </el-tooltip>
          <el-tooltip content="分配权限" placement="top">
            <el-button @click="showGrandBox(scope.row)" type="success" icon="el-icon-share" plain></el-button>
          </el-tooltip>
          <el-tooltip content="删除" placement="top">
            <el-button @click="delRole(scope.row.id)" type="danger" icon="el-icon-delete" plain></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 角色授权 -->
    <el-dialog title="角色授权" :visible.sync="grandDialogFormVisible">
      <div style="height:400px;overflow:auto;">
        <el-tree :data="data2" show-checkbox node-key="id" :default-checked-keys="checkedArr" :props="defaultProps" :default-expand-all='true' ref="tree">
        </el-tree>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="grandDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateRight">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加角色 -->
    <el-dialog title="添加角色" :visible.sync="addDialogFormVisible">
      <el-form :model="addform" ref='addform' label-width='100px' class="demo-ruleForm" :rules='rules'>
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="addform.roleName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="addform.roleDesc" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addData('addform')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑角色 -->
    <el-dialog title="编辑角色" :visible.sync="updateDialogFormVisible">
      <el-form :model="updateform" ref='updateform' label-width='100px' class="demo-ruleForm" :rules='rules'>
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="updateform.roleName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="updateform.roleDesc" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateData('updateform')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getRolesList,
  deleteRoleRight,
  getJurisdiction,
  getRoleRight,
  AddRole,
  DeleteRole,
  UpdateRole
} from '@/api/index.js'
export default {
  data () {
    return {
      updateDialogFormVisible: false,
      addDialogFormVisible: false,
      roleId: '',
      tableData5: [],
      grandDialogFormVisible: false,
      data2: [],
      checkedArr: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      addform: {
        roleName: '',
        roleDesc: ''
      },
      updateform: {
        roleName: '',
        roleDesc: '',
        id: ''
      },
      rules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '请输入角色描述', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.initList()
  },
  methods: {
    initList () {
      getRolesList().then(res => {
        console.log(res)
        this.tableData5 = res.data
      })
    },
    deleteRole (row, rightId) {
      deleteRoleRight(row.id, rightId).then(res => {
        console.log(res)
        if (res.meta.status === 200) {
          this.$message({
            message: res.meta.msg,
            type: 'success'
          })
          row.children = res.data
        } else {
          this.$message({
            message: res.meta.msg,
            type: 'danger'
          })
        }
      })
    },
    showGrandBox (row) {
      this.roleId = row.id
      this.grandDialogFormVisible = true
      getJurisdiction('tree').then(res => {
        this.data2 = res.data
      })
      this.checkedArr.length = 0
      //   this.$refs.tree.setCheckedKeys([])
      if (row.children.length > 0) {
        row.children.forEach(first => {
          if (first.children.length > 0) {
            first.children.forEach(second => {
              if (second.children.length > 0) {
                second.children.forEach(last => {
                  //   console.log(last.id)
                  this.checkedArr.push(last.id)
                })
              }
            })
          }
        })
      }
    },
    updateRight () {
      // console.log(this.$refs.tree.getCheckedNodes())
      var arr = this.$refs.tree.getCheckedNodes().map(val => {
        return val.id + ',' + val.pid
      })
      console.log(arr.join(',').split(','))
      var final = Array.from(new Set(arr.join(',').split(',')))
      console.log(final.join(','))
      getRoleRight({ roleId: this.roleId, rids: final.join(',') }).then(res => {
        if (res.meta.status === 200) {
          this.$message({
            message: res.meta.msg,
            type: 'success'
          })
          this.grandDialogFormVisible = false
          this.initList()
          this.$refs.tree.setCheckedKeys([])
        } else {
          this.$message({
            message: res.meta.msg,
            type: 'danger'
          })
        }
      })
    },
    addData (form) {
      // 添加角色
      this.$refs[form].validate(v => {
        if (v) {
          AddRole(this.addform).then(res => {
            if (res.meta.status === 201) {
              this.$message({
                message: res.meta.msg,
                type: 'success'
              })
              this.addDialogFormVisible = false
              this.initList()
              this.$refs[form].resetFields()
            } else {
              this.$message({
                message: res.meta.msg,
                type: 'danger'
              })
            }
          })
        } else {
          this.$message({
            message: '数据不完整',
            type: 'danger'
          })
        }
      })
    },
    delRole (id) {
      // 删除角色
      DeleteRole(id).then(res => {
        if (res.meta.status === 200) {
          this.$message({
            message: res.meta.msg,
            type: 'success'
          })
          this.initList()
        } else {
          this.$message({
            message: res.meta.msg,
            type: 'danger'
          })
        }
      })
    },
    showUpdateBox (row) {
      // 显示编辑盒子
      this.updateform.roleName = row.roleName
      this.updateform.roleDesc = row.roleDesc
      this.updateform.id = row.id
      this.updateDialogFormVisible = true
    },
    updateData (form) {
      // 编辑角色提交
      this.$refs[form].validate(v => {
        if (v) {
          UpdateRole(this.updateform).then(res => {
            if (res.meta.status === 200) {
              this.$message({
                message: res.meta.msg,
                type: 'success'
              })
              this.updateDialogFormVisible = false
              this.initList()
            } else {
              this.$message({
                message: res.meta.msg,
                type: 'danger'
              })
            }
          })
        } else {
          this.$message({
            message: '数据不完整',
            type: 'danger'
          })
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.el-breadcrumb {
  background-color: #f5f5f5;
  height: 45px;
  font-size: 15px;
  padding-left: 10px;
  line-height: 45px;
  margin-bottom: 15px;
}
.el-table {
  span {
    margin-bottom: 10px;
    margin-right: 10px;
  }
}
</style>
