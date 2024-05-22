
<script setup>
    import "./assets/Index.css"
    import * as echarts from 'echarts'
    import icons from "@/scripts/icons.js"
    import { useUIStore } from '@/stores/UIStore.js'
    import databaseOption from "@/scripts/database.js"
    import { onBeforeUnmount, onMounted, ref } from "vue"

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
        let search = new URLSearchParams(location.search);
        let id = search.get('key');

        let StudentInfos = await studentDatabase.studentList.toArray();
        let find = StudentInfos[0].data.find(item => item[0] == id);
        
        if (find) {
            studentInfo.value = {
                id: find[0],na: find[1],xi: find[2],bu: find[3],ba: find[4],da: find[5],ph: find[10]
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

    const squareUrl = ref('https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png');
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
                        <div class="image-box" v-if="studentInfo.ph == 'None'">
                            <el-avatar shape="square" :size="'large'" :src="squareUrl" />
                        </div>
                        <div class="image-box" v-if="studentInfo.ph != null && studentInfo.ph != 'None'">
                            <img class="avatar" :src="'person/' + studentInfo.ph" draggable="false" >
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