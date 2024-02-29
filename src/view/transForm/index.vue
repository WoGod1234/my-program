<template>
  <div>
    <!-- <div style="z-index: 1;">
      <img
        src="@/image/b1.png"
        alt="下"
      >
      <img
        src="@/image/b2.png"
        alt="班"
      >
      <img
        src="@/image/b3.png"
        alt="了"
      >
    </div> -->
    <div>
      <p>{{ userInfo.userName }}{{ value }}</p>

      <div
        class="time_style"
        @click="shout(1)"
      >
        <div @click.stop="shout(2)">
          <span>{{ date }} </span>
          <span style="color: red;">{{ time }}</span>
        </div>
        <div>
          <span>距离过年还有</span> <span
            style="color: red;"
            ref="day"
            class="day"
          >{{ leftDay }}</span> 天
        </div>
        <div>
          <span>距离下班还有</span><span style="color: red;">{{ time1 }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import dayjs from "dayjs";
export default {
  name: "tarnsForm",
  data() {
    return {
      val: 0,
      year: "",
      mm: "",
      date: "",
      hour: "",
      min: "",
      sec: "",
      time: "",
      leftDay: "",
      yearDay: "2025-01-28 18:00:00",
      time1: "",
      count: 0,
      avltimer: "",
    };
  },
  created() {
    this.refreshTime();
    this.computeDay();
    console.log("created");
  },
  mounted() {
    console.log("mounted");
  },
  computed: {
    value() {
      return this.val++;
    },
    ...mapState(["likes", "friends", "token", "userInfo"]),
  },
  methods: {
    refreshTime() {
      this.avltimer = setInterval(() => {
        let myDate = new Date();
        let year = "";
        let mm = "";
        let day = "";
        year = myDate.getFullYear();
        mm = myDate.getMonth() + 1;
        mm = mm > 9 ? mm : "0" + mm;
        day = myDate.getDate();
        day = day > 9 ? day : "0" + day;
        this.date = year + "-" + mm + "-" + day;
        this.hour = myDate.getHours();
        this.min = myDate.getMinutes();
        this.sec = myDate.getSeconds();
        this.time =
          (this.hour > 9 ? this.hour : "0" + this.hour) +
          ": " +
          (this.min > 9 ? this.min : "0" + this.min) +
          ":  " +
          (this.sec > 9 ? this.sec : "0" + this.sec);
        let date3 = new Date(dayjs(myDate).format("YYYY-MM-DD") + " 18:00:00");
        let t = (date3 - myDate) / 1000;
        if (t < 0) {
          this.time1 = "下班了";
          return;
        }
        let h = Math.floor((t / 60 / 60) % 24);
        let m = Math.floor((t / 60) % 60);
        let s = Math.floor(t % 60);
        this.time1 =
          (h > 9 ? h : "0" + h) +
          ": " +
          (m > 9 ? m : "0" + m) +
          ": " +
          (s > 9 ? s : "0" + s);
        this.count++;
        if (this.count % 2 == 0) {
          document.getElementsByClassName("day")[0].style.color = "yellow";
        } else {
          document.getElementsByClassName("day")[0].style.color = "green";
        }
      }, 1000);
    },
    computeDay() {
      let date1 = new Date(this.yearDay);
      // date1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
      let date2 = new Date();
      let diff = date1 - date2;
      this.leftDay = Math.floor(diff / (24 * 60 * 60 * 1000));
    },
    shout(type) {
      console.log(type);
      if (type == 1) {
        this.$refs.day.style.color = "red";
      } else {
        this.$refs.day.style.color = "blue";
      }
    },
  },

  beforeDestroy() {
    clearInterval(this.avltimer);
  },
};
</script>
<style scoped>
.design_service_list {
  display: flex;
  overflow: hidden;
  flex-wrap: wrap;
}

/* 最具常见的用法就是父级标签relative，子级标签position来做到无论浏览器如何改变，都是相对浏览器的定位。 */
.design_service_list .warp {
  position: relative;
  padding: 20px;
  box-sizing: border-box;
  width: 40%;
}

.design_service_list .warp img {
  width: 100%;
  display: block;
}

.design_service_list .warp:hover {
  animation-name: example1;
  animation-duration: 0.5s;
  transform: translateY(-40px);
}

@keyframes example1 {
  0% {
    transform: translateY(0px);
  }

  100% {
    transform: translateY(-40px);
  }
}

/* 1、每一个元素都有默认的display属性值，比如div元素，它的默认display属性值为“block”，成为“块级”元素(block-level)；而span元素的默认display属性值为“inline”，称为“行内”元素。
2、块级元素：占据一定矩形空间，可以通过设置高度、宽度、内外边距等属性，来调整的这个矩形；
   行内元素 ：自己的独立空间，它是依附于其他块级元素存在的，因此，对行内元素设置高度、宽度、内外边距等属性，都是无效的。
3、例子：链接 a 元素，在默认情况下是是“行内元素”，因此对a元素设置高度、宽度等属性，都是无效的。
而比如div，p，li，img等默认情况下的display属性值就是“block”。所以对于链接a来说只能这样：display:block;强制将它改成块元素。*/
.design_service_list .warp .cover {
  width: 100%;
  height: 40px;
  line-height: 40px;
  background-color: rgba(0, 0, 0, 0.3);
  text-align: center;
  font-size: 18px;
  color: #fff;
  display: block;
}

.design_service_list .warp .cover:hover {
  display: block;
  background-color: #fff;
  color: #bf9f61;
}

img {
  /* animation-delay: 2s; */
  animation-duration: 5s;
  animation-name: slidein;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-play-state: running;
  transform-style: preserve-3d;
  height: 140px;
  /* position: absolute;
  left:50%;
  top:50%; */
}

@keyframes slidein {
  0% {
    transform: scale(0.5, 0.5);
    position: absolute;
    top: 100px;
    left: 100px;
  }

  50% {
    transform: scale(1, 1);
    position: absolute;
    top: 300px;
    left: 600px;
  }

  100% {
    transform: scale(0.5, 0.5);
    position: absolute;
    top: 100px;
    left: 1100px;
  }
}

img:hover {
  animation-play-state: paused;
}
.time_style {
  font-size: 50px;
  z-index: 10;

  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  position: absolute;
}
</style>