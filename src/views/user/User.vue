<template>
    <div class="user">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 搜索框 -->
        <div style="margin-top: 15px;margin-bottom: 15px">
            <el-input placeholder="请输入内容" v-model="input5" class="input-with-select" style="width:300px">
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
            <el-button type="success" plain>成功按钮</el-button>
        </div>
        <!-- 表格 -->
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
                        <el-button type="warning" icon="el-icon-edit" plain></el-button>
                    </el-tooltip>
                    <el-tooltip content="权限设置" placement="top">
                        <el-button type="success" icon="el-icon-share" plain></el-button>
                    </el-tooltip>
                    <el-tooltip content="删除" placement="top">
                        <el-button type="danger" icon="el-icon-delete" plain></el-button>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[1, 2, 3, 4]" :page-size="1" layout="total, sizes, prev, pager, next, jumper" :total='total'>
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { getUserDate } from '@/api/index.js'
export default {
  methods: {
    handleSizeChange (val) {
      console.log(123)
      console.log(val)
      this.pagesize = val
      getUserDate({ query: '', pagenum: 1, pagesize: val }).then(res => {
        this.tableData = res.data.users
      })
    },
    handleCurrentChange (val) {
      console.log(456)
      console.log(val)
      getUserDate({ query: '', pagenum: val, pagesize: this.pagesize }).then(res => {
        this.tableData = res.data.users
      })
    }
  },
  data () {
    return {
      input5: '',
      value2: '',
      pagesize: 1,
      total: 0,
      pagenum: '',
      tableData: []
    }
  },
  mounted () {
    getUserDate({ query: '', pagenum: 1, pagesize: 1 }).then(res => {
      console.log(res)
      this.tableData = res.data.users
      this.total = parseInt(res.data.total)
      // console.log(this.total)
    })
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
