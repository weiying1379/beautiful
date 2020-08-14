<template>
  <div id="main">
    <div v-show="shows" id="prompt">
      <div id="box">
        <p>
          <span class="left">账户</span>
          <el-input style="width:260px" v-model="acc" placeholder="请输入内容"></el-input>
        </p>
        <p>
          <span class="left">用户组</span>
          <el-select style="width:260px" v-model="belong" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </p>
        <p>
          <el-button class="btn" type="primary" @click="confirms">确认</el-button>
          <el-button @click="cancel">取消</el-button>
        </p>
      </div>
    </div>
    <div id="top">
      <span id="name">账号列表</span>
    </div>
    <div id="buttom">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="账号" width="120">
          <template slot-scope="scope">{{ scope.row.account }}</template>
        </el-table-column>
        <el-table-column prop="name" label="用户组" width="200">
          <template slot-scope="scope">{{ scope.row.userGroup }}</template>
        </el-table-column>
        <el-table-column prop="address" label="创建时间" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.ctime }}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="open(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
      <div style="margin-top: 20px">
        <el-button type="danger" @click="all">批量删除</el-button>
        <el-button type="primary" @click="toggleSelection()">取消选择</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getLst, del, dels, chenges } from "@/api/apis";
import { getDate } from "@/utils/utils";
export default {
  data() {
    return {
      currentPage: 1,
      id: 0,
      shows: false,
      pageSize: 5,
      tableData: [],
      tableChecked: [],
      total: 0,
      acc: "",
      belong: "",
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
  created() {
    this.getlist();
  },
  methods: {
    handleSizeChange(val) {
      //显示条数
      this.pageSize = val;
      this.getlist();
    },

    handleCurrentChange(val) {
      //当前显示
      this.currentPage = val;
      this.getlist();
    },

    getlist() {
      //封装加载列表
      getLst(this.currentPage, this.pageSize).then((res) => {
        let arr = res.data.data;
        for (let obj of arr) {
          obj.ctime = getDate(obj.ctime);
        }
        this.tableData = arr;
        this.total = res.data.total;
      });
    },

    handleDelete(index, row) {
      //删除事件
      this.$confirm("你确定要删除该数据吗", "美丽管理系统提示", {
        confirmButtonText: "是的删掉",
        cancelButtonText: "留它一命",
        type: "warning",
      })
        .then(() => {
          del(row.id).then((res) => {
            if (res.data.code == 0) {
              this.getlist();
            }
          });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    open(index, row) {
      //编辑
      this.shows = true;
      this.id = row.id;
    },
    confirms() {
      //修改模态框确认
      chenges(this.id, this.acc, this.belong).then(() => {
        this.shows = false;
        this.getlist();
      });
    },
    cancel() {
      //修改模态框取消
      this.shows = false;
    },

    handleSelectionChange(val) {
      //获取批量id
      var vals = val;
      var ids = [];
      for (const key of vals) {
        ids.push(key.id);
      }
      this.tableChecked = ids;
    },
    all() {
      //批量删除
      this.$confirm("你确定要删除这些", "美丽管理系统提示", {
        confirmButtonText: "是的删掉",
        cancelButtonText: "留它一命",
        type: "warning",
      })
        .then(() => {
          dels(JSON.stringify(this.tableChecked)).then((res) => {
            if (res.data.code == 0) {
              this.getlist();
            }
          });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
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
    width: 400px;
    height: 200px;
    background: #66cccc;
    padding: 20px;
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
</style>