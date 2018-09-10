<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品分类</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 添加分类 -->
        <el-button @click="showAddBox" type="success" plain style="margin-bottom:10px">添加角色</el-button>
        <!-- 自定义组件 -->
        <tree-grid :treeStructure="true" :columns="columns" :data-source="dataSource" @deleteCate="deleteCategory" @editCate="editCategory">
        </tree-grid>
        <!-- 添加分类对话框 -->
        <el-dialog title="收货地址" :visible.sync="addDialogFormVisible">
            <el-form :model="addform" label-width='100px'>
                <el-form-item label="分类名称">
                    <el-input v-model="addform.cat_name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="父级名称">
                    <el-cascader :options="options" v-model="selectedOptions" @change="handleChange" :props='goosList'>
                    </el-cascader>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addDialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="AddCategories">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { getGoodsList, addCategories } from '@/api/index.js'
import TreeGrid from '@/components/TreeGrid/TreeGrid.vue'
export default {
  components: {
    'tree-grid': TreeGrid
  },
  data () {
    return {
      addDialogFormVisible: false,
      dataSource: [],
      columns: [
        {
          text: '分类名称',
          dataIndex: 'cat_name',
          width: ''
        },
        {
          text: '是否有效',
          dataIndex: 'cat_deleted',
          width: ''
        },
        {
          text: '排序',
          dataIndex: 'cat_level',
          width: ''
        }
      ],
      addform: {
        cat_pid: '',
        cat_name: '',
        cat_level: ''
      },
      options: [],
      selectedOptions: [],
      goosList: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      }
    }
  },
  mounted () {
    this.initGoodsList()
  },
  methods: {
    initGoodsList () {
      //  获取分类数据
      getGoodsList(3).then(res => {
        console.log(res)
        this.dataSource = res.data
      })
    },
    showAddBox () {
      // 显示添加分类对话框
      this.addDialogFormVisible = true
      getGoodsList(2).then(res => {
        this.options = res.data
      })
    },
    deleteCategory (cid) {
      console.log(cid)
    },
    editCategory (cid) {
      console.log(cid)
    },
    handleChange (v) {
      console.log(v)
    },
    AddCategories () {
      if (this.selectedOptions.length === 0) {
        this.addform.cat_level = 0
        this.addform.cat_pid = 0
      } else if (this.selectedOptions.length === 1) {
        this.addform.cat_level = 1
        this.addform.cat_pid = this.selectedOptions[0]
      } else if (this.selectedOptions.length === 2) {
        this.addform.cat_level = 2
        this.addform.cat_pid = this.selectedOptions[1]
      }
      addCategories(this.addform).then(res => {
        if (res.meta.status === 201) {
          this.$message({
            message: res.meta.msg,
            type: 'success'
          })
          this.initGoodsList()
          this.addDialogFormVisible = false
        } else {
          this.$message({
            message: res.meta.msg,
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
</style>
