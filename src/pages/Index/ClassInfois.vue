
<script setup>
    import "./assets/ClassInfois.css"
    import { useUIStore } from "@/stores/UIStore.js"
    import { Operation, RefreshRight, FullScreen } from '@element-plus/icons-vue'

    const UIStore = useUIStore();
    const refreshPage = async () => {
        await ElMessage({ message: '刷新成功！', type: 'success', plain: true});
    }
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
                <span class="title">同步课堂</span>
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
    </div>
</template>