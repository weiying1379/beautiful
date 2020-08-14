<template>

    <div>
      <div id="firstecharts" :style="{width: '100%', height: '600px'}"></div>
    </div>

</template>

<script>
import { index_list } from "@/api/apis";
import echarts from "echarts";

export default {
  mounted() {
    let mcharts = echarts.init(document.querySelector("#firstecharts"));

    index_list().then((res) => {
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

};
</script>

