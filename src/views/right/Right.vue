<template>
    <div class="rigth">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 内容 -->
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column type="index" width="50">
            </el-table-column>
            <el-table-column prop="authName" label="权限" width="180">
            </el-table-column>
            <el-table-column prop="path" label="路径" width="180">
            </el-table-column>
            <el-table-column label="层级" width="180">
                 <template slot-scope="scope">
                    <span>{{scope.row.level | leaveFormat}}</span>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { getJurisdiction } from '@/api/index.js'
export default {
  data () {
    return {
      tableData: []
    }
  },
  mounted () {
    getJurisdiction('list').then(res => {
      console.log(res)
      this.tableData = res.data
    })
  },
  filters: {
    leaveFormat (leave) {
      if (leave === '0') {
        return '一级'
      } else if (leave === '1') {
        return '二级'
      } else if (leave === '2') {
        return '三级'
      }
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
</style>
