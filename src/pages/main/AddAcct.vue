<template>
  <div id="main">
    <div id="top">
      <span id="name">添加账号</span>
    </div>
    <div id="buttom">
      <p>
        <span class="left">账号</span>
        <el-input v-model="acc" style="width:300px" placeholder="请输入内容"></el-input>
      </p>
      <p>
        <span class="left">密码</span>
        <el-input placeholder="请输入密码" style="width:300px" v-model="pwd" show-password></el-input>
      </p>
      <p>
        <span class="left">用户组</span>
        <el-select v-model="belong" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </p>
      <p>
        <el-button type="primary" @click="add" class="btn">添加</el-button>
        <el-button @click="remove">重置</el-button>
      </p>
    </div>
  </div>
</template>

<script>
import {addName} from '@/api/apis'
export default {
  data() {
    return {
      acc:"",
      pwd:'',
      belong:'',
      options: [
        {
          value: "超级管理员",
          label: "超级管理员",
        },
        {
          value: "普通管理员",
          label: "普通管理员",
        },
      ],
    };
  },
  methods:{
    add(){
addName(this.acc,this.pwd,this.belong).then(res=>{
  if(res.data.code==0){
     this.$message({
            message:'添加成功!',
            type:'success'
          });
  }else{
     this.$message.error('添加失败!');
  }
  
});

    },
    remove(){
      this.acc='',
      this.pwd='',
      this.belong=''
    }
  }
};
</script>

<style lang="less" scoped>
#main {
  margin: 15px 0 0 15px;
  padding: 10px;
  background: #fff;
}
#top {
  #name {
    font-size: 20px;
  }
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #f2f2f2;
  padding: 5px;
  align-items: center;
}
#buttom{
    padding: 20px 30px;
    p{
        display: flex;
        margin-bottom: 20px;
        .btn{
            margin-left: 90px;
        }
        .left{
            display: block;
            width: 80px;
            text-align: right;
            margin-right: 10px;
        }
    }
}
</style>