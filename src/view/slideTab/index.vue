<!-- <template>
  <div class="scroll">
    <span
      class="arrow-style"
      v-show="showLeft"
      @click="moveMethod('left')"
    >&lt;</span>
    <div
      class="scroll-main"
      ref="scrollMain"
    >
      <div
        class="scroll-main-wrap"
        ref="wrap"
        :style="{ 'margin-left': distance + 'px' }"
      >
        <div
          v-for="(item, index) in 30"
          :key="item"
          :ref="'nav' + item"
          class="wrap-detail"
          :class="index === currentIndex && 'click-style'"
          @click="changeIndex(index)"
        >
          导航{{ item < 10 ? "0" + item : item }}
        </div>
      </div>
    </div>
    <span
      class="arrow-style"
      v-show="showRight"
      @click="moveMethod('right')"
    >&gt;</span>
  </div>
</template>

<script>
export default {
  name: "scroll",
  data() {
    return {
      currentIndex: 0,
      distance: 0,
      scollWith: 0,
      wrapWith: 0,
      navWidth: 0,
      showLeft: true,
      showRight: false,
    };
  },
  mounted() {
    // 初始化
    this.scollWith = this.$refs.scrollMain.offsetWidth;
    this.wrapWith = this.$refs.wrap.offsetWidth;
    this.navWidth =
      document.getElementsByClassName("wrap-detail")[0].offsetWidth;
    this.wrapWith <= this.scollWith && (this.showLeft = false);
    // 监听屏幕尺寸
    window.onresize = () => {
      //   this.scollWith = this.$refs.scrollMain.clientWidth;
      this.convertArrow();
    };
  },
  methods: {
    changeIndex(index) {
      this.currentIndex = index;
    },
    moveMethod(flag) {
      // 移动
      this.distance += flag === "left" ? -100 : 100;
      this.convertArrow();
    },
    convertArrow() {
      /**
       * 左箭头：滚动区域 - 隐藏区域 < 可视区域
       * true：隐藏左箭头(右侧导航已全显示)
       * false：显示左箭头(右侧导航未全显示)
       */
      let rollWidth = this.wrapWith - Math.abs(this.distance);
      this.showLeft = rollWidth < this.scollWith ? false : true;
      //  右箭头
      this.showRight = this.distance == 0 ? false : true;
    },
  },
};
</script>

<style lang="scss" scoped>
body {
  margin: 0;
  padding: 0;
}

.scroll {
  width: 920px;
  height: 50px;
  line-height: 50px;
  background: gray;

  .arrow-style {
    color: #fff;
    padding: 0 20px;
    cursor: pointer;
  }

  .scroll-main {
    display: inline-block;
    width: calc(920px - 104px);
    overflow: hidden;
    vertical-align: bottom;

    .scroll-main-wrap {
      width: max-content;

      .wrap-detail {
        color: #fff;
        float: left;
        padding: 0 20px;
        cursor: pointer;
        border-left: 1px solid #fff;
      }

      .wrap-detail:last-child {
        border-right: 1px solid #fff;
      }

      .click-style {
        background: yellowgreen;
      }
    }

    .scroll-main-wrap:after {
      content: "";
      display: block;
      clear: both;
    }
  }
}
</style>
 -->
<template>
  <div class="readCenter">
    <div class="flex_wrap">
      <div>
        一级目录：
      </div>
      <div>
        <div class="active">
          全部
        </div>
        <div>
          一年级
        </div>
        <div>
          二年级
        </div>
        <div>
          三年级
        </div>
        <div>
          四年级
        </div>

        <div>
          四年级
        </div>
        <div>
          四年级
        </div>
        <div>
          四年级
        </div>
        <div>
          四年级
        </div>
        <div>
          四年级
        </div>
        <div>
          四年级
        </div>
        <div>
          四年级
        </div>

        <div>
          四年级
        </div>
        <div>
          四年级
        </div>

      </div>
    </div>
    <div
      class="flex_wrap"
      style="margin-top: 20px;"
    >
      <div>
        二级目录：
      </div>
      <div>
        <div class="active">
          全部
        </div>
        <div>
          一年级
        </div>
        <div>
          二年级
        </div>
        <div>
          三年级
        </div>
        <div>
          四年级
        </div>
        <div>
          四年级
        </div>
        <div>
          四年级
        </div>
        <div>
          四年级
        </div>
      </div>
    </div>
    <div class="table_wrap">
      <div>
        <img
          src=""
          alt=""
        >
        <div>
          精品课例《孤独的小螃蟹》青青小学刘老师1
        </div>
      </div>
      <div>
        <img
          src=""
          alt=""
        >
        <div>
          精品课例《孤独的小螃蟹》青青小学刘老师1
        </div>
      </div>
      <div>
        <img
          src=""
          alt=""
        >
        <div>
          精品课例《孤独的小螃蟹》青青小学刘老师1
        </div>
      </div>
      <div>
        <img
          src=""
          alt=""
        >
        <div>
          精品课例《孤独的小螃蟹》青青小学刘老师1
        </div>
      </div>

      <div>
        <img
          src=""
          alt=""
        >
        <div>
          精品课例《孤独的小螃蟹》青青小学刘老师1
        </div>
      </div>
      <div>
        <img
          src=""
          alt=""
        >
        <div>
          精品课例《孤独的小螃蟹》青青小学刘老师1
        </div>
      </div>

    </div>
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[8, 16, 24, 32]"
        :page-size="pageSize"
        layout="prev, pager, next"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: "readCenter",
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.readCenter {
  width: 1411px;
  margin: 16px auto;
  border-radius: 16px;
  background: #fff;
  box-sizing: border-box;
  overflow: hidden;
  padding: 28px 90px;
  .flex_wrap {
    display: flex;
    padding-top: 3px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    line-height: 28px;
    border-bottom: 1px solid #e9e9e9;
    & > div:nth-of-type(1) {
      color: rgba(0, 0, 0, 0.85);
      margin-right: 24px;
      width: 70px;
      flex-shrink: 0;
    }
    & > div:nth-of-type(2) {
      div {
        color: rgba(0, 0, 0, 0.65);
        margin-right: 40px;
        text-align: center;
        padding: 0px 11px;
        margin-bottom: 21px;
        cursor: pointer;
        display: inline-block;
      }
      div:hover {
        color: #3d8c6d;
      }
      div.active {
        background: #e1edea;
        border-radius: 6px;
        color: #3d8c6d;
      }
    }
  }
  .table_wrap {
    margin-top: 28px;
    & > div:nth-of-type(4n-1),
    :nth-of-type(4n-2),
    :nth-of-type(4n-3) {
      margin-right: 32px;
    }
    & > div {
      width: 280px;
      display: inline-block;
      margin-bottom: 24px;
      img {
        width: 280px;
        height: 155px;
        border-radius: 16px;
      }
      div {
        width: 280px;
        height: 48px;
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #000000;
        line-height: 24px;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    }
  }
  .pagination {
    display: block;
    display: flex;
    justify-content: center;
  }
}
</style>