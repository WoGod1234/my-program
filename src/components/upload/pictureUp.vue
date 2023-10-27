<template>
  <div class="pictureUp">
    <el-upload
      action="/api/admin/uploadFile"
      :headers="headers"
      :show-file-list="childrenProps.childrenPicStyle"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      :on-remove="handleRemove"
    >
      <div v-if="!childrenProps.childrenPicStyle">
        <img
          v-if="imgUrl"
          :src="imgUrl"
          class="avatar"
        />
        <i
          v-else
          class="el-icon-plus avatar-uploader-icon"
        ></i>
      </div>
      <div v-if="childrenProps.childrenPicStyle">
        <el-button
          type="primary"
          slot="trigger"
        >上传图片</el-button>
      </div>
    </el-upload>
  </div>
</template>
<script>
import store from "@/store";
export default {
  name: "pictureUp",
  props: ["childrenProps"],
  data() {
    return {
      imgUrl: "",
    };
  },
  computed: {
    headers: function () {
      return {
        Authorization: "Bearer " + store.getters.access_token,
      };
    },
  },
  created() {},
  methods: {
    handleRemove(e) {
      this.$emit("getPicUrl", "");
    },
    // 子组件将图片url传给父组件
    handleAvatarSuccess(res) {
      this.imgUrl = res.data;
      this.$emit("getPicUrl", this.imgUrl);
    },
    beforeAvatarUpload(file) {
      if (this.childrenProps.childrenPicSize != undefined) {
        const isLt2M =
          file.size / 1024 / 1024 < this.childrenProps.childrenPicSize;
        if (!isLt2M) {
          this.$message.error(
            "上传图片大小不能超过 " + this.childrenProps.childrenPicSize + "MB!"
          );
          this.imgUrl = "";
          return false;
        }
      }
      // 限制图片上传类型
      if (
        [this.childrenProps.childrenPicType][0].indexOf(
          file.name.split(".")[file.name.split(".").length - 1].toLowerCase()
        ) == -1 &&
        this.childrenProps.childrenPicType != ""
      ) {
        this.$message.error(
          "图片格式错误，仅支持" +
            this.childrenProps.childrenPicType +
            "格式图片，请重新上传!"
        );
        this.imgUrl = "";
        return false;
      }
      return true;
    },
  },
};
</script>
