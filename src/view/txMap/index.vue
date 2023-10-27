<template>
  <div class="index">
    <!-- 地图容器 -->
    <el-select
      v-model="addressValue"
      multiple
      filterable
      remote
      reserve-keyword
      placeholder="请输入关键词"
      :remote-method="getsuggest"
      :loading="loading"
      style="width: 100%;margin-bottom: 30px;"
    >
      <el-option
        v-for="item in addressList"
        :key="item.id"
        :label="item.title+'——'+item.address"
        :value="item.id"
      >
      </el-option>
    </el-select>
    <div id="container"></div>
  </div>
</template>
<script>
import API from "@/api/admin";
export default {
  data() {
    return {
      addressValue: "",
      addressList: [],
      //点数据数组

      markerArr: [
        {
          id: "1", //点标记唯一标识，后续如果有删除、修改位置等操作，都需要此id

          styleId: "myStyle", //指定样式id

          position: new TMap.LatLng(30.33610725981676, 112.24231780622101), //点标记坐标位置

          properties: {
            //自定义属性

            title: "荆州市政府",
          },
        },
      ],
    };
  },
  mounted() {
    // 调用
    this.initMap();
  },
  created() {
    API.login({ user: "666" }).then((res) => {});
  },
  methods: {
    //触发关键词输入提示事件
    /**
     * @param {输入值} e
     */
    getsuggest: function (e) {
      let that = this;
      if (e.length <= 0) {
        //用于接收地址列表的数组，在data声明
        that.addressList = [];
        return;
      }
      // 在执行这一步之前要配置跨域，不然会报错
      this.$axios
        .get("/api2/ws/place/v1/suggestion", {
          params: {
            keyword: e, //关键字
            region: that.city, //当前城市
            key: "RBNBZ-QUO6F-4NWJN-NYP2R-U22Z2-QFBTP", //你申请的key
          },
        })
        .then((res) => {
          //成功返回的信息
          console.log(that.city);
          console.log(res);
          that.addressList = res.data.data;
        })
        .catch((err) => {
          console.log(err);
          this.$message.error("请求超时");
        });
    },
    initMap() {
      //设置一个默认的中心点 (荆州市)

      var center = new TMap.LatLng(30.35269, 112.19016);

      //初始化地图

      var map = new TMap.Map(document.getElementById("container"), {
        center: center, //设置地图中心点坐标

        // zoom: 17.2,   //设置地图缩放级别

        // pitch: 43.5,  //设置俯仰角

        // rotation: 45    //设置地图旋转角度
      });

      map.setCenter(new TMap.LatLng(this.lat, this.lng));

      //使用定位来获取当前位置调整中心点

      // 新建一个IP定位类

      var ipLocation = new TMap.service.IPLocation();

      // 未给定ip地址则默认使用请求端的ip地址(params)

      var params = {};

      ipLocation
        .locate(params) //发送定位请求获得ip地址

        .then((result2) => {
          console.log(result2.result.location);

          //将获得的ip地址信息（经纬度）改变地图的中心点

          map.setCenter(
            new TMap.LatLng(
              result2.result.location.lat,
              result2.result.location.lng
            )
          );
        })

        .catch((error) => {
          console.log(error);
        });

      //设定marker点及其样式

      var markerLayer = new TMap.MultiMarker({
        map: map, //指定地图容器

        //样式定义

        styles: {
          //创建一个styleId为"myStyle"的样式（styles的子属性名即为styleId）

          myStyle: new TMap.MarkerStyle({
            width: 25, // 点标记样式宽度（像素）

            height: 35, // 点标记样式高度（像素）

            // "src": './images/R-C.png',  //图片路径

            //焦点在图片中的像素位置，一般大头针类似形式的图片以针尖位置做为焦点，圆形点以圆心位置为焦点

            // "anchor": { x: 16, y: 32 }  //marker点图片跟据焦点位置的偏移量
          }),
        },

        //点标记数据数组

        geometries: this.markerArr,

        // 点标记数组格式

        //   geometries: [

        //     {

        //     "id": "1",   //点标记唯一标识，后续如果有删除、修改位置等操作，都需要此id

        //     "styleId": 'myStyle',  //指定样式id

        //     "position": new TMap.LatLng(30.33864600881732, 112.22565830821229),  //点标记坐标位置

        //     "properties": {//自定义属性

        //       "title": "荆州万达广场",

        //     }

        //   }

        // ]
      });

      //设置信息窗口

      var infoWindow = new TMap.InfoWindow({
        map: map,

        position: new TMap.LatLng(39.984104, 116.307503), //信息窗口默认位置
      });

      //信息窗口设置完后默认是打开的 可以先关闭初始信息窗口

      infoWindow.close();

      //监听marker点击事件

      markerLayer.on("click", function (evt) {
        infoWindow.close(); //先关闭已打开信息窗口

        infoWindow.open(); //再打开 并赋给新的值

        infoWindow.setPosition(evt.geometry.position); //设置信息窗位置

        infoWindow.setContent(
          `<div><img class="img" src="https://t7.baidu.com/it/u=4198287529,2774471735&fm=193&f=GIF" alt=""><p>${evt.geometry.properties.title}</p></div>`
        ); //设置信息窗内容

        console.log(evt);
      });

      // 监听地图点击事件

      // map.on('click',function(evt){

      // console.log(evt);

      // })
    },
  },
};
</script>
<style scoped>
#container {
  width: 100%;
  height: 100%;
  border: 1px solid red;
}
.img {
  width: 150px;
}
</style>