<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  background: #f0f2f5;
}
.lib-ui-title-warp {
  height: 56px;
  background: #ffffff;
  border-radius: 6px;
  border: 0px solid rgba(0, 0, 0, 0.88);
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  padding: 0 24px;
  box-sizing: border-box;
  & > div:nth-of-type(1) {
    height: 26px;
    font-size: 18px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.85);
    line-height: 26px;
    display: flex;
    align-items: center;
    .el-form {
      display: inline-block;
      margin-left: 24px;
      display: flex;
      align-items: center;
      & > .el-form-item {
        flex: 1;
        display: flex;
        align-items: center;
        margin-right: 24px;
        margin-bottom: 0;
        .el-form-item__label {
          width: 110px;
          height: 32px;
          background: #f7f9fa;
          border: 1px solid #e9e9e9;
          text-align: left;
          box-sizing: border-box;
          padding: 0 12px;
          font-weight: 500;
          border-radius: 4px 0 0 4px;
          border-right: none;
        }
        & > div {
          flex: 1;
          .el-select,
          .el-cascader,
          .el-input {
            border-radius: 0;
            width: 100%;
            * {
              border-radius: 0 4px 4px 0;
            }
          }
        }
      }
      .el-button {
        float: right;
        margin-left: 10px;
        height: 32px;
      }
    }
  }
  & > div:nth-of-type(2) {
    .el-button {
      background: #3e63ac;
      color: #fff;
    }
  }
}
.lib-ui-content {
  padding: 24px;
  background: #fff;
  position: relative;
  .el-table th {
    color: rgba(0, 0, 0, 0.85);
    background-color: #fafafa !important;
  }
  .el-pagination {
    text-align: right;
    margin-top: 24px;
  }
}
.lib-ui-menu-warp {
  height: 56px;
  background: #ffffff;
  border-radius: 6px;
  margin-bottom: 8px;
  padding: 0 24px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  .el-menu--horizontal > .el-menu-item {
    height: 40px;
    line-height: 40px;
  }
}
.lib-ui-search-warp {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  & > div:nth-of-type(2) {
    width: 220px;
    overflow: hidden;
    .el-button {
      float: right;
      margin-left: 10px;
      height: 32px;
    }
    .el-button--primary {
      color: #fff;
    }
  }
  & > div:nth-of-type(1) {
    flex: 1;
    .el-form {
      & > div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        & > .el-form-item {
          flex: 1;
          display: flex;
          align-items: center;
          margin-right: 24px;
          margin-bottom: 12px;
          .el-form-item__label {
            width: 110px;
            height: 32px;
            background: #f7f9fa;
            border: 1px solid #e9e9e9;
            text-align: left;
            box-sizing: border-box;
            padding: 0 12px;
            border-radius: 4px 0 0 4px;
            border-right: none;
          }
          & > div {
            flex: 1;
            .el-select,
            .el-cascader,
            .el-date-editor,
            .el-date-picker,
            .el-date-editor--daterange.el-input__inner,
            .el-input {
              font-size: 14px;
              border-radius: 0;
              width: 100% !important;
              * {
                border-radius: 0 4px 4px 0;
              }
            }
            .el-date-editor .el-range-separator {
              width: 26px;
            }
          }
        }
      }
    }
  }
}
</style>
