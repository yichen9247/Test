
<script setup>
    import "./assets/Index.css"
    import * as echarts from 'echarts'
    import { useRoute } from "vue-router"
    import icons from "@/scripts/icons.js"
    import { useUIStore } from '@/stores/UIStore.js'
    import databaseOption from "@/scripts/database.js"
    import { onBeforeUnmount, onMounted, ref } from "vue"

    const route = useRoute();
    const UIStore = useUIStore();
    let database = databaseOption.screenDatabase;
    let studentDatabase = databaseOption.studentDatabase;
    database.version(1).stores(databaseOption.screenTrees);
    studentDatabase.version(1).stores(databaseOption.studentTrees);
    let charts_one,charts_two,charts_three,charts_four,charts_five,charts_six;

    const chartElements = async () => {
        charts_one = echarts.init(document.querySelector(".canvas-one"));
        charts_two = echarts.init(document.querySelector(".canvas-two"));
        charts_three = echarts.init(document.querySelector(".canvas-three"));
        charts_four = echarts.init(document.querySelector(".canvas-four"));
        charts_five = echarts.init(document.querySelector(".canvas-five"));
        charts_six = echarts.init(document.querySelector(".canvas-six"));
    }

    const setAllCanvas = async () => {
        await setEchartsOne();
        await setEchartsTwo();
        await setEchartsThree();
        await setEchartsFour();
        await setEchartsFive();
        await setEchartsSix();
    }

    onBeforeUnmount(async () => {
        charts_one.dispose();
        charts_two.dispose();
        charts_three.dispose();
        charts_four.dispose();
        charts_six.dispose();
        charts_five.dispose();
    });

    onMounted(async () => {
        try {
            await chartElements();
            await queryScreenData();
            await getStudentInfo();
            document.title = "学生个人能力画像";
        } catch {
            await UIStore.setSiteErrors(true);
            await ElMessage({ message: '数据源异常！', type: 'error', plain: true});
        }
    });

    const studentInfo = ref({});
    const ProfileDataRef = ref(null);
    const SkillRankHeadRef = ref(null);
    const SkillRankDataRef = ref(null);
    const AttendanceHeadRef = ref(null);
    const AttendanceDataRef = ref(null);
    const AverageScoreHeadRef = ref(null);
    const AverageScoreDataRef = ref(null);
    const GroupScoreRankHeadRef = ref(null);
    const GroupScoreRankDataRef = ref(null);
    const TaskScoreAnalDatasRef = ref(null);
    const AverageScoreRankHeadRef = ref(null);
    const AverageScoreRankDataRef = ref(null);

    const getStudentInfo = async () => {
        let StudentInfos = await studentDatabase.studentList.toArray();
        let find = StudentInfos[0].data.find(item => item[0] == route.params.id);
        if (find) {
            studentInfo.value = {
                id: find[0],na: find[1],xi: find[2],bu: find[3],ba: find[4],da: find[5],avatar: find[10]
            };
        } else {
            await UIStore.setSiteErrors(true);
            await ElMessage({ message: '数据源异常！', type: 'error', plain: true});
        }
    }

    const queryScreenData = async () => {
        let SkillRankDataCache = [];
        let TaskScoreAnalDataCache = [];
        let GroupScoreRankDataCache = [];
        let AverageScoreRankDataCache = [];

        TaskScoreAnalDatasRef.value = TaskScoreAnalDataCache;

        let ProFileData = await studentDatabase.profileData.toArray();
        ProfileDataRef.value = ProFileData[0].data;

        let SkillRankHead = await database.SkillRankHead.toArray();
        SkillRankHeadRef.value = SkillRankHead[0].data;
        let SkillRankData = await database.SkillRankData.toArray();
        for(let i=1;i<SkillRankData[0].data.length;i++) {
            SkillRankDataCache.push({pa: SkillRankData[0].data[i][0], zu: SkillRankData[0].data[i][1],ch: SkillRankData[0].data[i][2]});
        }
        SkillRankDataRef.value = SkillRankDataCache;

        let GroupScoreRankHead = await database.GroupScoreRankHead.toArray();
        GroupScoreRankHeadRef.value = GroupScoreRankHead[0].data;
        let GroupScoreRankData = await database.GroupScoreRankData.toArray();
        for(let i=1;i<GroupScoreRankData[0].data.length;i++) {
            GroupScoreRankDataCache.push({pa: GroupScoreRankData[0].data[i][0], zu: GroupScoreRankData[0].data[i][1],ch: GroupScoreRankData[0].data[i][2]});
        }
        GroupScoreRankDataRef.value = GroupScoreRankDataCache;

        let AverageScoreHead = await database.AverageScoreHead.toArray();
        AverageScoreHeadRef.value = AverageScoreHead[0].data;
        let AverageScoreData = await database.AverageScoreData.toArray();
        AverageScoreDataRef.value = AverageScoreData[0].data;

        let AttendanceHead = await database.AttendanceHead.toArray();
        AttendanceHeadRef.value = AttendanceHead[0].data;
        let AttendanceData = await database.AttendanceData.toArray();
        AttendanceDataRef.value = AttendanceData[0].data;

        let AverageScoreRankHead = await database.AverageScoreRankHead.toArray();
        AverageScoreRankHeadRef.value = AverageScoreRankHead[0].data;
        let AverageScoreRankData = await database.AverageScoreRankData.toArray();
        for(let i=1;i<AverageScoreRankData[0].data.length;i++) {
            AverageScoreRankDataCache.push({pa: AverageScoreRankData[0].data[i][0], zu: AverageScoreRankData[0].data[i][1],ch: AverageScoreRankData[0].data[i][2]});
        }
        AverageScoreRankDataRef.value = AverageScoreRankDataCache;
        
        let TaskScoreAnalLabel = await database.TaskScoreAnalyLabel.toArray();
        let TaskScoreAnalDatas = await database.TaskScoreAnalyDatas.toArray();
        for(let i=0;i<TaskScoreAnalLabel[0].data.length;i++) {
            TaskScoreAnalDataCache.push({
                name: TaskScoreAnalLabel[0].data[i],
                value: TaskScoreAnalDatas[0].data[i],
            });
        }

        await setAllCanvas();
    }

    const setEchartsOne = async () => {
        let data = [];
        for (let i=0;i<8;i++) {
            data.push({
                name: ProfileDataRef.value[1][i],
                value: ProfileDataRef.value[2][i],
            });
        }

        const option = {
            tooltip: {
                trigger: 'item'
            },
            series: [{
                name: 'Access From',
                type: 'pie',
                radius: ['20%', '50%'],
                itemStyle: {
                    borderWidth: 2,
                    borderRadius: 10,
                    borderColor: '#ffffff'
                },
                label: {
                    show: true,
                    color: 'rgba(255, 255, 255)'
                },
                labelLine: {
                    normal: {
                        show: true,
                        length: 40,
                        length2: 40
                    }
                },
                data: data,
            }]
        }
        charts_one.setOption(option);
    }

    const setEchartsTwo = async () => {
        let task = [],head = [],data = [],heads = [];
        for (let i=9;i<26;i+=8) {
            head.push(ProfileDataRef.value[1][i]);
        }
        for (let i=9;i<17;i++) {
            heads.push([]);
            task.push(ProfileDataRef.value[2][i])
        }
        for (let i=9,p=0;i<17;i++,p++) {
            heads[p].push(ProfileDataRef.value[3][i]);
        }
        for (let i=17,p=0;i<25;i++,p++) {
            heads[p].push(ProfileDataRef.value[3][i]);
        }
        for (let i=25,p=0;i<33;i++,p++) {
            heads[p].push(ProfileDataRef.value[3][i]);
        }

        for(let i=0;i<task.length;i++) {
            data.push({
                name: task[i],
                type: 'line',
                data: heads[i]
            });
        }

        const option = {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                top: '5%',
                left: 'center',
                textStyle: {
                    color: 'rgba(255, 255, 255)'
                },
                data: task
            },
            xAxis: {
                axisLabel: {
                    color: 'rgba(255, 255, 255)'
                },
                type: 'category',
                data: head
            },
            yAxis: {
                type: 'value',
            },
            series: data
        }
        charts_two.setOption(option);
    }

    const setEchartsThree = async () => {
        let head = [],data = [];
        for (let i=34;i<39;i++) {
            head.push({
                name: ProfileDataRef.value[1][i], max: 100
            });
            data.push(ProfileDataRef.value[2][i])
        }

        const option = {
            tooltip: {
                trigger: 'item'
            },
            radar: {
                indicator: head,
            },
            series: [{
                name: 'Budget vs spending',
                type: 'radar',
                itemStyle: {
                    borderWidth: 2,
                    borderRadius: 10,
                    borderColor: '#ffffff'
                },
                data: [{value: data}
                ]
            }]
        }
        charts_three.setOption(option);
    }

    const setEchartsFour = async () => {
        let task = [],head = [],data = [],heads = [],valu = [];
        for (let i=40;i<73;i+=8) {
            heads.push({
                name: ProfileDataRef.value[1][i],
                type: 'line',
                data: []
            });
            head.push(ProfileDataRef.value[1][i]);
        }
        for (let i=40;i<48;i++) {
            task.push(ProfileDataRef.value[2][i]);
        }

        for (let i=40,p=0;i<48;i++,p++) {
            heads[0].data.push(ProfileDataRef.value[3][i]);
        }
        for (let i=48,p=0;i<56;i++,p++) {
            heads[1].data.push(ProfileDataRef.value[3][i]);
        }
        for (let i=56,p=0;i<64;i++,p++) {
            heads[2].data.push(ProfileDataRef.value[3][i]);
        }
        for (let i=64,p=0;i<72;i++,p++) {
            heads[3].data.push(ProfileDataRef.value[3][i]);
        }
        for (let i=72,p=0;i<80;i++,p++) {
            heads[4].data.push(ProfileDataRef.value[3][i]);
        }

        const option = {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                top: '5%',
                left: 'center',
                textStyle: {
                    color: 'rgba(255, 255, 255)'
                },
                data: head
            },
            xAxis: {
                axisLabel: {
                    color: 'rgba(255, 255, 255)'
                },
                type: 'category',
                data: task
            },
            yAxis: {
                type: 'value',
            },
            series: heads
        }
        charts_four.setOption(option);
    }

    const setEchartsFive = async () => {
        let task = [],head = [],data = [],heads = [],valu = [];
        for (let i=89;i<106;i+=8) {
            head.push(ProfileDataRef.value[1][i]);
        }

        for(let i=0;i<head.length;i++) {
            data.push([]);
        }

        for(let i=89;i<97;i++) {
            data[0].push(ProfileDataRef.value[3][i]);
        }
        for(let i=97;i<105;i++) {
            data[1].push(ProfileDataRef.value[3][i]);
        }
        for(let i=105;i<113;i++) {
            data[2].push(ProfileDataRef.value[3][i]);
        }

        const rawData = data;
        const totalData = [];
        for (let i = 0; i < rawData[0].length; ++i) {
            let sum = 0;
            for (let j = 0; j < rawData.length; ++j) {
                sum += rawData[j][i];
            }
            totalData.push(sum);
        }
        const series = head.map((name, sid) => {
            return {
                name,
                type: 'bar',
                stack: 'total',
                barWidth: '60%',
                label: {
                    show: true,
                    formatter: (params) => Math.round(params.value * 1000) / 10 + '%'
                },
                data: rawData[sid].map((d, did) =>
                    totalData[did] <= 0 ? 0 : d / totalData[did]
                )
            };
        });

        const option = {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                top: '5%',
                left: 'center',
                textStyle: {
                    color: 'rgba(255, 255, 255)'
                },
            },
            grid: {
                left: '6%',
                right: '4%',
                bottom: '12%',
                containLabel: true
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    color: 'rgba(255, 255, 255)'
                },
            },
            xAxis: {
                type: 'category',
                data: ['任务一', '任务二', '任务三', '任务四', '任务五', '任务六', '任务七', '任务八'],
                axisLabel: {
                    color: 'rgba(255, 255, 255)'
                },
            },
            series
        }
        charts_five.setOption(option);
    }

    const setEchartsSix = async () => {
        let head = [],data = [];
        for (let i=81;i<88;i++) {
            head.push(ProfileDataRef.value[1][i]);
            data.push(ProfileDataRef.value[2][i])
        }

        const option = {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                top: '5%',
                left: 'center',
                textStyle: {
                    color: 'rgba(255, 255, 255)'
                },
            },
            xAxis: {
                type: 'category',
                axisLabel: {
                    color: 'rgba(255, 255, 255)'
                },
                data: head
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                type: 'bar',
                data: data
            }]
        }
        charts_six.setOption(option);
    }
</script>

<template>
    <div style="width: 100vw;height: 100vh;" v-loading.fullscreen.lock="UIStore.siteErrors" element-loading-text="系统异常（请检查数据源）" :element-loading-svg="icons.loading" element-loading-svg-view-box="-10, -10, 50, 50" >
        <header>
            <h1>学生个人能力画像</h1>
        </header>
    
        <section class="main">
            <div class="column">
                <div class="panel pie">
                    <h2 v-if="ProfileDataRef != null">{{ ProfileDataRef[0][0] }}</h2>
                    <div class="canvas canvas-one"></div>
                    <div class="panel-footer"></div>
                </div>
                <div class="panel piel">
                    <h2 v-if="ProfileDataRef != null">{{ ProfileDataRef[0][89] }}</h2>
                    <div class="canvas canvas-five"></div>
                    <div class="panel-footer"></div>
                </div>
            </div>
    
            <div class="column">
                <div class="flex">
                    <div class="panelx">
                        <h2>学生照片</h2>
                        <div class="image-box">
                            <svg v-if="studentInfo.avatar == 'None'" height="146" node-id="1" sillyvg="true" template-height="146" template-width="112" version="1.1" viewBox="0 0 112 146" width="112" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs node-id="28"></defs><path d="M 93.65 114.16 L 56.44 94.73 L 56.17 94.87 L 55.90 94.73 L 18.69 114.16 C 12.80 117.58 9.17 123.88 9.17 130.70 L 9.17 145.48 L 103.17 145.48 L 103.17 130.70 C 103.17 123.88 99.54 117.58 93.65 114.16 Z" fill="#1d99d8" fill-rule="nonzero" node-id="30" stroke="none" target-height="50.749992" target-width="94" target-x="9.17" target-y="94.73"/><path d="M 74.61 104.22 L 69.82 101.72 C 68.49 101.03 67.65 99.65 67.66 98.15 L 67.66 87.60 L 44.66 87.60 L 44.66 98.15 C 44.67 99.65 43.83 101.03 42.50 101.72 L 37.71 104.22 L 55.88 125.22 Z" fill="#ffd0b4" fill-rule="nonzero" node-id="32" stroke="none" target-height="37.620003" target-width="36.9" target-x="37.71" target-y="87.6"/><path d="M 68.68 100.88 L 56.17 118.88 L 43.66 100.88 L 34.15 106.09 L 47.93 145.48 L 64.41 145.48 L 78.19 106.09 L 68.68 100.88 Z" fill="#d4efff" fill-rule="nonzero" node-id="34" stroke="none" target-height="44.6" target-width="44.04" target-x="34.15" target-y="100.88"/><path d="M 41.68 125.59 C 41.32 125.39 38.26 115.59 43.29 111.87 C 43.29 111.87 48.38 111.38 53.93 117.99 L 53.79 122.30 C 53.79 122.30 48.19 127.09 41.68 125.59 Z" fill="#088ab2" fill-rule="nonzero" node-id="36" stroke="none" target-height="15.709999" target-width="15.670002" target-x="38.26" target-y="111.38"/><path d="M 70.66 125.48 C 71.02 125.29 74.08 115.48 69.05 111.76 C 69.05 111.76 63.96 111.27 58.41 117.88 L 58.55 122.19 C 58.55 122.19 64.15 127.00 70.66 125.48 Z" fill="#088ab2" fill-rule="nonzero" node-id="38" stroke="none" target-height="15.730003" target-width="15.670002" target-x="58.41" target-y="111.27"/><path d="M 59.11 121.51 C 59.11 121.95 58.94 122.37 58.63 122.68 C 58.33 122.99 57.91 123.16 57.47 123.16 L 55.08 123.16 C 54.00 123.13 53.13 122.25 53.13 121.16 L 53.13 118.80 C 53.13 117.90 53.85 117.17 54.75 117.16 C 54.75 117.16 55.87 117.43 56.25 117.46 C 56.80 117.43 57.34 117.33 57.86 117.16 C 58.16 117.09 58.48 117.17 58.71 117.36 C 58.95 117.56 59.09 117.85 59.08 118.16 Z" fill="#088ab2" fill-rule="nonzero" node-id="40" stroke="none" target-height="6.067917" target-width="5.9830017" target-x="53.12966" target-y="117.092094"/><path d="M 22.63 61.10 C 22.63 61.10 10.00 58.71 14.08 71.75 C 15.98 77.75 21.42 79.40 26.71 79.41 C 32.88 79.43 22.63 61.10 22.63 61.10 Z" fill="#f9d2c2" fill-rule="nonzero" node-id="42" stroke="none" target-height="20.720001" target-width="22.880001" target-x="10" target-y="58.71"/><path d="M 21.64 67.18 C 22.06 67.19 22.48 67.28 22.86 67.45 L 23.37 67.66 L 23.86 66.55 C 22.97 66.07 22.02 65.74 21.03 65.55 C 20.41 65.48 19.78 65.53 19.18 65.70 C 17.92 66.20 17.13 67.47 17.24 68.82 C 17.24 70.07 17.75 71.27 18.65 72.14 C 19.66 73.12 20.95 73.77 22.34 74.00 L 22.76 74.00 C 24.08 74.00 25.32 73.18 25.33 72.35 C 25.30 72.04 25.16 71.75 24.92 71.54 C 24.72 71.30 24.43 71.16 24.12 71.13 C 23.89 71.14 23.67 71.21 23.48 71.33 L 23.40 71.40 C 22.95 71.85 22.31 72.06 21.68 71.98 C 21.04 71.99 20.43 71.72 20.00 71.24 C 19.57 70.77 19.38 70.13 19.46 69.49 C 19.41 68.85 19.63 68.23 20.05 67.75 C 20.49 67.37 21.06 67.16 21.64 67.18 Z" fill="#dda08e" fill-rule="nonzero" node-id="44" stroke="none" target-height="8.521355" target-width="8.195652" target-x="17.134348" target-y="65.478645"/><path d="M 89.71 61.10 C 89.71 61.10 102.37 58.71 98.26 71.75 C 96.36 77.75 90.92 79.40 85.63 79.41 C 79.46 79.43 89.71 61.10 89.71 61.10 Z" fill="#f9d2c2" fill-rule="nonzero" node-id="46" stroke="none" target-height="20.720001" target-width="22.910004" target-x="79.46" target-y="58.71"/><path d="M 90.70 67.18 C 90.28 67.19 89.86 67.28 89.48 67.45 L 88.97 67.66 L 88.48 66.55 C 89.37 66.07 90.32 65.74 91.31 65.55 C 91.93 65.48 92.56 65.53 93.16 65.70 C 94.42 66.20 95.21 67.47 95.10 68.82 C 95.10 70.07 94.60 71.27 93.70 72.14 C 92.68 73.12 91.39 73.77 90.00 74.00 L 89.58 74.00 C 88.26 74.00 87.00 73.19 87.00 72.36 C 87.03 72.05 87.17 71.76 87.41 71.55 C 87.61 71.31 87.90 71.17 88.21 71.14 C 88.44 71.15 88.66 71.22 88.85 71.34 L 88.93 71.41 C 89.38 71.86 90.02 72.07 90.65 71.99 C 91.29 72.00 91.90 71.73 92.33 71.25 C 92.76 70.78 92.95 70.14 92.87 69.50 C 92.92 68.86 92.70 68.24 92.28 67.76 C 91.84 67.38 91.28 67.17 90.70 67.18 Z" fill="#dda08e" fill-rule="nonzero" node-id="48" stroke="none" target-height="8.521355" target-width="8.20565" target-x="87" target-y="65.478645"/><g node-id="73"><path d="M 56.90 24.91 L 61.62 25.34 L 66.06 26.37 L 70.26 27.99 L 74.21 30.15 L 77.80 32.77 L 81.06 35.87 L 83.90 39.36 L 86.28 43.18 L 88.21 47.37 L 89.60 51.78 L 90.41 56.41 L 90.64 61.33 L 90.21 66.23 L 89.20 70.83 L 87.64 75.18 L 85.54 79.29 L 83.00 83.01 L 80.02 86.37 L 76.64 89.34 L 72.94 91.80 L 68.90 93.80 L 64.64 95.24 L 60.17 96.09 L 55.43 96.33 L 50.70 95.90 L 46.27 94.87 L 42.07 93.25 L 38.12 91.09 L 34.53 88.47 L 31.27 85.37 L 28.43 81.88 L 26.05 78.06 L 24.11 73.87 L 22.73 69.46 L 21.92 64.83 L 21.69 59.91 L 22.12 55.01 L 23.12 50.41 L 24.69 46.07 L 26.79 41.95 L 29.32 38.23 L 32.31 34.87 L 35.69 31.91 L 39.39 29.44 L 43.42 27.44 L 47.68 26.00 L 52.16 25.15 L 56.90 24.91 Z" fill="#ffe2d4" fill-rule="nonzero" group-id="1" node-id="52" stroke="none" target-height="71.42485" target-width="68.94537" target-x="21.691189" target-y="24.90786"/></g><path d="M 44.09 66.72 C 44.09 68.71 42.47 70.33 40.48 70.33 C 38.49 70.33 36.87 68.71 36.87 66.72 C 36.87 64.73 38.49 63.11 40.48 63.11 C 42.47 63.11 44.09 64.73 44.09 66.72 Z" fill="#423f43" fill-rule="nonzero" node-id="55" stroke="none" target-height="7.220001" target-width="7.220001" target-x="36.87" target-y="63.11"/><path d="M 46.00 57.27 C 39.59 53.75 33.29 59.05 33.35 59.36 C 36.15 59.22 36.74 58.25 45.49 59.65 L 45.62 59.65 C 45.95 59.65 46.26 59.53 46.49 59.30 C 46.72 59.07 46.85 58.76 46.85 58.43 C 46.80 57.92 46.00 57.28 46.00 57.27 Z" fill="#423f43" fill-rule="nonzero" node-id="57" stroke="none" target-height="5.902668" target-width="13.560009" target-x="33.29" target-y="53.75"/><path d="M 75.48 66.72 C 75.48 68.71 73.86 70.33 71.87 70.33 C 69.88 70.33 68.26 68.71 68.26 66.72 C 68.26 64.73 69.88 63.11 71.87 63.11 C 73.86 63.11 75.48 64.73 75.48 66.72 Z" fill="#423f43" fill-rule="nonzero" node-id="59" stroke="none" target-height="7.220001" target-width="7.220001" target-x="68.26" target-y="63.11"/><path d="M 66.39 57.27 C 72.80 53.75 79.10 59.05 79.00 59.36 C 76.20 59.22 75.61 58.25 66.86 59.65 L 66.73 59.65 C 66.40 59.65 66.09 59.53 65.86 59.30 C 65.63 59.07 65.50 58.76 65.50 58.43 C 65.54 57.92 66.38 57.28 66.39 57.27 Z" fill="#423f43" fill-rule="nonzero" node-id="61" stroke="none" target-height="5.902668" target-width="13.600006" target-x="65.49999" target-y="53.75"/><path d="M 50.14 78.59 C 50.14 82.59 52.86 85.91 56.14 85.91 C 59.42 85.91 62.14 82.64 62.14 78.59 Z" fill="#ef9586" fill-rule="nonzero" node-id="63" stroke="none" target-height="7.3200073" target-width="12" target-x="50.14" target-y="78.59"/><path d="M 56.17 69.79 C 54.78 69.79 53.66 70.91 53.66 72.30 C 54.45 71.94 55.28 71.68 56.13 71.51 C 57.01 71.68 57.86 71.94 58.68 72.30 C 58.68 70.91 57.56 69.79 56.17 69.79 Z" fill="#d1c5c5" fill-rule="nonzero" node-id="65" stroke="none" target-height="2.5100021" target-width="5.0200005" target-x="53.66" target-y="69.79"/><path d="M 23.51 62.52 C 23.51 62.52 25.57 49.24 25.36 44.59 C 25.36 44.59 38.64 41.22 40.10 29.02 C 40.10 29.02 50.99 47.52 67.83 35.58 C 67.83 35.58 70.28 42.65 79.26 42.58 C 79.26 42.58 84.93 55.91 90.46 61.28 C 90.46 61.28 91.55 60.03 95.86 61.59 C 95.86 61.59 103.52 27.78 85.72 12.23 C 85.72 12.23 65.42 -3.32 44.38 5.23 L 41.00 0.00 L 39.81 7.15 L 33.74 4.24 C 33.74 4.24 37.56 8.15 38.00 9.73 C 38.00 9.73 21.45 10.41 15.28 30.06 C 12.00 40.36 13.54 55.53 16.32 61.44 C 22.10 59.24 23.51 62.52 23.51 62.52 Z" fill="#423f43" fill-rule="nonzero" node-id="67" stroke="none" target-height="65.840004" target-width="91.52" target-x="12" target-y="-3.32"/><path d="M 42.19 79.27 C 42.19 81.47 39.51 83.26 36.20 83.26 C 32.89 83.26 30.21 81.47 30.21 79.27 C 30.21 77.07 32.89 75.28 36.20 75.28 C 39.51 75.28 42.19 77.07 42.19 79.27 Z" fill="#fcd3c4" fill-rule="nonzero" node-id="69" stroke="none" target-height="7.9800034" target-width="11.98" target-x="30.21" target-y="75.28"/><path d="M 82.68 79.27 C 82.68 81.47 80.00 83.26 76.69 83.26 C 73.38 83.26 70.70 81.47 70.70 79.27 C 70.70 77.07 73.38 75.28 76.69 75.28 C 80.00 75.28 82.68 77.07 82.68 79.27 Z" fill="#fcd3c4" fill-rule="nonzero" node-id="71" stroke="none" target-height="7.9800034" target-width="11.980003" target-x="70.7" target-y="75.28"/></svg>
                            <el-avatar v-else :src="studentInfo.avatar"/>
                        </div>
                        <p class="user-name">{{ studentInfo.na }}</p>
                        <p class="user-desc">{{ studentInfo.ba }}</p>
                        <div class="panel-footer"></div>
                    </div>
    
                    <div class="panelx">
                        <h2 v-if="ProfileDataRef != null">{{ ProfileDataRef[0][9] }}</h2>
                        <div class="canvas canvas-two"></div>
                        <div class="panel-footer"></div>
                    </div>
                </div>
                <div class="panel piel">
                    <h2 v-if="ProfileDataRef != null">{{ ProfileDataRef[0][40] }}</h2>
                    <div class="canvas canvas-four"></div>
                    <div class="panel-footer"></div>
                </div>
            </div>
    
            <div class="column">
                <div class="panel pie">
                    <h2 v-if="ProfileDataRef != null">{{ ProfileDataRef[0][34] }}</h2>
                    <div class="canvas canvas-three"></div>
                    <div class="panel-footer"></div>
                </div>
                <div class="panel piel">
                    <h2 v-if="ProfileDataRef != null">{{ ProfileDataRef[0][81] }}</h2>
                    <div class="canvas canvas-six"></div>
                    <div class="panel-footer"></div>
                </div>
            </div>
        </section>
    </div>
</template>