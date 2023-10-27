<template>
  <div>
    <div ref="qrCodeDiv"></div>
  </div>
</template>
<script>
import QRCode from "qrcodejs2";
export default {
  name: "scanCode",
  props: ["linkValue"],
  data() {
    return {

    };
  },
  // watch: {
  //   linkValue: function () {
  //     this.$nextTick(function () {
  //       this.bindQRCode();
  //     });
  //   },
  // },
  mounted: function () {
    this.$nextTick(function () {
      this.bindQRCode();
    })
  },
  methods: {
    bindQRCode() {
      new QRCode(this.$refs.qrCodeDiv, {
        text: this.linkValue,
        width: 200,
        height: 200,
        colorDark: "#333333", //二维码颜色
        colorLight: "#ffffff", //二维码背景色
        correctLevel: QRCode.CorrectLevel.L, //容错率，L/M/H
      });
    },
  },
};
</script>
