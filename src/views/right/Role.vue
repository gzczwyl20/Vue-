<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 添加角色 -->
        <el-button type="success" plain>添加用户</el-button>
        <!-- 表格 -->
        <el-table :data="tableData5" style="width: 100%" border="">
            <el-table-column type="expand">
                <template slot-scope="scope">
                    <el-row v-for="first in scope.row.children" :key='first.id'>
                        <el-col :span="4">
                            <el-tag closable type="success">
                                {{first.authName}}
                            </el-tag>
                        </el-col>
                        <el-col :span="20">
                            <el-row v-for="second in first.children" :key='second.id'>
                                <el-col :span="4" >
                                    <el-tag closable type="info">
                                        {{second.authName}}
                                    </el-tag>
                                </el-col>
                                <el-col :span="20">
                                    <el-tag v-for="last in second.children" :key='last.id' closable type="danger">
                                        {{last.authName}}
                                    </el-tag>
                                </el-col>
                            </el-row>
                        </el-col>
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
                        <el-button type="warning" icon="el-icon-edit" plain></el-button>
                    </el-tooltip>
                    <el-tooltip content="分配权限" placement="top">
                        <el-button type="success" icon="el-icon-share" plain></el-button>
                    </el-tooltip>
                    <el-tooltip content="删除" placement="top">
                        <el-button type="danger" icon="el-icon-delete" plain></el-button>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { getRolesList } from '@/api/index.js'
export default {
  data () {
    return {
      tableData5: []
    }
  },
  mounted () {
    getRolesList().then(res => {
      console.log(res)
      this.tableData5 = res.data
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
.el-table {
    span {
        margin-bottom: 10px;
        margin-right: 10px;
    }
}
</style>
