<template>
  <div id="main">
    <div v-show="shows" id="prompt">
      <div id="box">
        <p>
          <span class="left">商品名称</span>
          <el-input v-model="row_info.name" style="width:300px" placeholder="请输入内容"></el-input>
        </p>
        <p>
          <span class="left">所属分类</span>
          <el-select v-model="row_category" placeholder="请选择商品分类">
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
          <el-input-number v-model="row_info.price" :min="0" label="描述文字"></el-input-number>
        </p>
        <p>
          <span class="left">商品图片</span>
          <el-upload
            class="avatar-uploader"
            :action="item_img"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <img v-show="!row_info.imgUrl==''" :src="find_img+row_info.imgUrl" class="avatar" />
            <i v-show="row_info.imgUrl==''" class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </p>
        <p>
          <span class="left">商品描述</span>
          <el-input
            style="width:300px"
            type="textarea"
            autosize
            placeholder="请输入内容"
            v-model="row_info.goodsDesc"
          ></el-input>
        </p>
        <p>
          <el-button type="primary" @click="confirms">确定</el-button>
          <el-button @click="cancel">取消</el-button>
        </p>
      </div>
    </div>
    <div id="top">
      <span id="name">商品列表</span>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品 ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>

            <el-form-item label="商品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="所属分类">
              <span>{{ props.row.category }}</span>
            </el-form-item>
            <el-form-item label="商品价格">
              <span>{{ props.row.price }}</span>
            </el-form-item>
            <el-form-item label="商品图片">
              <img :src="find_img+props.row.imgUrl" alt />
            </el-form-item>
            <el-form-item label="创建时间">
              <span>{{ props.row.ctime }}</span>
            </el-form-item>
            <el-form-item label="商品评价">
              <span>{{ props.row.rating }}</span>
            </el-form-item>
            <el-form-item label="商品销量">
              <span>{{ props.row.sellCount }}</span>
            </el-form-item>

            <el-form-item label="商品描述">
              <span>{{ props.row.goodsDesc }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>

      <el-table-column label="商品名称" prop="name"></el-table-column>
      <el-table-column label="所属分类" prop="category"></el-table-column>
      <el-table-column label="商品价格" prop="price"></el-table-column>
      <el-table-column label="商品图片">
        <template scope="scope">
          <img :src="find_img+scope.row.imgUrl" alt />
        </template>
      </el-table-column>
      <el-table-column label="商品描述" prop="goodsDesc"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit( scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 15, 20, 25]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import {
  menuList,
  delMenu,
  edtMenu,
  modifyList,
  item_img,
  find_img,
} from "@/api/apis";
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 6,
      total: 0,
      shows: false,
      names: "",
      prc: "",
      descr: "",
      id: "",
      img: "",
      tableData: [],
      options: [],
      arr2: [],
      item_img: "",
      find_img: "",
      row_info: {},
      row_category: "",
    };
  },
  methods: {
    handleCurrentChange(val) {
      //当前显示页
      this.currentPage = val;
      this.load();
    },
    handleSizeChange(val) {
      //每页条数
      this.pageSize = val;
      this.load();
    },
    load() {
      //渲染
      menuList(this.currentPage, this.pageSize).then((res) => {
        let arr = res.data.data;
        this.tableData = arr;
        this.total = res.data.total;
      });
    },
    handleDelete(index, row) {
      //删除事件
      delMenu(row.id).then((res) => {
        if (res.data.code == 0) {
          this.load();
        }
      });
    },
    handleEdit(row) {
      //编辑
      this.shows = true;
      this.id = row.id;
      this.row_info = { ...row };
      this.row_category = this.row_info.category;
    },
    confirms() {
      //修改模态框确认
      this.row_info.category=this.row_category
      edtMenu(this.row_info.name,this.row_info.category,this.row_info.price,this.row_info.imgUrl,this.row_info.goodsDesc,this.row_info.id).then((res) => {
        if (res.data.code == 0) {
          this.shows = false;
          this.load();
        } else {
          this.$confirm("修改失败!", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          });
        }
      });
    },
    handleAvatarSuccess(res) {
      //获取照片
      if (res.code == 0) {
        this.row_info.imgUrl = res.imgUrl;
      }
    },
    cancel() {
      //修改模态框取消
      this.shows = false;
    },
  },
  created() {
    this.item_img = item_img;
    this.find_img = find_img;
    modifyList().then((res) => {
      this.options = res.data.categories;
    });
    this.load();
  },
};
</script>

<style lang="less" scoped>
form {
  display: flex;
  flex-wrap: wrap;
  .el-form-item {
    width: 47%;
    margin-bottom: 0;
  }
}
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
img {
  width: 50px;
  height: 50px;
}
#prompt {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  #box {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 450px;
    height: 500px;
    background: #66cccc;
    padding: 25px;
    p {
      display: flex;
      text-align: center;
      margin-bottom: 20px;
      .el-button--primary {
        margin-left: 120px;
      }
      .left {
        color: #fff;
        width: 80px;
        margin-right: 10px;
        line-height: 40px;
      }
    }
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
  width: 178px;
  height: 178px;
  display: block;
}
</style>