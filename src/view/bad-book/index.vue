<template>
  <basic-container>
    <el-button @click="printSource">打印</el-button>
<div ref="printContent">
    <div class="lib-ui-title-warp" v-if="!isShow">
      <div class="lib_ui_title">
        <div>不良图书</div>
      </div>
    </div>
    <div class="lib-ui-content" v-if="!isShow" style="padding: 32px">
      <div style="display: flex; flex-wrap: wrap">
        <div
          class="content_wrap"
          @click="showDetail(item)"
          v-for="(item, index) in typeList"
        >
          <img :src="item.image" alt="" />
          <div class="text_1">按{{ item.label }}管理</div>
        </div>
      </div>
      <div>
        <div class="text_2">不良图书说明</div>
        <div class="text_2" style="margin-top: 12px">
          <div
            style="
              width: 4px;
              height: 4px;
              background: rgba(0, 0, 0, 0.45);
              border-radius: 50%;
            "
          ></div>
          <div style="margin-left: 9px">
            提供多种设置为不良图书的方式，请选择一种开始管理不良图书
          </div>
        </div>
        <div class="text_2" style="margin-top: 8px">
          <div
            style="
              width: 4px;
              height: 4px;
              background: rgba(0, 0, 0, 0.45);
              border-radius: 50%;
            "
          ></div>
          <div style="margin-left: 9px">
            不良图书会根据设置条件和范围自动防护（图书编目防护、借阅流通防护）
          </div>
        </div>
      </div>
    </div>
    <badBook
      :childrenProps="childrenProps"
      v-if="isShow"
      @getBack="getBack"
    ></badBook>
</div>

  </basic-container>
</template>

<script>
import badBook from "@/components/badBook/index.vue";
import html2canvas from "html2canvas";
import printJS from "print-js";
export default {
  name: "bad-book",
  components: { badBook },
  data() {
    return {
      typeList: [
        {
          label: "【ISBN】",
          label2: "ISBN",
          value: "isbn",
          image: require("../../image/bad-book1.png"),
        },
        {
          label: "【书名】",
          label2: "书名",
          value: "bookName",
          image:require("../../image/bad-book2.png"),
        },
        {
          label: "【作者】",
          label2: "作者",
          value: "author",
          image: require("../../image/bad-book3.png"),
        },
        {
          label: "【出版社】",
          label2: "出版社",
          value: "publish",
          image: require("../../image/bad-book4.png"),
        },
        {
          label: "【分类号】",
          label2: "分类号",
          value: "codeNo",
          image: require("../../image/bad-book5.png"),
        },
      ],
      isShow: false,
      childrenProps: {},
    };
  },
  methods: {
    getBack() {
      this.isShow = false;
      this.childrenProps = {};
    },
    showDetail(e) {
      this.childrenProps = e;
      this.isShow = true;
    },
     printSource() {
      html2canvas(this.$refs.printContent, {
        backgroundColor: null,
        useCORS: true,
        // windowHeight: document.body.scrollHeight
      }).then((canvas) => {
        // let url = canvas.toDataURL('image/jpeg', 1.0)
        const url = canvas.toDataURL();
        this.img = url;
        printJS({
          printable: url,
          type: "image",
          documentTitle: "打印图片",
        });

        // ////console.log(url)
      });
    },
  },
};
</script>

<style scoped="scoped" lang="scss">
.content_wrap:nth-child(2n) {
  margin-left: 40px;
}

.content_wrap {
  width: 512px;
  height: 107px;
  background: #f6f6f6;
  border-radius: 8px;
  cursor: pointer;
  padding: 24px 0 23px 26px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  img {
    width: 64px;
    height: 60px;
    background: #f6f6f6;
    border-radius: 8px;
  }
}
.text_1 {
  font-family: PingFangSC, PingFang SC;
  font-weight: 500;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.85);
  line-height: 24px;
  text-align: left;
  font-style: normal;
  margin-left: 29px;
}
.text_2 {
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.65);
  line-height: 24px;
  text-align: left;
  font-style: normal;
  display: flex;
  align-items: center;
}

</style>
