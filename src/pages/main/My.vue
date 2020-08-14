<template>
  <div id="my">
    <p>管理员信息</p>
    <p>
      管理员ID:
      <span>{{this.id}}</span>
    </p>
    <p>
      账号:
      <span>{{this.user}}</span>
    </p>
    <p>
      用户组:
      <span>{{this.userGroup}}</span>
    </p>
    <p>
      创建时间:
      <span>{{this.time}}</span>
    </p>
    <p id="imgs">
      管理员头像:
      <span>
        <el-upload
          class="avatar-uploader"
          :action="head_img"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :data="headimg"
        >
          <img v-if="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </span>
    </p>
  </div>
</template>

<script>
import { info, head_img } from "@/api/apis";
import { getDate } from "@/utils/utils";
export default {
  data() {
    return {
      id: "",
      headimg: {},
      user: "",
      userGroup: "",
      time: "",
      imageUrl: "",
      head_img,
    };
  },
  created() {
    this.head_img = head_img;
    this.headimg = { id: localStorage.id };
    info(localStorage.id).then((res) => {
      this.id = res.data.accountInfo.id;
      this.user = res.data.accountInfo.account;
      this.userGroup = res.data.accountInfo.userGroup;
      this.time = getDate(res.data.accountInfo.ctime);
    });
  },
  methods: {
    handleAvatarSuccess(res) {
      if (res.code == 0) {
        this.$bus.$emit("myhead");
        this.$message({
          message: "恭喜你，上传成功!",
          type: "success",
        });
      } else {
        this.$message({
          message: "上传失败!",
          type: "warning",
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
#my {
  margin: 15px 0 0 15px;
  padding: 10px;
  background: #fff;
  p {
    line-height: 40px;
  }
  p:nth-child(6) {
    line-height: 120px;
    img {
      vertical-align: middle;
    }
  }
  p:not(:last-child) {
    border-bottom: 1px solid #f4f4f4;
  }
  #imgs {
    display: flex;
    span {
      display: block;
      border: 1px dashed #ccc;
    }
  }
}
.avatar-uploader .el-upload {
  border: 10px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: red;
  width: 150px;
  height: 150px;
  line-height: 150px;
  text-align: center;
}
.avatar {
  width: 150px;
  height: 150px;
  display: block;
}
</style>