<template>
  <div class="data-screen">
    <div class="header">
      <div
        class="header-title"
        :content="title+'数据中心'"
      >
        {{ title }}数据中心
      </div>
      <div class="header-time">
        <span
          class="r"
          :content="nowTime"
        >
          {{ nowTime }}
        </span>
        <span class="l">
          {{ nowDate }} <br />
          {{ day }}
        </span>
      </div>
    </div>
    <img
      src="@/image/line1.svg"
      alt=""
      style="width: 100%;height: 34px;"
    >
    <div class="content">
      <div class="chart_left">
        <chartRank :config="configStatus"></chartRank>
      </div>
      <div class="chart_center">
        <div class="angle-inner">
          <img
            src="@/image/angle-inner.svg"
            alt=""
            class="img_inner"
          >
        </div>
        <div class="angle-outer">
          <img
            src="@/image/angle-outer.svg"
            alt=""
            class="img_outer"
          >
        </div>
        <div class="circle_animation">
          <img
            src="@/image/circle.svg"
            alt=""
            class="img_l"
          >
          <img
            src="@/image/circle.svg"
            alt=""
            class="img_c"
          >
          <img
            src="@/image/circle.svg"
            alt=""
            class="img_r"
          >
          <div class="circle_text">
            <div class="a">
              {{ title.split('')[0] }}
            </div>
            <div class="b">
              {{ title.split('')[1] }}
            </div>
            {{ title.split('')[2] }}
          </div>
        </div>
      </div>
      <div class="chart_right">

      </div>
    </div>
  </div>

</template>
<script>
import JsBarcode from "jsbarcode";
import { configStatus } from "@/components/common/rank-config";
import chartRank from "@/components/chartRank/index.vue";
export default {
  components: { chartRank },
  data() {
    return {
      title: "XWK",
      time: 0,
      day: "",
      nowTime: "",
      dayConfig: {
        0: "星期日",
        1: "星期一",
        2: "星期二",
        3: "星期三",
        4: "星期四",
        5: "星期五",
        6: "星期六",
      },
      nowDate: "",
      configStatus,
    };
  },
  created() {
    this.getNowTime();
    this.getDay();
  },
  mounted() {
    this.getData();
    console.log(this.configStatus);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    //渲染数据
    getData() {
      this.configStatus = { ...this.configStatus };
    },
    getNowTime() {
      this.timer = setInterval(() => {
        let date = new Date();
        let H = date.getHours();
        let M = this.toTwo(date.getMinutes());
        let S = this.toTwo(date.getSeconds());
        this.nowTime = `${H}:${M}:${S}`;
        if (H == "00" && M == "00" && S == "00") {
          this.getDay();
        }
      }, 1000);
    },
    getDay() {
      let date = new Date();
      let Y = date.getFullYear();
      let M = this.toTwo(date.getMonth() + 1);
      let D = this.toTwo(date.getDate());
      this.day = this.dayConfig[date.getDay()];
      //return `${Y}/${M}/${D}`
      this.nowDate = `${Y}/${M}/${D}`;
    },
    toTwo(num) {
      return num < 10 ? "0" + num : num;
    },
  },
  //打印
  listCardByClazzId() {
    let t = this;
    listCardByClazzId({
      classId: this.$route.query.clazzId,
    }).then((res) => {
      this.getNewArr(res.data.data);
    });
  },
  getNewArr(arr) {
    let t = this;
    let newArr = [];
    for (let i = 0; i < arr.length; i += 18) {
      newArr.push(arr.slice(i, i + 18));
    }
    this.tableDate = newArr;
    console.log(this.tableDate);
    this.$nextTick(() => {
      for (let i = 0; i < t.tableDate.length; i++) {
        for (let j = 0; j < t.tableDate[i].length; j++) {
          t.getQRCode("#barcode_" + i + "_" + j, t.tableDate[i][j].cardNo);
        }
      }
    });
  },
  getQRCode(id, cardNo) {
    JsBarcode(id, cardNo, this.barcodeConfig);
  },
};
</script>

<style  lang="scss" scoped>
.data-screen {
  background-color: hsl(223, 87%, 9%);
  padding: 10px 10px 60px 10px;
  border-radius: 10px;
  box-sizing: border-box;
  .header {
    display: flex;
    color: rgba(255, 255, 255, 0.9);
    justify-content: space-between;
    height: 50px;
    width: 100%;
    .header-title {
      font-size: 25px;
      font-weight: 600;
      line-height: 50px;
      position: relative;
    }
    .header-title::before {
      content: attr(content);
      position: absolute;
      top: 0;
      left: 0;
      color: rgb(1, 111, 255);
      animation: textAni 4s ease-in-out infinite;
    }
    .header-time {
      @keyframes textAni {
        0%,
        100% {
          -webkit-clip-path: polygon(
            0 100%,
            0 61%,
            16% 77%,
            29% 86%,
            44% 90%,
            62% 88%,
            78% 81%,
            89% 74%,
            100% 62%,
            100% 100%
          );
          clip-path: polygon(
            0 100%,
            0 61%,
            16% 77%,
            29% 86%,
            44% 90%,
            62% 88%,
            78% 81%,
            89% 74%,
            100% 62%,
            100% 100%
          );
        }
        50% {
          -webkit-clip-path: polygon(
            0 100%,
            0 25%,
            16% 52%,
            29% 65%,
            43% 75%,
            64% 76%,
            77% 72%,
            88% 62%,
            100% 49%,
            100% 100%
          );
          clip-path: polygon(
            0 100%,
            0 25%,
            16% 52%,
            29% 65%,
            43% 75%,
            64% 76%,
            77% 72%,
            88% 62%,
            100% 49%,
            100% 100%
          );
        }
      }
      span {
        display: inline-block;
      }
      .r {
        font-size: 30px;
        margin-right: 15px;
        font-weight: 600;
        position: relative;
      }
      .r::before {
        content: attr(content);
        position: absolute;
        top: 0;
        left: 0;
        color: rgb(1, 111, 255);
        animation: textAni 4s ease-in-out infinite;
      }
      .l {
        font-size: 13px;
        text-align: right;
      }
    }
  }
  .content {
    display: flex;
    justify-content: space-around;
    .chart_left {
      width: 25%;
      height: 400px;
      color: #ffffff;
    }
    .chart_center {
      position: relative;
      .angle-inner {
        position: absolute;
        left: 48px;
        top: 100px;
        z-index: 10;
      }
      .angle-outer {
        position: absolute;
        left: 52px;
        top: 45px;
        z-index: 0;
      }
      .angle-inner,
      .angle-outer {
        position: absolute;
        .img_inner {
          transform-origin: bottom;
          width: 216px;
          animation-name: animate_inner;
          animation-duration: 2s;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
        }
        @keyframes animate_inner {
          0% {
            height: 0;
            transform: rotateX(100deg);
          }
          50% {
            transform: rotateX(75deg);
          }
          100% {
            transform: rotateX(45deg);
          }
        }
        .img_outer {
          width: 213px;
          transform-origin: bottom;
          animation-name: animate_outer;
          animation-duration: 2s;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
        }
        @keyframes animate_outer {
          0% {
            height: 0;
            transform: rotateX(100deg);
          }
          50% {
            transform: rotateX(75deg);
          }
          100% {
            transform: rotateX(45deg);
          }
        }
        &.show-txt {
          height: 0;
          display: none;
        }
      }
      .circle_animation {
        position: relative;
        .img_l,
        .img_c,
        .img_r {
          width: 100px;
          height: 100px;
          position: absolute;
          top: 120px;
          opacity: 0.5;
        }
        .img_l {
          left: 0px;
          animation: animationL 2s;
          animation-fill-mode: forwards;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
        }
        @keyframes animationL {
          0% {
            left: 0;
            transform: translateY(0px);
          }
          25% {
            left: 110px;
            transform: translateY(-60px);
          }
          50% {
            left: 220px;
            transform: translateY(0px);
          }
          100% {
            left: 220px;
            transform: translateY(0px);
          }
        }
        .img_c {
          left: 110px;
          top: 195px;
          animation: animationC 2s;
          animation-fill-mode: forwards;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
        }
        @keyframes animationC {
          0% {
            opacity: 1;
            left: 110px;
            transform: translateY(0px);
          }
          50% {
            opacity: 0.5;
            left: 0px;
            transform: translateY(-75px);
          }
          100% {
            opacity: 0.5;
            left: 0px;
            transform: translateY(-75px);
          }
          // 100% {
          //   left: 110px;
          //   transform: translateY(-120px);
          // }
        }
        .img_r {
          left: 220px;
          animation: animationR 2s;
          animation-fill-mode: forwards;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
        }
        @keyframes animationR {
          0% {
            left: 220px;
            transform: translateY(0px);
          }
          50% {
            opacity: 1;
            left: 110px;
            transform: translateY(75px);
          }
          100% {
            left: 110px;
            opacity: 1;
            transform: translateY(75px);
          }
          // 100% {
          //   left: 0px;
          //   transform: translateY(0px);
          // }
        }
        .circle_text {
          color: white;
        }
      }
    }
  }
}
</style>