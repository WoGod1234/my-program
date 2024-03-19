<template>
  <basic-container>
    <div class="lib-ui-title-warp">
      <div class="lib_ui_title">
        <div @click="getBack">返回上一页</div>
      </div>
      <div>
        <el-button type="primary" @click="addBook()">添加图书</el-button>
      </div>
    </div>
    <div class="lib-ui-content">
      <div class="lib-ui-search-warp">
        <div>
          <el-form
            :inline="true"
            :model="formInline"
            class="demo-form-inline searchForm"
          >
            <div class="lib-ui-search-flex" style="width: 400px">
              <el-form-item :label="childrenProps.label2 + '：'" prop="author">
                <el-input
                  v-model="formInline.author"
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
            </div>
          </el-form>
        </div>
        <div>
          <el-button type="primary" @click="onSearch">查询</el-button>
          <el-button
            type="warning"
            @click="onReset"
            style="
              background: #ffffff;
              color: rgba(0, 0, 0, 0.65);
              border: 1px solid #d9d9d9;
            "
            >重置</el-button
          >
        </div>
      </div>
      <el-table
        ref="multipleTable"
        :data="List"
        tooltip-effect="dark"
        style="width: 100%"
        class="tableClass"
        border
      >
        <el-table-column :label="childrenProps.label2"> </el-table-column>
        <el-table-column label="覆盖范围"> </el-table-column>
        <el-table-column label="添加时间"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)">修改</el-button>
            <el-button @click="del(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
      width="600px"
      :show-close="false"
      :title="title"
    >
      <el-form :model="form" ref="form">
        <el-form-item
          :label="childrenProps.label2"
          :prop="childrenProps.value"
          :key="childrenProps.value"
          :rules="[
            {
              required: true,
              message: '请输入' + childrenProps.label2,
              trigger: 'blur',
            },
          ]"
        >
          <el-input
            v-model="form[childrenProps.value]"
            maxlength="100"
            @input="change($event, childrenProps.value)"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="覆盖范围"
          prop="coverRange"
          :rules="[
            {
              required: true,
              message: '请输入覆盖范围',
              trigger: 'change',
            },
          ]"
        >
          <el-cascader
            :options="areaList"
            :props="{ checkStrictly: true, value: 'id', label: 'name' }"
            v-model="form.coverRange"
            clearable
            placeholder="请选择"
            style="width: 100%"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="formSumbit" style="text-align: center">
        <el-button @click="handClose">取 消</el-button>
        <el-button type="primary" @click="dataFormSubmit">确 认</el-button>
      </div>
    </el-dialog>
  </basic-container>
</template>

<script>
// import { fetchTree } from "@/api/admin/area";
import { getTreeData } from "@/util/util";
export default {
  name: "badBook",
  props: ["childrenProps"],
  data() {
    return {
      formInline: {
        author: "",
      },
      form: {
        coverRange: "",
      },
      dialogVisible: false,
      title: "",
      List: [],
      areaList: [], //业务渠道地址数据数组
    };
  },
  created() {
    this.getAreaList();
  },
  mounted() {
    this.form[this.childrenProps.value] = "";
  },
  methods: {
    getBack() {
      this.$emit("getBack");
    },
    change(e, typeName) {
      this.$delete(this.form, typeName);
      this.$set(this.form, typeName, e);
    },
    addBook() {
      this.dialogVisible = true;
      this.title = "添加";
    },
    edit(row) {
      this.dialogVisible = true;
      this.title = "修改";
    },
    onSearch() {},
    onReset() {},
    handClose() {
      this.dialogVisible = false;
      this.form[this.childrenProps.value] = "";
      this.form.coverRange = "";
      this.$refs["form"].resetFields();
    },
    dataFormSubmit() {
      console.log(this.form);
      this.$refs["form"].validate((valid) => {
        if (valid) {
        } else {
          return false;
        }
      });
    },
    del(row) {
      this.$confirm("确定删除该项？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        showClose: false,
      }).then(() => {});
    },
    getAreaList() {
      this.loading = true;
      fetchTree()
        .then((response) => {
          this.loading = false;
          this.areaList = getTreeData(response.data.data);
        })
        .catch(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style scoped="scoped" lang="scss"></style>
