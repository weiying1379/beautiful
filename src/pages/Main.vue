<template>
  <el-container>
    <el-aside width="200px">
      <el-row class="tac">
        <el-col :span="24">
          <div>

      <img  style="width:200px; height:120px" src="http://127.0.0.1:5000/upload/imgs/acc_img/logo.png" alt="">
          </div>
          
          <el-menu
            :default-active="cur"
            class="el-menu-vertical-demo"
            background-color="#66CCCC"
            text-color="#fff"
            active-text-color="#FF6666"
            unique-opened
            router
          >

            <div v-for="item in powerarr" :key="item.url">
              <el-menu-item v-if="!item.children" :index="item.url">
                <i :class="item.icon"></i>
                <span slot="title">{{ item.name }}</span>
              </el-menu-item>
              <el-submenu v-else :index="item.url">
                <template slot="title">
                  <i :class="item.icon"></i>
                  <span>{{item.name}}</span>
                </template>

                <el-menu-item
                  v-for="child in item.children"
                  :key="child.url"
                  :index="child.url"
                >{{ child.name }}</el-menu-item>
              </el-submenu>
            </div>
          </el-menu>
        </el-col>
      </el-row>
    </el-aside>
    <el-container>
      <el-header>
        <div class="left">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item v-for="item in arr" :key="item"><a href="#">{{item}}</a></el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="right">
          <span>欢迎你! <label>{{username}}</label> </span>
          <el-row class="demo-avatar demo-basic">
            <el-col>
              <div @click="head" class="demo-basic--circle">
                <div class="block">
                  <el-avatar>
                    <img :src="headimg" alt />
                  </el-avatar>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { checktoken, info } from "@/api/apis";
export default {
  data() {
    return {
      username: "",
      cur: "",
      headimg: "",
      list: [
        {
          url: "/main/index",
          icon: "el-icon-s-home",
          name: "后台首页",
          roles: ["super", "normal"],
        },
        {
          url: "/main/acct",
          icon: "el-icon-s-order",
          name: "订单管理",
          roles: ["super", "normal"],
        },
        {
          url: "3",
          icon: "el-icon-shopping-bag-1",
          name: "商品管理",
          children: [
            { url: "/main/lst", name: "商品列表" },
            { url: "/main/addTo", name: "商品添加" },
            { url: "/main/classification", name: "商品分类" },
          ],
          roles: ["super", "normal"],
        },

        {
          url: "/main/management",
          icon: "el-icon-s-shop",
          name: "店铺管理",
          roles: ["super"],
        },
        {
          url: "5",
          icon: "el-icon-s-custom",
          name: "账号管理",
          children: [
            { url: "/main/acctLst", name: "账号列表" },
            { url: "/main/addAcct", name: "添加账户" },
            { url: "/main/modify", name: "修改密码" },
          ],
          roles: ["super"],
        },
        {
          url: "6",
          icon: "el-icon-pie-chart",
          name: "销售分类",
          children: [
            { url: "/main/statiSstics2", name: "商品统计" },
            { url: "/main/statistics", name: "订单统计" },
          ],
          roles: ["super"],
        },
      ],
      arr:[]
    };
  },
  methods: {
    head() {
      this.$router.push("/main/my");
    },
    myinfo() {
      info(localStorage.id).then((res) => {
        this.headimg = res.data.accountInfo.imgUrl;
      });
    },
  },
  watch: {
    $route(to) {
      this.arr=to.meta.breadName
    },
  },
  computed: {
    powerarr() {
      let newarr = this.list.filter((item) => {
        // 判定权限内有无登录对应的等级
        return item.roles.includes(localStorage.role);
      });
      return newarr;
    },
  },
  created() {
    this.$bus.$on("myhead", () => {
      this.myinfo();
      console.log();
    });
    this.myinfo();
    this.cur = this.$route.path;
    checktoken(localStorage.token).then((res) => {
      //判断返回值
      if (res.data.code == 0) {
        this.username = localStorage.user;
      } else {
        this.username = "请重新登录";
      }
    });
    this.arr=this.$route.meta.breadName
  },
};
</script>

<style lang="less" scoped>
#top {
  #name {
    font-size: 20px;
  }
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #f2f2f2;
  padding: 3px;
}
#buttom {
  padding: 15px 25px;

  .ifor {
    margin-bottom: 20px;
    .el-input {
      width: 300px;
    }
    .left4 {
      margin-right: 25px;
    }
    .left {
      margin-right: 15px;
      line-height: 10px;
    }
  }
  .ifor1 {
    margin-bottom: 20px;
    display: flex;
    .left {
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

    //引入传图片样式
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
  }
}
.el-main {
  flex: 1;
  overflow-y: scroll;
  padding: 0;
  background: #c8f1bd;
}
.el-aside {
  background: #66cccc;
  li,
  span {
    font-weight: bold;
  }
  i {
    color: #fff;
  }
}
.is-vertical {
  background: #ccc;
  flex: 1;
  display: flex;
  .el-header {
    background: #66cccc;
  }
}
//top

.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .right {
    display: flex;
    align-items: center;
    span {
      color: #fff;
      margin-right: 5px;
      label{
color: red;
      }
    }
  }
}
.el-breadcrumb__item {
  font-size: 16px;
}
 .el-breadcrumb__inner a{
  font-size: 18px;
  color:#fff !important;
}
</style>