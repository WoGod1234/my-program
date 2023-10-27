<template>
  <div style="display: flex;justify-content: space-around;">
    <div>
      <p @click="add">添加</p>
      <div v-for="(item,index) in arrayList">
        {{ item }}
        <p
          @click="del(index)"
          style="display: inline-block;color: red;"
        >删除</p>
      </div>
    </div>
    <div>
      <div
        v-for="(item,key,index) in arrayList2"
        v-if="num==(key+1)"
      >
        <p>第{{num}}个--{{key}}--{{item}}</p>
        <div style="display: flex;justify-content: space-between;">
          <div @click="ahead(key)">
            上一个
          </div>
          <div
            @click="next(num)"
            v-if="key<arrayList2.length"
          >
            下一个
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "useJs",
  data() {
    return {
      arrayList: [],
      arrayList2: [],
      num: 0,
    };
  },
  created() {
    this.computeNum();
  },
  methods: {
    computeNum() {
      this.arrayList.map((item) => {
        if (!item.count) {
          item.count = 1;
        }
      });
      for (let i = 0; i < this.arrayList.length; i++) {
        for (let j = i + 1; j <= this.arrayList.length; j++) {
          if (this.arrayList[j]) {
            if (this.arrayList[i].name == this.arrayList[j].name) {
              this.arrayList[i].count++;
              this.arrayList.splice(j, 1);
              j = j - 1;
            }
          }
        }
      }
    },
    add() {
      console.log("add");
      this.arrayList.push({
        name: "无敌是" + Math.floor(Math.random() * 10) + "多么寂寞",
      });
      this.num++;
      this.arrayList2.push({
        name: "测试组" + Math.floor(Math.random() * 10),
      });
      this.computeNum();
    },
    del(index) {
      console.log("del");
      this.arrayList.splice(index, 1);
    },
    ahead(key) {
      if (key == 0) {
        this.$message.error("当前已是第一项");
        return;
      }
      this.num--;
    },
    next(num) {
      if (num == this.arrayList2.length) {
        this.$message.error("当前已是最后一项");
        return;
      }
      this.num++;
    },
  },
};
</script>
<style scoped>
</style>