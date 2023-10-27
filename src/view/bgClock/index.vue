<template>
  <div>
    <scanCode :linkValue="linkValue"></scanCode>
    <div @click="clickTo">
      时钟八卦
    </div>
  </div>
</template>
<script>
import scanCode from "@/components/qrCode/index.vue";
export default {
  components: { scanCode },
  data() {
    return {
      linkValue:'https://www.baidu.com'
    }
  },
  created() {
    this.areaList()
  },
  methods: {
    //地区
    areaList() {
      this.$axios.get('/api3/admin/statisticsArea/areaList').then((res) => {
        
      })
    },
    clickTo() {
      window.open("/clock.html", "_blank");
    },
  },
};
</script>