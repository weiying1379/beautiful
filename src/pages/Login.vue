<template>
  <div id="login">
    <div id="logins">
      <h2>一个美丽的管理系统</h2>
      <div id="ins">
        <p>
          <el-input prefix-icon="el-icon-user" style="width:400px" v-model="user" placeholder="请输入内容"></el-input>
        </p>
        <p>

          <el-input prefix-icon="el-icon-lock" style="width:400px" placeholder="请输入密码" v-model="pwd" show-password></el-input>
        </p>
        <p class="prompt">{{errormsg}}</p>
        <p>
          <el-button style="width:400px" type="primary" @click="clickLogin">登录</el-button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import {login} from '@/api/apis'
export default {
 
  data () {
    return {
      user:'',
      pwd:'',
      errormsg:''
    }
  },
  methods:{
     clickLogin() {
         //  console.log(this.$router); //指向main.js中注入的router对象实例
      login(this.user,this.pwd).then(res=>{
        // console.log(res.data);
        if(res.data.code==0){
          localStorage.token=res.data.token//写入toke
          localStorage.role=res.data.role//写入role
          localStorage.user=this.user//写入用户名
          localStorage.id=res.data.id//写入id
          this.$router.push('/main/index');//改变hash地址
          this.$message({
            message:'用户登录成功!',
            type:'success'
          });

        }else {this.errormsg=res.data.msg;}
      })
    }
  }
};
</script>

<style lang="less" scoped>

#login {
  background: #CCFFCC;
 width: 100%;
 height: 100%;
.prompt{
  color: red;
}
  #logins{
    h2{
      font-size: 28px;
      color: #66CCCC;
    }
     width: 400px;
  height: 400px;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  text-align: center;
     #ins {
    margin-top: 40px;
    
    p {
      margin-bottom: 20px;
    }
  }
  }
 
}
</style>