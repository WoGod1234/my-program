<template>
  <!-- 文件流上传 -->
  <div>
    <el-upload
      action
      :on-change="handleChange"
      :before-remove="beforeRemove"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :limit="1"
      :auto-upload="false"
      :file-list="fileList"
    >
      <el-button slot="trigger" type="primary">点击上传</el-button>
    </el-upload>
  </div>
</template>
<script>
export default {
  name: "fileBinary",
  props: ["fileProps"],
  data() {
    return {
      fileList: [],
    };
  },
  methods: {
    handleChange(file, fileList) {
      if (this.fileProps.fileSize) {
        const FIVE_M = this.fileProps.fileSize
          ? this.fileProps.fileSize * 1024 * 1024
          : "";
        if (file.size > FIVE_M) {
          this.$message.error("文件最大上传" + this.fileProps.fileSize + " M!");
          this.fileList = [];
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
          this.fileList = [];
          return;
        }
      } else {
        // console.log("文件无类型限制要求");
      }
      this.fileList = [file.raw];
      this.$emit("getFile", this.fileList);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleRemove() {
      this.fileList = [];
      this.$emit("getFile", this.fileList);
    },
    handleSuccess() {
      console.log("handleSuccess");
    },
  },
};
</script>
<style scoped></style>
