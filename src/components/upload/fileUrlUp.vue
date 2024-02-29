<template>
  <!-- 文件上传，返回url;
  fileProps:{
    fileSize:''//文件大小
    fileType:''//文件类型
    limitNum:''//文件数
    fileText:''//文案
  }
  fileList//传值 -->
  <div class="fileUrlUp">
    <el-upload
      action
      :on-change="handleChange"
      :on-success="handleSuccess"
      :on-exceed="handleExceed"
      :limit="fileProps.limitNum"
      :file-list="fileList"
      :auto-upload="false"
      :show-file-list="false"
    >
      <el-button
        slot="trigger"
        type="primary"
      >{{fileProps.fileText}}</el-button>
    </el-upload>
    <div
      v-for="(item, index) in fileList"
      class="listFile"
    >
      <div>{{ item.fileName }}</div>
      <div
        class="close"
        @click="delFile(index,item.fileName)"
      ></div>
    </div>
  </div>
</template>
<script>
//import { uploadFile } from "@/api/xh.js";
export default {
  name: "fileUrlUp",
  props: ["fileProps", "fileList"],
  data() {
    return {
      arrayList: [],
    };
  },
  watch: {
    arrayList() {
      this.fileList = this.arrayList;
    },
  },
  methods: {
    handleChange(file) {
      if (this.fileProps.fileSize) {
        const FIVE_M = this.fileProps.fileSize
          ? this.fileProps.fileSize * 1024 * 1024
          : "";
        if (file.size > FIVE_M && this.fileProps.fileSize) {
          this.$message.error("文件最大上传" + this.fileProps.fileSize + " M!");
          this.fileList = [];
          return;
        }
      } else {
        // console.log("文件无大小限制要求");
      }
      if (
        this.fileProps.fileType &&
        [this.fileProps.fileType][0].indexOf(
          file.name.split(".")[file.name.split(".").length - 1].toLowerCase()
        ) == -1
      ) {
        this.$message.error(
          "请上传" + [this.fileProps.fileType][0] + " 类型文件!"
        );
        this.fileList = [];
        return;
      } else {
        // console.log("文件无类型限制要求");
      }
      let data = new FormData();
      data.append("file", file.raw);
      this.$loading({
        text: "文件上传中，请耐心等待...",
      });
      uploadFile(data)
        .then((res) => {
          if (res.data.code == 0) {
            this.arrayList.push({
              // fileName: file.name.substring(0, file.name.lastIndexOf(".")),
              fileName: file.name,
              fileUrl: res.data.data,
            });
            this.$emit("getUrl", this.arrayList);
            this.$loading().close();
          }
        })
        .catch(() => {
          this.$loading().close();
        });
    },
    delFile(index, fileName) {
      this.$confirm(`确定移除 ${fileName}？`)
        .then(() => {
          this.fileList.splice(index, 1);
          this.$emit("getUrl", this.fileList);
        })
        .catch(() => {});
    },
    handleExceed() {
      this.$message.warning(`当前限制上传 ${this.fileProps.limitNum} 个文件`);
    },
    handleSuccess() {
      console.log("handleSuccess");
    },
  },
};
</script>
<style lang="scss" scoped>
.fileUrlUp {
  .listFile {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .close {
      position: relative;
      width: 2px;
      height: 16px;
      background: #ccc;
      -webkit-transform: rotate(45deg);
      -moz-transform: rotate(45deg);
      -o-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
      display: inline-block;
      margin-right: 10px;
      cursor: pointer;
    }
    .close:after {
      position: absolute;
      top: 0;
      left: 0;
      content: "";
      width: 2px;
      height: 16px;
      background: #ccc;
      -webkit-transform: rotate(270deg);
      -moz-transform: rotate(270deg);
      -o-transform: rotate(270deg);
      -ms-transform: rotate(270deg);
      transform: rotate(270deg);
      margin-right: 10px;
    }
  }
}
</style>
