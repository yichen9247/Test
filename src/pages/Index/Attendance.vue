
<script setup>
    import "./assets/Attendance.css"
    import { onUnmounted } from 'vue'
    import upload from "@/scripts/upload.js"
    import { useUIStore } from "@/stores/UIStore.js"
    import { useDataStore } from "@/stores/DataStore.js"
    import { Operation, RefreshRight, FullScreen } from '@element-plus/icons-vue'

    const UIStore = useUIStore();
    const DataStore = useDataStore();
    onUnmounted(async () => await upload.removeStoreStatus());
</script>

<template>
    <div class="atted-container">
        <div class="topbar">
            <div class="left-box bar-box">
                <div class="icon-box" @click="UIStore.setIsCollapse(!UIStore.isCollapse)">
                    <el-icon><Operation /></el-icon>
                </div>
    
                <div class="icon-box" @click="upload.refreshPage">
                    <el-icon><RefreshRight /></el-icon>
                </div>
                <span class="title">教育管理</span>
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
            <el-button type="primary" plain @click="upload.signAll">一键签到</el-button>
            <el-button type="primary" plain @click="upload.serveData">保存出勤数据</el-button>
        </div>

        <el-table :data="DataStore.fileData" class="table" border>
            <el-table-column v-for="(item,key) in DataStore.attendTableName" :key="key" :label="item[Object.keys(item)]" :prop="Object.keys(item)[0]"/>
            <el-table-column label="操作" width="280" v-if="DataStore.uploadStatus">
                <template #default="scope" >
                    <el-button size="small" type="success" @click="upload.addQianDao(scope.$index, scope.row)">签到</el-button>
                    <el-button size="small" type="warning" @click="upload.addQingJia(scope.$index, scope.row)">请假</el-button>
                    <el-button size="small" type="primary" @click="upload.addChiDao(scope.$index, scope.row)">迟到</el-button>
                    <el-button size="small" type="danger" @click="upload.addKuangke(scope.$index, scope.row)">旷课</el-button>
                </template>
              </el-table-column>
        </el-table>
    </div>
</template>