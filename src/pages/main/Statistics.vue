<template>
  <div>
    <el-date-picker
      v-model="date"
      type="datetimerange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
    ></el-date-picker>
    <el-button type="primary" @click="clickSearch" icon="el-icon-search">查询</el-button>

    <div id="salecount" style="width: 100%; height: 500px"></div>
  </div>
</template>
/*  */
<script>
import echarts from "echarts";
import { rpt } from "@/api/apis";
import { getDate } from "@/utils/utils";

export default {
  data() {
    return {
      date: [new Date('2020-04-01 00:00:00'),new Date()], //当前选择的时间
    };
  },
  methods: {
    clickSearch() {
      let timestr = JSON.stringify([
        getDate(this.date[0]),
        getDate(this.date[1]),
      ]);
      this.refreshEcharts(timestr);
    },
    refreshEcharts(str) {
      rpt(str).then((res) => {
        let arr = res.data.data;

        for (let obj of arr) {
          obj.orderTime = getDate(obj.orderTime);
        }

        let option = {
          xAxis: {
            type: "category",
            data: arr.map((obj) => obj.orderTime),
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              data: arr.map((obj) => obj.orderAmount),
              type: "bar",
            },
          ],
        };

        this.sechart.setOption(option);
      });
    },
  },
  mounted() {
    this.sechart = echarts.init(document.getElementById("salecount"));

    // 发送请求， 拿option， 渲染
  },
  created(){
    this.clickSearch()
  }
};
</script>

<style lang="less" scoped>
</style>