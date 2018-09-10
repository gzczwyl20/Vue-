<template>
  <div>
    <el-steps :active="activeName-0" finish-status="success">
      <el-step title="步骤 1"></el-step>
      <el-step title="步骤 2"></el-step>
      <el-step title="步骤 3"></el-step>
      <el-step title="步骤 4"></el-step>
      <el-step title="步骤 5"></el-step>
    </el-steps>
    <template>
      <el-form ref="AddForm" :model="AddForm" label-width="80px" style='height:500px'>
        <el-tabs v-model="activeName" @tab-click="handleClick" tab-position='left' style="margin-top:15px;">
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="AddForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="AddForm.goods_price" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="AddForm.goods_weight" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input v-model="AddForm.goods_number" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat">
              <el-cascader :options="options" v-model="selectedOptions" expand-trigger="hover" :props='catprops' @change="handleChange">
              </el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">商品参数</el-tab-pane>
          <el-tab-pane label="商品属性" name="2">
            <div id="app">
              <h3 class="title">{{ msg }}</h3>
              <div class="amap-wrapper">
                <el-amap class="amap-box" :vid="'amap-vue'"></el-amap>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="商品图片" name="3">
            <el-upload class="upload-demo" action="http://localhost:8888/api/private/v1/upload" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" list-type="picture" :headers='getToken()' :on-success='uploadDone' :before-upload='beforeUpload'>
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品内容" name="4">
            <quill-editor style="height:400px;" v-model="AddForm.goods_introduce" ref="myQuillEditor" :options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @ready="onEditorReady($event)">
            </quill-editor>
          </el-tab-pane>
        </el-tabs>
        <el-button @click="addGoods" class="btn" type="success" plain>添加商品</el-button>
      </el-form>
    </template>
    <!-- 大图预览 -->
    <el-dialog title="图片预览" :visible.sync="imgDialogVisible" width="60%">
      <img width="100%" :src="imgsrc" alt="">
    </el-dialog>
  </div>
</template>

<script>
import { getGoodsList, AddGoods } from '@/api/index.js'
export default {
  data () {
    return {
      msg: 'vue-amap向你问好！',
      imgsrc: '',
      imgDialogVisible: false,
      activeName: '',
      fileList: [],
      AddForm: {
        goods_name: '',
        goods_cat: '1,3,6',
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        goods_introduce: '',
        pics: [],
        attrs: []
      },
      options: [],
      selectedOptions: [],
      catprops: {
        label: 'cat_name',
        children: 'children',
        value: 'cat_id'
      },
      content: null,
      editorOption: {}
    }
  },
  mounted () {
    getGoodsList(3).then(res => {
      this.options = res.data
    })
  },
  methods: {
    handleClick (tab, event) {
      //   console.log(tab, event)
    },
    handleRemove (file, fileList) {
      //   console.log(file, fileList)
      if (!file.response) {
        return
      }
      var delFile = file.response.data.tmp_path
      var index = this.AddForm.pics.findIndex(item => {
        return item.pic === delFile
      })
      this.AddForm.pics.splice(index, 1)
    },
    handlePreview (file) {
      //   console.log(file)
      this.imgsrc = 'http://localhost:8888/' + file.response.data.tmp_path
      this.imgDialogVisible = true
    },
    getToken () {
      let token = localStorage.getItem('mytoken')
      return { Authorization: token }
    },
    handleChange (val) {
      this.AddForm.goods_cat = val.join(',')
      // console.log(this.AddForm)
    },
    uploadDone (response, file, fileList) {
      this.AddForm.pics.push({ pic: response.data.tmp_path })
    },
    beforeUpload (file) {
      if (file.size > 500 * 1024) {
        this.$message({
          type: 'warning',
          message: '文件大小在500kb以内'
        })
        return false
      }
    },
    onEditorBlur (quill) {
      console.log('editor blur!', quill)
    },
    onEditorFocus (quill) {
      console.log('editor focus!', quill)
    },
    onEditorReady (quill) {
      console.log('editor ready!', quill)
    },
    addGoods () {
      AddGoods(this.AddForm).then(res => {
        if (res.meta.status === 201) {
          this.$message({
            type: 'success',
            message: res.meta.msg
          })
          this.$router.push({path: 'goodsList'})
        } else {
          this.$message({
            type: 'danger',
            message: res.meta.msg
          })
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.btn {
  float: right;
  margin: 20px 0;
}
.amap-wrapper {
  width: 500px;
  height: 500px;
}
</style>
