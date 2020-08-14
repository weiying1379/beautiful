<template>
  <div id="main">
    <div id="top">
      <span id="name">店铺管理</span>
      <el-button type="primary" @click="save">保存</el-button>
    </div>
    <div id="buttom">
      <div class="ifor">
        <span class="left">店铺名称</span>
        <el-input v-model="all.name" placeholder="请输入内容"></el-input>
      </div>
      <div class="ifor1">
        <span class="left">店铺公示</span>
        <el-input
          :autosize="{ minRows: 4, maxRows: 4}"
          type="textarea"
          style="resize:none"
          placeholder="请输入内容"
          v-model="all.bulletin"
        ></el-input>
      </div>
      <div class="ifor1">
        <span class="left">店铺头像</span>
        <el-upload
          class="avatar-uploader"
          :action="shop_img"
          :show-file-list="false"
          :on-success="handleAvatar"
        >
          <img v-show="avatars!=''" :src="avatars==''?'':shop_myimg+avatars" class="avatar" />
          <i v-show="avatars==''" class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>

      <div class="ifor1">
        <span class="left">店铺图片</span>
        <el-upload
        style="width:470px"
          :action="shop_img"
          list-type="picture-card"
          :on-success="handleAvatarSuccess"
          :on-remove="removeImg"
          :file-list="shopimgs"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </div>
      <div class="ifor">
        <span  style="margin-left:15px ;text-algin:right" class="left">配送费</span>
        <el-input v-model="all.deliveryPrice" placeholder="4"></el-input>
      </div>
      <div class="ifor3">
        <span class="left">配送时间</span>
        <el-input v-model="all.deliveryTime" placeholder="36"></el-input>
      </div>
      <div class="ifor3">
        <span class="left">配送描述</span>
        <el-input v-model="all.description" placeholder="蜂鸟专送"></el-input>
      </div>
      <div class="ifor3">
        <span class="left">店铺评分</span>
        <el-rate style="margin-top:10px" v-model="all.score" disabled show-score text-color="#ff9900"></el-rate>
      </div>
      <div class="ifor4">
        <span class="left">销量</span>
        <el-input v-model="all.sellCount" placeholder="100"></el-input>
      </div>

      <div class="ifor4">
        <span class="left" style="line-height: 20px;">活动</span>
        <el-checkbox-group v-model="supports">
          <el-checkbox label="在线支付满28减5"></el-checkbox>
          <el-checkbox label="VC无限橙果汁全场8折"></el-checkbox>
          <el-checkbox label="单人精彩套餐"></el-checkbox>
          <el-checkbox label="特价饮品8折抢购"></el-checkbox>
          <el-checkbox label="单人特色套餐"></el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="ifor3" style="display:flex">
        <span class="left">营业时间</span>
        <el-time-picker
          is-range
          v-model="all.date"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
        ></el-time-picker>
      </div>
    </div>
  </div>
</template>

<script>
import { getshop, shop_myimg, shop_img, changeshop } from "@/api/apis";
import { getDate } from "@/utils/utils";
export default {
  data() {
    return {
      all: {},
      shop_myimg: "",
      shop_img: "",
      supports: [],
      shopimgs: [],
      avatars: "",
    };
  },
  methods: {
    loading() {
      getshop().then((res) => {
        this.all = res.data.data;
        this.supports = this.all.supports;//活动
        this.avatars = this.all.avatar;//图片路径
        this.date = this.all.date;//时间
        this.shopimgs = this.all.pics;//商家多张图片
        this.shopimgs = this.all.pics.map((imgstr) => {
          return {
            name: imgstr,
            url: this.shop_myimg + imgstr,
          };
        });
      });
    },
    save() {
      //点击保存
      let obj = { ...this.all };
      obj.pics = JSON.stringify(this.all.pics);
      obj.date = JSON.stringify([
        getDate(this.all.date[0]),
        getDate(this.all.date[1]),
      ]);
      obj.avatar = this.all.avatar;
      obj.supports = this.supports;
      obj.supports = JSON.stringify(obj.supports);
      changeshop(obj).then((res) => {
        if (res.data.code == 0) {
          this.loading();
          this.$message({
            message: "修改成功!",
            type: "success",
          });
        } else {
          this.$message({
            message: "修改失败!",
            type: "warning",
          });
        }
        this.loading();
      });
    },
    removeImg(res) {
      console.log(res.name);
      this.all.pics.splice(this.all.pics.indexOf(res.name),1)
      console.log(this.all.pics);
    },
    handleAvatar(val) {
      if (val.code == 0) {
        this.all.avatar = val.imgUrl;
        this.avatars = val.imgUrl;
      }
    },
    handleAvatarSuccess(val) {
      if (val.code == 0) {
        this.all.pics.push(val.imgUrl);
      }
    },
  },
  created() {
    this.loading();
    this.shop_myimg = shop_myimg;
    this.shop_img = shop_img;
  },
};
</script>

<style lang="less" scoped>
#main {
  margin: 15px 0 0 15px;
  background: #fff;
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
    padding: 15px 25px;

    .ifor {
      margin-bottom: 20px;
      .el-input {
        width: 300px;
      }
      .left {
         width: 100px;
    text-align: right;
        margin-right: 15px;
        line-height: 10px;
      }
    }
    .ifor5 {
      margin-left: 80px;
      margin-bottom: 20px;
    }
    .ifor1 {
      margin-bottom: 20px;
      display: flex;

      .left {
        width: 64px;
    text-align: right;
        margin-right: 15px;
        line-height: 40px;
      }
      .el-textarea {
        width: 300px;
        height: 100px;
      }
      img {
        width: 140px;
        border-radius: 10px;
        margin-right: 10px;
      }
    }
  }
}
.ifor3 {
  margin-bottom: 20px;
  display: flex;
  .el-input {
    width: 370px;
  }
  .left {
     width: 64px;
    text-align: right;
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
     width: 100px;
    text-align: right;
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
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  height: 140px;
}
</style>