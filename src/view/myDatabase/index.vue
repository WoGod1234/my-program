<template>
    <div>
        <el-form :model="form" :inline="true">
            <el-form-item label="ID">
                <el-input v-model="form.id"></el-input></el-form-item>
            <el-form-item label="姓名">
                <el-input v-model="form.username"></el-input></el-form-item>
            <el-form-item label="手机号">
                <el-input v-model="form.phone"></el-input></el-form-item>
            <el-form-item label="密码">
                <el-input v-model="form.password"></el-input></el-form-item>
        </el-form>
        <el-button @click="submit" type="primary">添加确认</el-button>
        <el-button @click="edit" type="waring">修改确认</el-button>
        <el-table :data="tableData" border tooltip-effect="dark" style="width: 100%"
            :header-cell-style="{ 'text-align': 'center' }" :cell-style="{ 'text-align': 'center' }">
            <el-table-column prop="id" label="ID"></el-table-column>
            <el-table-column prop="username" label="姓名"></el-table-column>
            <el-table-column prop="phone" label="手机号"></el-table-column>
            <el-table-column prop="password" label="密码"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="del(scope.row)">删除</el-button>
                </template>
            </el-table-column>

        </el-table>
    </div>
</template>
<script>
import API from "@/api/admin.js";

export default {
    name: "myDatabase",
    data() {
        return {
            tableData: [],
            form: {
                id: '',
                username: '',
                phone: "",
                password: ''
            }
        };
    },
    created() {
        this.userInfo();
    },
    methods: {
        userInfo() {
            let t = this;
            API.userInfo().then((res) => {
                t.tableData = res.data
            });
        },
        submit() {
            API.addUser(this.form).then(res => {
                if (res.data.code == 200) {
                    this.$message.success('添加成功')
                    this.userInfo()
                }
            })
        },
        edit() {
            let idList = []
            this.tableData.map(item => {
                idList.push(item.id)
            })
            if (idList.indexOf(this.form.id) == -1) {
                this.$message.error('用户不存在')
                return
            }
            if (this.form.id) {
                this.$message.error('用户不存在')
                return
            }
            API.updateUser(this.form).then(res => {
                if (res.data.code == 200) {
                    this.$message.success('修改成功')
                    this.userInfo()
                }
            })
        },
        del(row) {
            this.$confirm("确认删除？" + row.username)
                .then(() => {
                    API.delUser({ id: row.id }).then(res => {
                        if (res.data.code == 200) {
                            this.$message.success('删除成功')
                            this.userInfo()
                        }
                    })
                })
                .catch(() => { });
        }
    },
};
</script>