<template>
  <div id="index">
    <ul>
      <li>
        <p>
          <i class="el-icon-document-copy one"></i>
        </p>

        <div>
          <span>总订单</span>
          <p>{{all}}</p>
        </div>
      </li>
      <li>
        <p>
          <i class="el-icon-document-copy two"></i>
        </p>
        <div>
          <span>总销售额</span>
          <p>{{allgo}}</p>
        </div>
      </li>
      <li>
        <p>
          <i class="el-icon-document-copy one"></i>
        </p>
        <div>
          <span>今日订单数</span>
          <p>{{now}}</p>
        </div>
      </li>
      <li>
        <p>
          <i class="el-icon-document-copy three"></i>
        </p>
        <div>
          <span>今日销售额</span>
          <p>{{nowtime}}</p>
        </div>
      </li>
    </ul>
    <div id="mass">
      <div id="firstecharts" :style="{width: '100%', height: '600px'}"></div>
    </div>
  </div>
</template>

<script>
import { index_list } from "@/api/apis";
import echarts from "echarts";

export default {
  data() {
    return {
      all: "",
      allgo: "",
      now: "",
      nowtime: "",
    };
  },
  mounted() {
    let mcharts = echarts.init(document.querySelector("#firstecharts"));

    index_list().then((res) => {
      //   res.data.xData; //x坐标的标题
      //   res.data.amountData; //金额数据
      //   res.data.orderData; //订单数据
      this.all = res.data.todayOrder;
      this.allgo = res.data.totalAmount;
      this.now = res.data.totalOrder;
      this.nowtime = res.data.totayAmount;
      // 2. 创建配置对象
      let option = {
        title: {
          text: "数据统计",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["金额数据", "订单数据"], //顶部描述数组
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: res.data.xData, //横轴
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "金额数据",
            type: "line",
            stack: "总量",
            data: res.data.amountData,
          },
          {
            name: "订单数据",
            type: "line",
            stack: "总量",
            data: res.data.orderData,
          },
        ],
      };

      // 3. 使用echarts实例对象， 关联数据配置对象， 创建表格
      mcharts.setOption(option);
    });
  },
  //     methods:{
  //      loadingChart(){
  //       // 基于准备好的dom，初始化echarts实例
  //       let myChart = this.$echarts.init(document.getElementById("chart"));
  //       // 指定图表的配置项和数据
  //     //   var colors = ['#5793f3', '#d14a61', '#675bba'];

  //       let option  = {
  //     title: {
  //         text: '折线图堆叠'
  //     },
  //     tooltip: {
  //         trigger: 'axis'
  //     },
  //     legend: {
  //         data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
  //     },
  //     grid: {
  //         left: '3%',
  //         right: '4%',
  //         bottom: '3%',
  //         containLabel: true
  //     },
  //     toolbox: {
  //         feature: {
  //             saveAsImage: {}
  //         }
  //     },
  //     xAxis: {
  //         type: 'category',
  //         boundaryGap: false,
  //         data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  //     },
  //     yAxis: {
  //         type: 'value'
  //     },
  //     series: [
  //         {
  //             name: '邮件营销',
  //             type: 'line',
  //             stack: '总量',
  //             data: [120, 132, 101, 134, 90, 230, 210]
  //         },
  //         {
  //             name: '联盟广告',
  //             type: 'line',
  //             stack: '总量',
  //             data: [220, 182, 191, 234, 290, 330, 310]
  //         },
  //         {
  //             name: '视频广告',
  //             type: 'line',
  //             stack: '总量',
  //             data: [150, 232, 201, 154, 190, 330, 410]
  //         },
  //         {
  //             name: '直接访问',
  //             type: 'line',
  //             stack: '总量',
  //             data: [320, 332, 301, 334, 390, 330, 320]
  //         },
  //         {
  //             name: '搜索引擎',
  //             type: 'line',
  //             stack: '总量',
  //             data: [820, 932, 901, 934, 1290, 1330, 1320]
  //         }
  //     ]
  // };

  //       // 使用刚指定的配置项和数据显示图表。
  //       myChart.setOption(option);
  //     },
  //   },
  //     mounted(){
  //          this.loadingChart();
  //     }
};
</script>

<style lang="less" scoped>
#index {
  padding: 20px;
  #mass {
    padding: 40px 25px;
  }
  #chart {
    background: #fff;
  }
  ul {
    display: flex;
    justify-content: space-around;
    li {
      display: flex;
      justify-content: space-between;
      list-style: none;
      background: #fff;
      padding: 15px 20px 15px 30px;
      border-radius: 5px;
      span {
        font-size: 20px;
        color: #ccc;
      }
      div {
        margin-left: 100px;
        p {
          font-size: 20px;
          text-align: center;
          font-weight: bold;
        }
      }
      i {
        font-size: 60px;
      }
      .one {
        color: #77c2ea;
      }
      .two {
        color: #d4257b;
      }
      .three {
        color: #1afa29;
      }
    }
  }
}
</style>