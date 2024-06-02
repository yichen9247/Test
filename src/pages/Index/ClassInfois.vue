
<script setup>
    import "./assets/ClassInfois.css"
    import { onUnmounted, ref } from "vue"
    import upload from "@/scripts/upload.js"
    import { useUIStore } from "@/stores/UIStore.js"
    import { useDataStore } from "@/stores/DataStore.js"
    import { Operation, RefreshRight, FullScreen } from '@element-plus/icons-vue'

    const UIStore = useUIStore();
    const DataStore = useDataStore();
    onUnmounted(async () => await upload.removeStoreStatus());

    const refreshPage = async () => {
        await ElMessage({ message: '刷新成功！', type: 'success', plain: true});
    }

    const avatar = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png');
</script>

<template>
    <div class="score-container">
        <div class="topbar">
            <div class="left-box bar-box">
                <div class="icon-box" @click="UIStore.setIsCollapse(!UIStore.isCollapse)">
                    <el-icon><Operation /></el-icon>
                </div>
    
                <div class="icon-box" @click="refreshPage">
                    <el-icon><RefreshRight /></el-icon>
                </div>
                <span class="title">学生列表</span>
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
        </div>

        <ul class="student-list" v-if="DataStore.uploadStatus">
            <li class="student-item" v-for="(item,index) in DataStore.fileData" :key="index">
                <el-avatar :size="75" :src="avatar" />
                <span class="name">{{ item.na }}</span>
            </li>
        </ul>
    </div>
</template>