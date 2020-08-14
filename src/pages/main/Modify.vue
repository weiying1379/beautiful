<template>
  <div id="main">
    <div id="top">
      <span id="name">修改密码</span>
    </div>
    <div id="buttom">
      <p>
        <span class="left">原密码</span>
        <el-input
          @blur="compared"
          placeholder="请输入密码"
          style="width:300px"
          v-model="oldPassWord"
          show-password
        ></el-input>
      </p>
      <p>
        <span class="left">密码</span>
        <el-input placeholder="请输入密码" style="width:300px" v-model="newPassWord" show-password></el-input>
      </p>
      <p>
        <span class="left">确认新密码</span>
        <el-input placeholder="请输入密码" style="width:300px" v-model="newPassWord2" show-password></el-input>
      </p>
      <p>
        <el-button type="primary" @click="modify" class="btn">确定</el-button>
        <el-button>重置</el-button>
      </p>
    </div>
  </div>
</template>

<script>
import { oldPasswords } from "@/api/apis";
import { modifypwd } from "@/api/apis";
export default {
  data() {
    return {
      oldPassWord: "",
      newPassWord: "",
      newPassWord2: "",
      falge: "false",
    };
  },
  methods: {
    compared() {
      oldPasswords(this.oldPassWord, localStorage.id).then((res) => {
        if (res.data.code == 0) {
          this.falge = true;
        } else {
          this.falge = false;
        }
      });
    },
    modify() {
      if (this.falge == true) {
        modifypwd(this.newPassWord, localStorage.id).then((res) => {
          if (res.data.code == 0) {
            this.$message({
          message: '修改成功,马上跳转!',
          type: 'success'
        });
            setTimeout(()=>{
              this.$router.push("/");
            },2000)
            
          } else {
            this.$message({
              message: "密码修改失败!",
              type: "warning",
            });
          }
        });
      } else {
        this.$confirm("原密码输入错误", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
      }
    },
  },
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
#buttom {
  padding: 20px 30px;
  p {
    display: flex;
    margin-bottom: 20px;
    .btn {
      margin-left: 90px;
    }
    .left {
      display: block;
      width: 80px;
      text-align: right;
      margin-right: 10px;
    }
  }
}
</style>