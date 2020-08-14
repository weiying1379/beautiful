<template>
  <div>
    <div class="ifor1">
      <span class="left">店铺头像</span>
      <div>
        <img
          src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1819979859,2171288262&fm=26&gp=0.jpg"
          alt
        />
        <img
          src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1819979859,2171288262&fm=26&gp=0.jpg"
          alt
        />
      </div>
    </div>
    <div class="ifor1">
      <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
    <div class="ifor">
      <span class="left">配送费</span>
      <el-input v-model="input1" placeholder="4"></el-input>
    </div>
    <div class="ifor3">
      <span class="left">配送时间</span>
      <el-input v-model="input1" placeholder="36"></el-input>
    </div>
    <div class="ifor3">
      <span class="left">配送描述</span>
      <el-input v-model="input1" placeholder="蜂鸟专送"></el-input>
    </div>
    <div class="ifor3">
      <span class="left">店铺评分</span>
      <el-input v-model="input1" placeholder="4.5"></el-input>
    </div>
    <div class="ifor4">
      <span class="left">销量</span>
      <el-input v-model="input1" placeholder="100"></el-input>
    </div>

    <div class="ifor4">
      <span class="left" style="line-height: 20px;">活动</span>
      <el-checkbox-group v-model="checkList">
        <el-checkbox label="在线支付满28减5"></el-checkbox>
        <el-checkbox label="VC无限量橙果汁全场8折"></el-checkbox>
        <el-checkbox label="单人精彩套餐"></el-checkbox>
        <el-checkbox label="特价饮品8折抢购"></el-checkbox>
        <el-checkbox label="单人特色套餐"></el-checkbox>
      </el-checkbox-group>
    </div>
    <div class="ifor3" style="display:flex">
      <span class="left">营业时间</span>
      <div class="block">
        <el-date-picker
          v-model="value1"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checkList: ["在线支付满28减5", "VC无限量橙果汁全场8折"],
    };
  },
};
</script>

<style lang="less" scoped>
.ifor {
  margin-bottom: 20px;
  .el-input {
    width: 370px;
  }
  .left {
    margin-right: 15px;
    margin-left: 15px;
    line-height: 40px;
  }
}
.ifor3 {
  margin-bottom: 20px;
  .el-input {
    width: 370px;
  }
  .left {
    margin-right: 15px;
    line-height: 40px;
  }
}
.ifor4 {
  display: flex;
  margin-bottom: 20px;
  .el-checkbox-group {
    width: 370px;
    .el-checkbox {
      margin-bottom: 10px;
    }
  }
  .el-input {
    width: 370px;
  }
  .left {
    margin-right: 15px;
    margin-left: 30px;
    line-height: 40px;
  }
}
.ifor1 {
  margin-bottom: 20px;
  display: flex;
  .left {
    margin-right: 15px;
    line-height: 40px;
  }

  img {
    width: 140px;
    border-radius: 10px;
    margin-right: 10px;
  }
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  border: 1px dotted #409eff;
  border-radius: 10px;
  margin-left: 80px;
  font-size: 28px;
  color: #8c939d;
  width: 140px;
  height: 140px;
  line-height: 140px;
  text-align: center;
}
.avatar {
  width: 140px;
  height: 140px;
  display: block;
}
</style>