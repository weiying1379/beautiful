<template>
  <div id="add">
    <p>
      <span class="left">商品名称</span>
      <el-input v-model="name" style="width:300px" placeholder="请输入内容"></el-input>
    </p>
    <p>
      <span class="left">商品分类</span>
      <el-select v-model="options.cateName" placeholder="请选择商品分类">
        <el-option
          v-for="item in options"
          :key="item.cateName"
          :label="item.cateName"
          :value="item.cateName"
        ></el-option>
      </el-select>
    </p>
    <p>
      <span class="left">商品价格</span>
      <el-input-number v-model="num" @change="handleChange" :min="min" :max="max" label="描述文字"></el-input-number>
    </p>
    <p>
      <span class="left">商品图片</span>
      <el-upload
        action="http://127.0.0.1:5000/goods/goods_img_upload"
        list-type="picture-card"
        auto-upload
        :on-success="handleAvatarSuccess"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt />
      </el-dialog>
    </p>
    <p>
      <span class="left">商品描述</span>

      <el-input
        style="width:300px"
        type="textarea"
        autosize
        placeholder="请输入内容"
        v-model="textarea"
      ></el-input>
    </p>
    <p>
      <el-button type="primary" @click="addmores">添加饰品</el-button>
    </p>
  </div>
</template>

<script>
import { modifyList ,addmore} from "@/api/apis";
export default {
  data() {
    return {
      min: 1,
      max: 100,
      name: "",
      textarea: "",
      num: 1,
      options: [],
      imgs:''
    };
  },
  created() {
    modifyList().then((res) => {
      this.options = res.data.categories;
    });
  },
  methods: {
   
   handleAvatarSuccess(res){
     if(res.code==0){
this.imgs=res.imgUrl
     }
     console.log(res);
   },
   addmores(){
     
      addmore(this.name,this.options.cateName,this.num,this.imgs,this.textarea).then(res=>{
        if(res.data.code==0){
          this.$message({
          message: '添加成功!',
          type: 'success'
        });
        }else{
          this.$message({
          message: '添加失败!',
          type: 'warning'
        });
        }
      })
   }
  
  },
};
</script>

<style lang="less" scoped>
#add {
  background: #fff;
  margin: 15px 0 0 15px;
  padding: 20px 40px;
  p {
    margin-bottom: 20px;
    display: flex;
    button {
      margin-left: 75px;
    }
    .left {
      margin-right: 10px;
      line-height: 40px;
    }
  }
}
</style>