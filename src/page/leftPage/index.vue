<template>
  <div>
    <el-menu
      router
      background-color="#0CA898"
      text-color="#fff"
      active-text-color="#ffd04b"
      style="height: 1000px;"
      :collapse="this.isCollapse"
      :unique-opened="true"
    >
      <!-- <el-submenu index="1">
        <template slot="title">
          <span>柯南魔方</span>
        </template>
        <el-menu-item index="/menu/moFang">魔方</el-menu-item>
      </el-submenu> -->
      <el-submenu index="7">
        <template slot="title">
          <span>打印</span>
        </template>
        <el-menu-item index="/menu/slideTab">打印</el-menu-item>
      </el-submenu>
      <el-submenu index="9">
        <template slot="title">
          <span>购物车</span>
        </template>
        <el-menu-item index="/menu/shoppingCart">购物车</el-menu-item>
      </el-submenu>
      <el-submenu index="10">
        <template slot="title">
          <span>监控中心</span>
        </template>
        <el-menu-item index="/menu/autoPrint">监控中心</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <span>腾讯地图</span>
        </template>
        <el-menu-item index="/menu/txMap">地图</el-menu-item>
      </el-submenu>
      <!-- <el-submenu index="2">
        <template slot="title">
          <span>时钟八卦图</span>
        </template>
        <el-menu-item index="/menu/bgClock">时钟</el-menu-item>
      </el-submenu> -->
      <el-submenu index="4">
        <template slot="title">
          <span>table行合并</span>
        </template>
        <el-menu-item index="/menu/tableRow">行合并</el-menu-item>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <span>放假通知</span>
        </template>
        <el-menu-item index="/menu/transForm">放假通知</el-menu-item>
      </el-submenu>
      <!-- <el-submenu index="6">
        <template slot="title">
          <span>树结构</span>
        </template>
        <el-menu-item index="/menu/tree">树结构</el-menu-item>
      </el-submenu> -->
      <el-submenu index="8">
        <template slot="title">
          <span>Js实用</span>
        </template>
        <el-menu-item index="/menu/useJs">Js实用</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: "leftPage",
  props: ["isCollapse"],
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="less" scoped>
.el-menu {
  border-right: solid 1px #e6e6e6;
  list-style: none;
  position: relative;
  margin: 0;
  background-color: #fff;
  padding: 40px 20px;
  box-sizing: border-box;
}
</style>
