<template>
    <div>
        <!-- 搜索框和添加用户 -->
        <div style="margin-top: 15px;margin-bottom: 15px">
            <el-input placeholder="请输入内容" class="input-with-select" style="width:300px">
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
            <el-button type="success" plain @click="$router.push({name: 'goodsAdd'})">添加商品</el-button>
        </div>
        <!-- 列表区域 -->
        <template>
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column type="index" width="50">
                </el-table-column>
                <el-table-column prop="goods_name" label="商品名称">
                </el-table-column>
                <el-table-column prop="goods_price" label="商品价格(元)" width="120">
                </el-table-column>
                <el-table-column prop="goods_weight" label="商品重量" width="100">
                </el-table-column>
                <el-table-column prop="add_time" label="创建时间" width="200">
                </el-table-column>
                <el-table-column width="130" label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
                        <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>
        <!-- 分页 -->
        <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 15, 20, 25]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { getGoods } from '@/api/index.js'
export default {
  data () {
    return {
      query: '',
      pagenum: 1,
      pagesize: 10,
      tableData: [],
      total: 0
    }
  },
  mounted () {
    this.initList()
  },
  methods: {
    initList () {
      getGoods({
        query: this.query,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      }).then(res => {
        console.log(res)
        this.tableData = res.data.goods
        this.total = res.data.total
        this.tableData.forEach((item, index) => {
          this.tableData[index].add_time = new Date(item.add_time * 1000).toLocaleString()
        })
      })
    },
    handleSizeChange (val) {
    //   console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.initList()
    },
    handleCurrentChange (val) {
    //   console.log(`当前页: ${val}`)
      this.pagenum = val
      this.initList()
    }
  }
}
</script>

<style scoped>
</style>
