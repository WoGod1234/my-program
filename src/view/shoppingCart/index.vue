<template>
  <div class="shoppingCart">
    <div @click="getList">我的购物车</div>
    <div
      v-for="(item,index) in cartList"
      class="list_style"
    >
      <img
        :src="require(item.selected?'@/image/radio1.png':'@/image/radio.png')"
        alt=""
        @click="selected(index)"
      >
      <div>
        <img
          :src="require('../../image/'+item.imgUrl+'.png')"
          alt=""
        >
        <div>
          <img
            src="@/image/del.png"
            alt=""
            class="del"
            @click="delItem(index)"
          >
          <div class="t">
            商品名称：{{ item.title }}
          </div>
          <div class="p">
            商品价格：{{ item.price }} 元
          </div>
          <div class="n">
            <div @click="decCount(index)">-</div>
            <div>
              {{ item.num }}
            </div>
            <div @click="addCount(index)">
              +
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="count_style"
      v-if="cartList.length>0"
    >
      <div
        style="display: flex;"
        @click="selectAll"
      >
        <img
          :src="require(selectTag?'@/image/radio1.png':'@/image/radio.png')"
          alt=""
        ><span style="margin-left: 20px;">全选</span>
      </div>
      <div>
        总价：{{ totalPrice }} 元
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "shoppingCart",
  data() {
    return {
      cartList: [],
      selectTag: false,
      totalPrice: "0",
    };
  },
  created() {},
  methods: {
    getList() {
      if (this.cartList.length > 5) {
        this.$message.warning("购物车商品已满，请勿再次添加");
        return;
      }
      let imgList = ["c1", "c2", "c3", "c4"];
      let imgUrl = imgList[Math.floor(Math.random() * imgList.length)];
      // let nameList = ["张志星", "张盛祺", "徐艺华"];
      let nameList = ["江西", "乐平", "景德镇"];
      let itemName = nameList[Math.floor(Math.random() * nameList.length)];
      let price = Math.random() * 100;
      this.cartList.push({
        title:
          itemName + " " + Math.floor(Math.random() * nameList.length) + "号",
        imgUrl: imgUrl,
        num: Math.floor(Math.random() * 10),
        price: price.toFixed(2),
        selected: false,
      });
      console.log(this.cartList);
      if (!this.cartList.every((item) => item.selected)) {
        this.selectTag = false;
      }
    },
    delItem(e) {
      this.cartList.splice(e, 1);
      this.computedTotal();
    },
    selected(e) {
      this.cartList[e].selected = !this.cartList[e].selected;
      if (!this.cartList.every((item) => item.selected)) {
        this.selectTag = false;
      } else {
        this.selectTag = true;
      }
      this.computedTotal();
    },
    decCount(e) {
      --this.cartList[e].num;
      if (this.cartList[e].num < 0) {
        this.cartList.splice(e, 1);
      }
      this.computedTotal();
    },
    addCount(e) {
      ++this.cartList[e].num;
      this.computedTotal();
    },
    selectAll() {
      this.selectTag = !this.selectTag;
      if (this.selectTag) {
        this.cartList.map((item) => {
          item.selected = true;
        });
      } else {
        this.cartList.map((item) => {
          item.selected = false;
        });
      }
      this.computedTotal();
    },
    computedTotal() {
      this.totalPrice = 0;
      this.cartList.map((item) => {
        if (item.selected) {
          this.totalPrice = this.totalPrice + item.price * item.num;
        }
      });
      this.totalPrice = this.totalPrice.toFixed(2);
    },
  },
};
</script>
<style lang='scss' scoped>
.list_style {
  display: flex;
  align-items: center;
  img {
    width: 20px;
    height: 20px;
  }
  & > div {
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    width: 420px;
    & > div {
      flex: 1;
      position: relative;
      margin-left: 20px;
      .del {
        width: 20px;
        height: 20px;
        position: absolute;
        right: 0px;
      }
      .t {
        height: 80px;
      }
      .n {
        position: absolute;
        bottom: 0px;
        right: 0px;
        width: 100px;
        height: 30px;
        border: 1px solid #dadada;
        border-radius: 30px;
        padding: 10px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        line-height: 10px;
      }
      .p {
      }
    }
    img {
      width: 100px;
      height: 100px;
      border-radius: 12px;
    }
  }
}
.count_style {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 380px;
  position: absolute;
  top: 640px;
  img {
    width: 20px;
    height: 20px;
  }
}
.shoppingCart {
  height: 500px;
  overflow: auto;
}
::-webkit-scrollbar {
  width: 0px;
}
</style>


