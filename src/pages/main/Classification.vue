<template>
  <div id="main">
    <div v-show="shows" id="prompt">
      <div id="box">
        <p>
          <span class="left">分类名称</span>
          <el-input v-model="name" placeholder="请输入内容"></el-input>
        </p>
        <p>
          <span class="left">是否启用</span>
          <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </p>
        <p>
          <el-button class="btn" type="primary" @click="confirms">确认</el-button>
          <el-button @click="cancel">取消</el-button>
        </p>
      </div>
    </div>
    <div v-show="allName" id="allname">
      <div class="box">
        <p v-for="(item,index) in arr" :key="index"><span>{{index+1}}:</span>{{item.cateName}}</p>
        <div>
          <el-button class="btn" type="primary" @click="yes">确认</el-button>
          <el-button @click="no">取消</el-button>
        </div>
      </div>
    </div>
    <div id="top">
      <span id="name">商品分类</span>
      <div>
        <el-button type="primary" @click="add">添加分类</el-button>
      <el-button type="primary" @click="obtain">获取分类列表</el-button>
      </div>
      
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="序号">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ (scope.$index )+1}}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品分类">
        <template slot-scope="scope">
          <span v-show="!scope.row.isedit" style="margin-left: 10px">{{ scope.row.cateName }}</span>
          <el-input v-show="scope.row.isedit" v-model="scope.row.cateName" />
        </template>
      </el-table-column>

      <el-table-column label="是否启用">
        <template slot-scope="scope">
          <el-switch
            :disabled="!scope.row.isedit"
            @click="handle(scope)"
            v-model="scope.row.state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope,scope.$index, scope.row)"
          >{{ scope.row.isedit ? '完成': '编辑' }}</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="total, prev, pager, next,jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import { classList, addcate, removeClass, modifyClass,modifyList } from "@/api/apis";
export default {
  data() {
    return {
      value:true,
      pageSize: 5,
      currentPage: 1,
      total: 0,
      disable: true,
      tableData: [],
      arr:[],
      shows: false,
      name: "",
      allName:false,
    };
  },
  methods: {
    handleSizeChange(val) {
      //页码
      this.pageSize = val;
      this.load();
    },
    handle(scope) {
      //按钮状态
      if (scope.row.state == 1) {
        scope.row.state = false;
      } else {
        scope.row.state = true;
      }
    },
    handleCurrentChange(val) {
      //页码数量
      this.currentPage = val;
      this.load();
    },
    add() {
      //添加按钮
      this.shows = true;
    },
    confirms() {
      //模态框确认
      addcate(this.name, this.value).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            message: "添加成功!",
            type: "success",
          });
          this.shows = false;
          this.load();
        } else {
          this.$message({
            message: "添加失败!",
            type: "warning",
          });
        }
      });
    },
    cancel() {
      //修改模态框取消
      this.shows = false;
    },
    handleDelete(index, row) {
      //删除分类
      removeClass(row.id).then((res) => {
        if (res.data.code == 0) {
          this.load();
          this.$message({
            message: "删除成功!",
            type: "success",
          });
          this.load();
        } else {
          this.$message({
            message: "删除失败!",
            type: "warning",
          });
        }
      });
    },
    handleEdit(scope) {//修改数据
      // let state = scope.row.start == 1 
      if (scope.row.isedit) {//改变数据
        scope.row.isedit = false;
        // scope.row.disable = true;
        modifyClass(scope.row).then((res) => {//发送请求
          if (res.data.code == 0) {
            this.load();
            this.$message({
              message: "修改成功!",
              type: "success",
            });
            this.shows = false;
            this.load();
          } else {
            this.$message({
              message: "修改失败!",
              type: "warning",
            });
          }
        });
      } else {
        //打开编辑状态
        scope.row.isedit = true;
        // scope.row.disable = false;
      }
    },
    yes(){
      this.allName = false//模态框确认
    },
    
    no(){
      this.allName = false//模态框取消
      },
      
    
    obtain(){
      this.allName = true;
modifyList().then(res=>{
  this.arr=res.data.categories
  console.log(this.arr);
})
    },
    load() {
      //加载事件
      classList(this.currentPage, this.pageSize).then((res) => {
        let arr = res.data.data;
        for (const key of arr) {
          key.state = key.state == 1 ? true : false;
          key.isedit = false;
          key.disable = true;
        }
        this.tableData = arr;
        this.total = res.data.total;
      });
    },
  },
  created() {
    this.load();
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
#prompt {
  background: rgba(204, 255, 204, 0.6);
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
    width: 400px;
    height: 150px;
    background: #66cccc;
    padding: 25px;
    p {
      display: flex;
      text-align: center;
      margin-bottom: 20px;
      .btn {
        margin-left: 110px;
      }
      .left {
        color: #fff;
        width: 80px;
      }
    }
  }
}
#allname {
  background: rgba(204, 255, 204, 0.6);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  .box {
    color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 360px;
    height: 190px;
    background: #66cccc;
    display: flex;
    flex-flow: wrap;
    padding: 25px;
    p{
      width: 48%;
      margin-bottom: 10px;
    }
        .btn{
          margin-left: 90px;
        }
  }
}
</style>