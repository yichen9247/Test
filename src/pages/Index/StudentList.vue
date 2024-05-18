
<script setup>
    import "./assets/StudentList.css"
    import { onUnmounted } from 'vue'
    import upload from "@/scripts/upload.js"
    import { useUIStore } from "@/stores/UIStore.js"
    import { useDataStore } from "@/stores/DataStore.js"
    import { Operation, RefreshRight, FullScreen } from '@element-plus/icons-vue'

    const UIStore = useUIStore();
    const DataStore = useDataStore();
    onUnmounted(async () => await upload.removeStoreStatus());

    const readTotalStudentInfo = async (id) => {
        if (DataStore.uploadStatus) {
            open(`/screen?id=A&key=${id}`);
        } else ElMessage({type: 'warning',message: "请先上传数据！"});
    }

    const readStudentInfo = async (id) => {
        if (DataStore.uploadStatus) {
            open(`/screen?id=P&key=${id.id}`);
        } else ElMessage({type: 'warning',message: "请先上传数据！"});
    }

    const readGroupStudyAsde = async (id) => {
        if (DataStore.uploadStatus) {
            open(`/screen?id=T-2&key=${id}`);
        } else ElMessage({type: 'warning',message: "请先上传数据！"});
    }

    const readStudentTotal = async (id) => {
        if (DataStore.uploadStatus) {
            open(`/screen?id=T-3&key=${id.id}`);
        } else ElMessage({type: 'warning',message: "请先上传数据！"});
    }
</script>

<template>
    <div class="student-container">
        <div class="topbar">
            <div class="left-box bar-box">
                <div class="icon-box" @click="UIStore.setIsCollapse(!UIStore.isCollapse)">
                    <el-icon><Operation /></el-icon>
                </div>
    
                <div class="icon-box" @click="upload.refreshPage">
                    <el-icon><RefreshRight /></el-icon>
                </div>
                <span class="title">学生情况</span>
            </div>
            <div class="right-box bar-box">
                <div class="icon-box">
                    <a>{{ UIStore.userNickName }}</a>
                </div>
    
                <div class="icon-box">
                    <el-icon><FullScreen /></el-icon>
                </div>
            </div>
        </div>

        <div class="button-sheet">
            <div class="upload-box">
                <input type="file" accept=".xls,.xlsx" @change="upload.handleFileUpload">
                <el-button type="primary" plain v-if="!DataStore.uploadStatus">上传数据（Excel）</el-button>
                <el-button type="primary" plain v-if="DataStore.uploadStatus" v-text="`已上传（${DataStore.fileName}）`"></el-button>
            </div>
            <el-button type="primary" plain @click="readTotalStudentInfo(1)">查看整体学习情况</el-button>
            <el-button type="primary" plain @click="readGroupStudyAsde(1)">查看整体增值分析</el-button>
        </div>

        <el-table :data="DataStore.fileData" class="table" border>
            <el-table-column v-for="(item,key) in DataStore.screenTableName" :key="key" :label="item[Object.keys(item)]" :prop="Object.keys(item)[0]"/>
            <el-table-column label="操作" width="280" v-if="DataStore.uploadStatus">
                <template #default="scope" >
                    <el-button size="small" type="success" @click="readStudentInfo(scope.row)">查看学习情况</el-button>
                    <el-button size="small" type="primary" @click="readStudentTotal(scope.row)">查看增值</el-button>
                </template>
              </el-table-column>
        </el-table>
    </div>
</template>