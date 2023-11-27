<template>
  <div>
    <div class="t">
      {{ config.title }}
    </div>
    <div class="a">
      <div class="l">
        <div
          id="echart_page_1"
          style="width: 200px;height:300px;position: absolute;top: 230px;"
        >

        </div>
      </div>
      <div class='r'>
        <div
          v-for="(item,index) in config.data"
          :key="index"
          :style="{'background':activeIndex==index?config.color[index]:''}"
          :class="{'active':activeIndex!=index}"
        >
          {{item.value+' '+item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  props: ["config"],
  data() {
    return {
      activeIndex: 0,
      myEcharts: {
        page_1: {
          emphasis: {
            // 设置高亮时显示标签
            label: {
              show: true,
            },
            scale: true, // 设置高亮时放大图形
            scaleSize: 20,
          },
          color: [],
          series: [
            {
              type: "pie",
              radius: ["40%", "70%"],
              label: {
                show: false,
              },
              data: [],
            },
          ],
        },
      },
    };
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  mounted() {
    this.getIndex("echart_page_1");
    this.myEcharts.page_1.series[0].data = this.config.data;
    this.config.color.map((item) => {
      this.myEcharts.page_1.color.push(item);
    });
    this.makeEcharts("echart_page_1", "page_1");
  },
  methods: {
    getIndex(node) {
      this.timer = setInterval(() => {
        this.activeIndex++;
        if (this.activeIndex == this.config.data.length) {
          this.activeIndex = 0;
        }
        this.highlightPie(node);
      }, 1000);
    },
    makeEcharts(node, ehcartType) {
      var chartDom = document.getElementById(node);
      var myChart = echarts.init(chartDom);
      var option;
      option = this.myEcharts[ehcartType];
      option && myChart.setOption(option);
    },
    highlightPie(node) {
      var chartDom = document.getElementById(node);
      var myChart = echarts.init(chartDom);
      for (var idx in this.myEcharts.page_1.series[0].data)
        myChart.dispatchAction({
          type: "downplay",
          seriesIndex: 0,
          dataIndex: idx,
        });
      myChart.dispatchAction({
        type: "highlight",
        seriesIndex: 0,
        dataIndex: this.activeIndex,
      });
    },
  },
};
</script>

<style  lang="scss" scoped>
.t {
  text-align: center;
  height: 40px;
  background: #0b1834;
  line-height: 40px;
}
.a {
  display: flex;
  .l {
    width: 60%;
  }
  .r {
    flex: 1;
    text-align: right;
    div {
      margin-bottom: 10px;
      padding: 5px;
      border-radius: 5px;
      box-sizing: border-box;
      font-size: 15px;
      font-style: italic;
    }
  }
  .r div.active {
    background: linear-gradient(
      270deg,
      rgba(107, 203, 255, 0.7) 0%,
      rgba(23, 176, 228, 0.7) 64%,
      rgba(0, 146, 204, 0.7) 100%
    );
  }
}
#echart_page_1 {
  width: 650px;
  height: 300px;
  background: rgba(255, 255, 255, 0);
}
</style>