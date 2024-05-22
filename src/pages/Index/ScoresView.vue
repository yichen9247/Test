
<script setup>
    import "./assets/ScoresView.css"
    import { onUnmounted, ref } from "vue"
    import upload from "@/scripts/upload.js"
    import { useUIStore } from "@/stores/UIStore.js"
    import { useDataStore } from "@/stores/DataStore.js"
    import { Operation, RefreshRight, FullScreen } from '@element-plus/icons-vue'

    const UIStore = useUIStore();
    const DataStore = useDataStore();
    onUnmounted(async () => await upload.removeStoreStatus());

    const socreList = ref([
        {
            f_value: 'one',
            r_value: 'one',
            z_value: 'one',
            p_value: null,
        },{
            f_value: 'two',
            r_value: 'two',
            z_value: 'two',
            p_value: null,
        },{
            f_value: 'three',
            r_value: 'three',
            z_value: 'three',
            p_value: null,
        },{
            f_value: 'four',
            r_value: 'four',
            z_value: 'four',
            p_value: null,
        },{
            f_value: 'five',
            r_value: 'five',
            z_value: 'five',
            p_value: null,
        },{
            f_value: 'six',
            r_value: 'six',
            z_value: 'six',
            p_value: null,
        },{
            f_value: 'seven',
            r_value: 'seven',
            z_value: 'seven',
            p_value: null,
        },{
            f_value: 'eight',
            r_value: 'eight',
            z_value: 'eight',
            p_value: null,
        }
    ]);

    const f_option = ref([
        {value: 'one',label: '评分项一'},
        {value: 'two',label: '评分项二'},
        {value: 'three',label: '评分项三'},
        {value: 'four',label: '评分项四'},
        {value: 'five',label: '评分项五'},
        {value: 'six',label: '评分项六'},
        {value: 'seven',label: '评分项七'},
        {value: 'eight',label: '评分项八'}
    ]);

    const r_option = ref([
        {value: 'one',label: '任务项一'},
        {value: 'two',label: '任务项二'},
        {value: 'three',label: '任务项三'},
        {value: 'four',label: '任务项四'},
        {value: 'five',label: '任务项五'},
        {value: 'six',label: '任务项六'},
        {value: 'seven',label: '任务项七'},
        {value: 'eight',label: '任务项八'},
    ]);

    const z_option = ref([
        {value: 'one',label: '子任务项一'},
        {value: 'two',label: '子任务项二'},
        {value: 'three',label: '子任务项三'},
        {value: 'four',label: '子任务项四'},
        {value: 'five',label: '子任务项五'},
        {value: 'six',label: '子任务项六'},
        {value: 'seven',label: '子任务项七'},
        {value: 'eight',label: '子任务项八'},
    ]);

    const p_grades = ref([
        {value: 'A1',label: 'A+'},
        {value: 'A0',label: 'A'},
        {value: 'A2',label: 'A-'},
        {value: 'B1',label: 'B+'},
        {value: 'B0',label: 'B'},
        {value: 'B2-',label: 'B-'},
        {value: 'C1',label: 'C+'},
        {value: 'C0',label: 'C'},
        {value: 'C2',label: 'C-'},
    ]);

    const sendFrom = async () => {
        await ElMessage({ message: '提交表单成功！', type: 'success', plain: true});
        setTimeout(() => open('./screen?id=1'),1000);
    };

    const readGroupStudyInfo = async (id) => {
        if (DataStore.uploadStatus) {
            open(`/screen?id=A&key=${id}`);
        } else ElMessage({type: 'warning',message: "请先上传数据！"});
    }

    const readGroupStudyAsde = async (id) => {
        if (DataStore.uploadStatus) {
            open(`/screen?id=T-1&key=${id}`);
        } else ElMessage({type: 'warning',message: "请先上传数据！"});
    }

    const readGroupAllStudyInfo = async (id) => {
        if (DataStore.uploadStatus) {
            open(`/screen?id=G&key=${id}`);
        } else ElMessage({type: 'warning',message: "请先上传数据！"});
    }
</script>

<template>
    <div class="score-container">
        <div class="topbar">
            <div class="left-box bar-box">
                <div class="icon-box" @click="UIStore.setIsCollapse(!UIStore.isCollapse)">
                    <el-icon><Operation /></el-icon>
                </div>
    
                <div class="icon-box" @click="upload.refreshPage">
                    <el-icon><RefreshRight /></el-icon>
                </div>
                <span class="title">评价管理</span>
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

        <div style="width: 75vw;margin: 20px auto" class="button-sheet">
            <div class="upload-box">
                <input type="file" accept=".xls,.xlsx" @change="upload.handleFileUpload">
                <el-button type="primary" plain v-if="!DataStore.uploadStatus">上传数据（Excel）</el-button>
                <el-button type="primary" plain v-if="DataStore.uploadStatus" v-text="`已上传（${DataStore.fileName}）`"></el-button>
            </div>
            <el-button type="primary" plain @click="readGroupAllStudyInfo(1)">查看小组学习情况</el-button>
        </div>

        <el-table :data="socreList" class="table" border>
            <el-table-column label="评分项">
                <template #default="scope" >
                    <el-cascader v-model="socreList[scope.$index].f_value" :options="f_option" />
                </template>
            </el-table-column>
            <el-table-column label="任务项">
                <template #default="scope" >
                    <el-cascader v-model="socreList[scope.$index].r_value" :options="r_option" />
                </template>
            </el-table-column>
            <el-table-column label="子任务">
                <template #default="scope" >
                    <el-cascader v-model="socreList[scope.$index].z_value" :options="z_option" />
                </template>
            </el-table-column>
            <el-table-column label="评分等级">
                <template #default="scope" >
                    <el-cascader v-model="socreList[scope.$index].p_value" :options="p_grades" />
                </template>
            </el-table-column>
            <el-table-column label="更多操作" width="280">
                <template #default="scope" >
                    <el-button size="small" type="success" @click="readGroupStudyInfo(scope.$index+1)">查看任务分析</el-button>
                    <el-button size="small" type="primary" @click="readGroupStudyAsde(scope.$index+1)">查看增值</el-button>
                </template>
            </el-table-column>
        </el-table>
        
        <el-button class="send" type="primary" plain @click="sendFrom" v-if="DataStore.uploadStatus">提交表单</el-button>
    </div>
</template>