<template>
  <div id="all">
    <div v-show="shows" id="prompt">
      <div id="box">
        <p>
          <span class="left">收货人:</span>
          {{this.finds.consignee}}
        </p>
        <p>
          <span class="left">地址:</span>
          {{this.finds.deliverAddress}}
        </p>
        <p>
          <span class="left">下单时间:</span>
          {{this.finds.deliveryTime}}
        </p>
        <p>
          <span class="left">联系电话:</span>
          {{this.finds.phone}}
        </p>

        <p>
          <span class="left">到达时间:</span>
          {{this.finds.orderTime}}
        </p>
        <p>
          <span class="left">订单金额:</span>
          {{this.finds.orderAmount}}
        </p>
        <p>
          <span class="left">订单状态:</span>
          {{this.finds.orderState}}
        </p>
        <p>
          <span class="left">备注:</span>
          {{this.finds.remarks}}
        </p>
        <p>
          <el-button class="btn" type="primary" @click="confirms">确认</el-button>
          <el-button @click="cancel">取消</el-button>
        </p>
      </div>
    </div>
    <div v-show="commodity" id="commodity">
      <div class="box">
        <p>
          <span class="left">订单号</span>
          <el-input v-model="order.orderNo" placeholder="请输入内容"></el-input>
        </p>
        <p>
          <span class="left">下单时间</span>
          <el-date-picker v-model="order.orderTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
        </p>
        <p>
          <span class="left">手机号</span>
          <el-input v-model="order.phone" placeholder="请输入内容"></el-input>
        </p>
        <p>
          <span class="left">送达时间</span>
          <el-date-picker v-model="order.deliveryTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
        </p>
        <p>
          <span class="left">收货人</span>
          <el-input v-model="order.consignee" placeholder="请输入内容"></el-input>
        </p>
        <p>
          <span class="left">地址</span>
          <el-input v-model="order.deliverAddress" placeholder="请输入内容"></el-input>
        </p>
        <p>
          <span class="left">备注</span>
          <el-input v-model="order.remarks" placeholder="请输入内容"></el-input>
        </p>
        <p>
          <span class="left">订单金额</span>
          <el-input v-model="order.orderAmount" placeholder="请输入内容"></el-input>
        </p>
        <p>
          <span class="left">订单状态</span>
          <el-select v-model="order.orderState" placeholder="请选择">
            <el-option v-for="item in options" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </p>
        <p>
          <el-button class="btn" type="primary" @click="ok">确认</el-button>
          <el-button @click="no">取消</el-button>
        </p>
      </div>
    </div>
    <div id="top">
      <div class="top">
        <div>
          <span>订单号</span>
          <el-input v-model="orderNo" placeholder="请输入内容"></el-input>
        </div>

        <div>
          <span>收货人</span>
          <el-input v-model="consignee" placeholder="请输入内容"></el-input>
        </div>
        <div>
          <span>手机号</span>
          <el-input v-model="phone" placeholder="请输入内容"></el-input>
        </div>
        <div id="select">
          <span>订单状态</span>
          <el-select v-model="orderState" style="width:300px" placeholder="请选择">
            <el-option v-for="item in option" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </div>
      </div>
      <div class="buttom">
        <div class="block">
          <span class="demonstration">选择时间</span>
          <el-date-picker
            v-model="date"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
          ></el-date-picker>
          <el-button type="primary" @click="clickSearch">查询</el-button>
        </div>
      </div>
    </div>
    <div id="main">
      <div class="table">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column fixed prop="orderNo" label="订单号"></el-table-column>
          <el-table-column fixed prop="orderTime" label="下单时间"></el-table-column>
          <el-table-column fixed prop="phone" label="手机号"></el-table-column>
          <el-table-column prop="consignee" label="收货人"></el-table-column>
          <el-table-column prop="deliverAddress" label="配送地址"></el-table-column>
          <el-table-column fixed prop="deliveryTime" label="送达时间"></el-table-column>
          <el-table-column prop="remarks" label="微辣"></el-table-column>
          <el-table-column prop="orderAmount" label="订单金额"></el-table-column>
          <el-table-column prop="orderState" label="订单状态"></el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
              <el-button type="text" @click="edt( scope.row)" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination">
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
    </div>
  </div>
</template>

<script>
import { orderlist, find, modifyordr } from "@/api/apis";
import { getDate } from "@/utils/utils";

export default {
  methods: {
    handleClick(row) {
      find(row.id).then((res) => {
        let arr1 = res.data.data;
        arr1.orderTime = getDate(arr1.orderTime);
        arr1.deliveryTime = getDate(arr1.deliveryTime);
        this.finds = arr1;
        this.shows = true;
      });
    },
    clickSearch() {
      let { orderNo, consignee, phone, orderState } = this;
      let paramsex = {};
      if (orderNo != "") paramsex.orderNo = orderNo;
      if (consignee != "") paramsex.consignee = consignee;
      if (phone != "") paramsex.phone = phone;
      if (orderState != "" && orderState != "全部")
        paramsex.orderState = orderState;
      if (this.date)
        paramsex.date = JSON.stringify([
          getDate(this.date[0]),
          getDate(this.date[1]),
        ]);
      this.paramsex = paramsex;
      this.currentPage = 1;
      this.refreshTable(this.paramsex);
      //点击查询
    },

    edt(row) {
      this.commodity = true;
      this.order = { ...row };
    },

    handleCurrentChange(newpagesize) {
      //当前显示页
      this.currentPage = newpagesize;
      this.refreshTable(this.paramsex);
    },
    handleSizeChange(newpage) {
      //每页条数
      this.pageSize = newpage;
      this.refreshTable(this.paramsex);
    },
    refreshTable(paramsex) {
      //渲染
      orderlist({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        ...paramsex,
      }).then((res) => {
        let arr = res.data.data;
        for (let obj of arr) {
          obj.deliveryTime = getDate(obj.deliveryTime);
          obj.orderTime = getDate(obj.orderTime);
        }
        this.tableData = arr;
        this.total = res.data.total;
      });
    },
    confirms() {
      this.shows = false;
    },
    cancel() {
      this.shows = false;
    },
    ok() {
      //修改
      this.order.orderAmount = Number(this.order.orderAmount);

      modifyordr(
        this.order.id,
        this.order.orderNo,
        this.order.orderTime,
        this.order.phone,
        this.order.consignee,
        this.order.deliverAddress,
        this.order.deliveryTime,
        this.order.remarks,
        this.order.orderAmount,
        this.order.orderState
      ).then((res) => {
        if (res.data.code == 0) {
          this.refreshTable();
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
      });
      this.commodity = false;
    },
    no() {
      this.commodity = false;
    },
  },

  created() {
    this.refreshTable();
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
      total: 0,
      orderNo: "",
      consignee: "",
      phone: "",
      orderState: "",
      shows: false,
      date: null,
      finds: [],
      option: ["已受理", "派送中", "已完成", "全部"],
      options: ["已受理", "派送中", "已完成"],
      commodity: false,
      order: {},
      tableData: [],
    };
  },
};
</script>

<style lang="less" scoped>
#all {
  margin: 10px 0 0 10px;
  background: #fff;
}
#top {
  .top {
    margin-bottom: 20px;

    > div {
      padding: 10px;
      width: 250px;
      display: flex;
      margin-right: 10px;
      span {
        text-align: center;
        margin-right: 5px;
        display: block;
        width: 80px;
        line-height: 40px;
      }
    }
    #select {
      span {
        text-align: center;
        margin-right: 5px;
        display: block;
        width: 110px;
        line-height: 45px;
      }
    }
    display: flex;
    .el-input {
      width: 200px;
    }
  }
}
.buttom {
  span {
    margin-left: 15px;
  }
  .el-date-editor--datetimerange {
    margin: 0 10px 0 10px;
  }
}
#main {
  margin-top: 50px;
  .pagination {
    margin-top: 20px;
  }
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
    width: 600px;
    height: 400px;
    background: #66cccc;
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    p {
      width: 48%;
      display: flex;
      text-align: center;
      margin-bottom: 20px;
      color: #fff;
      line-height: 20px;
      .btn {
        margin-left: 200px;
      }
      .left {
        margin-right: 5px;
        width: 100px;
        font-weight: bold;
        text-align: right;
        font-size: 18px;
      }
      .el-button {
        padding: 0 20px;
      }
    }
  }
}
#commodity {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  .box {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 450px;
    height: 600px;
    background: #66cccc;
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    p {
      width: 100%;
      display: flex;
      text-align: center;
      margin-bottom: 10px;
      color: #fff;
      line-height: 20px;
      .btn {
        margin-left: 150px;
      }
      .left {
        width: 100px;
        text-align: right;
        line-height: 40px;
        margin-right: 5px;
        font-weight: bold;
      }
      .el-input--suffix {
        width: 100%;
      }
      .el-input__icon {
        height: 80%;
      }
      .el-select {
        width: 100%;
      }
    }
  }
}
</style>

