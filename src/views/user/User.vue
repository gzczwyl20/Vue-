<template>
    <div class="user">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 搜索框和添加用户 -->
        <div style="margin-top: 15px;margin-bottom: 15px">
            <el-input placeholder="请输入内容" v-model="input5" class="input-with-select" style="width:300px" @keyup.native.enter='searchData'>
                <el-button slot="append" icon="el-icon-search" @click="searchData"></el-button>
            </el-input>
            <el-button type="success" plain @click="addDialogFormVisible = true">添加用户</el-button>
        </div>
        <!-- 表格数据展示 -->
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column type="index" width="50">
            </el-table-column>
            <el-table-column prop="username" label="姓名" width="150">
            </el-table-column>
            <el-table-column prop="email" label="邮箱" width="180">
            </el-table-column>
            <el-table-column prop="mobile" label="电话">
            </el-table-column>
            <el-table-column label="状态" width="100">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-tooltip content="编辑" placement="top">
                        <el-button type="warning" icon="el-icon-edit" plain @click="showEditBox(scope.row.id)"></el-button>
                    </el-tooltip>
                    <el-tooltip content="权限设置" placement="top">
                        <el-button type="success" icon="el-icon-share" plain></el-button>
                    </el-tooltip>
                    <el-tooltip content="删除" placement="top">
                        <el-button type="danger" icon="el-icon-delete" plain @click="deleteData(scope.row.id)"></el-button>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[1, 2, 3, 4]" :page-size="pagesize" layout="total, sizes, prev,  pager, next, jumper" :total='total'>
        </el-pagination>
        <!-- 添加用户 -->
        <el-dialog title="用户添加" :visible.sync="addDialogFormVisible">
            <el-form :model="addform" ref='addform' label-width='100px' class="demo-ruleForm" :rules='rules'>
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="addform.username" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="addform.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="addform.email" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="mobile">
                    <el-input v-model="addform.mobile" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addUserdata('addform')">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 编辑用户 -->
        <el-dialog title="用户编辑" :visible.sync="editDialogFormVisible">
            <el-form :model="editform" ref='editform' label-width='100px' class="demo-ruleForm" :rules='rules'>
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="editform.username" auto-complete="off" disabled=""></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="editform.email" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="mobile">
                    <el-input v-model="editform.mobile" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editDialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="editUserdata('editform')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { getUserDate, addUser, getUserById, editUser, deleteUser } from '@/api/index.js'
export default {
  methods: {
    initPage () {
      getUserDate({
        query: this.query,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      }).then(res => {
        this.tableData = res.data.users
        this.total = parseInt(res.data.total)
      })
    },
    handleSizeChange (val) {
      this.pagesize = val
      this.initPage()
    },
    handleCurrentChange (val) {
      this.pagenum = val
      this.initPage()
    },
    searchData () {
      this.query = this.input5
      this.initPage()
    },
    addUserdata (form) {
      this.$refs[form].validate(v => {
        if (v) {
          addUser(this.addform).then(res => {
            // console.log(res)
            if (res.meta.status === 201) {
              this.$message({
                message: res.meta.msg,
                type: 'success'
              })
              this.initPage()
              this.addDialogFormVisible = false
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
    showEditBox (id) {
      this.id = id
      this.editDialogFormVisible = true
      getUserById(id).then(res => {
        console.log(res)
        this.editform.username = res.data.username
        this.editform.email = res.data.email
        this.editform.mobile = res.data.mobile
      })
    },
    editUserdata (form) {
      this.$refs[form].validate(v => {
        if (v) {
          editUser(this.id, {email: this.editform.email, mobile: this.editform.mobile}).then(res => {
            console.log(res)
            if (res.meta.status === 200) {
              this.$message({
                message: res.meta.msg,
                type: 'success'
              })
              this.initPage()
              this.editDialogFormVisible = false
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
    deleteData (id) {
      this.$confirm('此操作将永久删除id为' + id + '文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteUser(id).then(res => {
          if (res.meta.status === 200) {
            this.$message({
              message: res.meta.msg,
              type: 'success'
            })
            this.initPage()
          } else {
            this.$message({
              message: res.meta.msg,
              type: 'danger'
            })
          }
        })
      })
    }
  },
  data () {
    return {
      addDialogFormVisible: false,
      editDialogFormVisible: false,
      input5: '',
      id: '',
      value2: '',
      pagesize: 3,
      total: 0,
      pagenum: 1,
      tableData: [],
      query: '',
      addform: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      editform: {
        username: '',
        email: '',
        mobile: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          {
            type: 'email',
            required: true,
            message: '请输入正确格式的邮箱',
            trigger: 'blur'
          }
        ],
        mobile: [{ required: true, message: '请输入电话', trigger: 'blur' }]
      }
    }
  },
  mounted () {
    this.initPage()
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
</style>
