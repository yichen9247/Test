
<script setup>
    import "./assets/FenxiView.css"
    import "./assets/IndexView.css"
    import { onUnmounted, ref } from "vue"
    import Attendance from "./Index/Attendance.vue"
    import ScoresView from "./Index/ScoresView.vue"
    import StudentList from "./Index/StudentList.vue"
    import ProjectView from "./Fenxi/ProjectView.vue"
    import { useUIStore } from "@/stores/UIStore.js"
    import ClassCenter from "./Index/ClassCenter.vue"
    import ClassInfois from "./Index/ClassInfois.vue"
    import { useDataStore } from "@/stores/DataStore.js"
    import { School, MessageBox, PieChart, Reading, Refrigerator, Coin, OfficeBuilding } from '@element-plus/icons-vue'

    const selected = ref(1);
    const UIStore = useUIStore();
    const DataStore = useDataStore();
    const openScreen = () => {
        if (DataStore.uploadStatus) {
            open('screen?id=V&key=8');
        // eslint-disable-next-line no-undef
        } else ElMessage({type: 'warning',message: "请先上传数据！"});
    };
    onUnmounted(async () => await UIStore.setIsCollapse(false));
    // eslint-disable-next-line no-unused-vars
    const menuSelect = async (key, keyPath) => selected.value = key;
</script>

<template>
    <div class="index-container">
        <el-container>
            <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical" default-active="1" text-color="#ffffff" @select="menuSelect" :collapse="UIStore.isCollapse">
                <el-menu-item index="1">
                    <el-icon><School /></el-icon>
                    <span>课程资源</span>
                </el-menu-item>
                <el-menu-item @click="openScreen">
                    <el-icon><Refrigerator /></el-icon>
                    <span>同步课堂</span>
                </el-menu-item>
                <el-menu-item index="3">
                    <el-icon><MessageBox /></el-icon>
                    <span>教育管理</span>
                </el-menu-item>
                <el-menu-item index="4">
                    <el-icon><Reading /></el-icon>
                    <span>评价管理</span>
                </el-menu-item>
                <el-menu-item index="5">
                    <el-icon><Coin /></el-icon>
                    <span>学生情况</span>
                </el-menu-item>
                <el-menu-item index="7">
                    <el-icon><OfficeBuilding /></el-icon>
                    <span>学生评教</span>
                </el-menu-item>
                <el-sub-menu index="6">
                    <template #title>
                        <el-icon><PieChart /></el-icon>
                        <span>学情管理</span>
                    </template>
                    <el-menu-item-group class="item-group">
                        <el-menu-item index="6-1">预检系统不响应</el-menu-item>
                        <el-menu-item index="6-2">检测系统故障</el-menu-item>
                        <el-menu-item index="6-3">检测电路及通讯故障</el-menu-item>
                        <el-menu-item index="6-4">检测控制器及关联系统</el-menu-item>
                        <el-menu-item index="6-5">维修电路及通讯故障</el-menu-item>
                        <el-menu-item index="6-6">维修控制器及关联系统</el-menu-item>
                        <el-menu-item index="6-7">验证功能正常激活</el-menu-item>
                        <el-menu-item index="6-8">标定和验证系统</el-menu-item>
                    </el-menu-item-group>
                </el-sub-menu>
            </el-menu>
            <el-container>
                <el-main >
                    <ClassCenter v-if="selected == 1" />
                    <Attendance v-if="selected == 3" />
                    <ScoresView v-if="selected == 4" />
                    <StudentList v-if="selected == 5" />
                    <ClassInfois v-if="selected == 7" />
                    <ProjectView :id="selected" />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<style>
.el-menu-vertical:not(.el-menu--collapse) {
    width: 17vw;
    min-width: 17vw;
    min-height: 25rem;
    overflow-y: scroll;
}

.el-menu-item {
    font-size: 1.0625rem!important;
}

.el-sub-menu__title {
    font-size: 1.0625rem!important;
}

.item-group .el-menu-item {
    font-size: 1.85vh!important;
}
</style>