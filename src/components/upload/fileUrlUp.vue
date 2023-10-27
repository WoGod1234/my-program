<template>
  <!-- 文件上传，返回url-->
  <div>
    <el-upload
      action
      :on-change="handleChange"
      :before-remove="beforeRemove"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :auto-upload="false"
      :limit="1"
      :file-list="fileUrl"
    >
      <el-button slot="trigger" type="primary">点击上传</el-button>
    </el-upload>
  </div>
</template>
<script>
// import { multipartFile } from "@/api/hjwsys.js";
export default {
  name: "fileUrlUp",
  props: ["fileProps"],
  data() {
    return {
      fileUrl: "",
    };
  },
  methods: {
    handleChange(file) {
      if (this.fileProps.fileSize) {
        const FIVE_M = this.fileProps.fileSize
          ? this.fileProps.fileSize * 1024 * 1024
          : "";
        if (file.size > FIVE_M && this.fileProps.fileSize) {
          this.$message.error("文件最大上传" + this.fileProps.fileSize + " M!");
          this.fileUrl = [];
          return;
        }
      } else {
        // console.log("文件无大小限制要求");
      }
      if (this.fileProps.fileType) {
        if (
          [this.fileProps.fileType][0].indexOf(
            file.name.split(".")[file.name.split(".").length - 1].toLowerCase()
          ) == -1
        ) {
          this.$message.error(
            "请上传" + [this.fileProps.fileType][0] + " 类型文件!"
          );
          this.fileUrl = [];
          return;
        }
      } else {
        // console.log("文件无类型限制要求");
      }
      let data = new FormData();
      data.append("file", file.raw);
      this.$loading({
        text: "文件上传中，请耐心等待...",
      });
      multipartFile(data)
        .then((res) => {
          if (res.data.code == 0) {
            this.fileUrl = res.data.data;
            this.$emit("getUrl", this.fileUrl);
            this.$loading().close();
          }
        })
        .catch(() => {
          this.$loading().close();
        });
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleRemove() {
      this.fileUrl = "";
      this.$emit("getUrl", this.fileUrl);
    },
    handleSuccess() {
      console.log("handleSuccess");
    },
  },
};
</script>
<style lang="less" scoped></style>
