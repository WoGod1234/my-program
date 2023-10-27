<template>
  <div class="avue">
    <div class="avue-left">
      <leftPage :isCollapse="isCollapse"></leftPage>
    </div>
    <div class="avue-right">
      <div class="title">
        <el-radio-group
          v-model="isCollapse"
          style="margin-bottom: 20px;"
        >
          <el-radio-button :label="false">展开</el-radio-button>
          <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group>
        web端开发用例
      </div>
      <div class="warp_box">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import leftPage from "./leftPage/index.vue";
export default {
  components: { leftPage },
  data() {
    return {
      isCollapse: false,
      themeColor: false,
    };
  },
  methods: {
  },
};
</script>
<style lang="less" scoped>
.avue {
  display: flex;
}
.avue-left {
  background: #fff;
}

.avue-right {
  flex: 1;
}
.title {
  height: 80px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  padding: 30px 40px 0px 40px;
  box-sizing: border-box;
}
.warp_box {
  padding: 20px;
  background: #fff;
  width: 99%;
  margin: 20px auto;
  border-radius: 10px;
  box-sizing: border-box;
  height: 800px;
}
</style>