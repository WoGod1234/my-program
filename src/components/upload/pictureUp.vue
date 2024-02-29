<template>
  <div class="pictureUp">
    <el-upload
      action="/api/admin/uploadFile"
      :headers="headers"
      :show-file-list="childrenProps.childrenPicStyle"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      :on-remove="handleRemove"
      :limit="childrenProps.limitNum"
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
// import store from "@/store";
export default {
  name: "pictureUp",
  props: ["childrenProps", "imgUrl"],
  data() {
    return {};
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
      if (this.childrenProps.childrenPicSize) {
        const isLtMb =
          file.size / 1024 / 1024 < this.childrenProps.childrenPicSize;
        if (!isLtMb) {
          this.$message.error(
            "上传图片大小不能超过 " + this.childrenProps.childrenPicSize + "MB!"
          );
          return false;
        }
      }
      // 限制图片上传类型
      if (
        this.childrenProps.childrenPicType &&
        [this.childrenProps.childrenPicType][0].indexOf(
          file.name.split(".")[file.name.split(".").length - 1].toLowerCase()
        ) == -1
      ) {
        this.$message.error(
          "图片格式错误，仅支持" +
            this.childrenProps.childrenPicType +
            "格式图片，请重新上传!"
        );
        return false;
      }
    },
  },
};
</script>
