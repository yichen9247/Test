
<script setup>
    import * as echarts from 'echarts'
    import icons from "@/scripts/icons.js"
    import random from '@/scripts/random.js'
    import { useUIStore } from '@/stores/UIStore.js'
    import databaseOption from "@/scripts/database.js"
    import { onBeforeUnmount, onMounted, ref, defineProps } from "vue"

    const props = defineProps({ id: Object });
    let database = databaseOption.screenDatabase;
    let studentDatabase = databaseOption.studentDatabase;
    database.version(1).stores(databaseOption.screenTrees);
    studentDatabase.version(1).stores(databaseOption.studentTrees);
    let charts_one,charts_two,charts_three,charts_four,charts_five,charts_six;

    const UIStore = useUIStore();
    const chartElements = async () => {
        charts_one = echarts.init(document.querySelector(".canvas-one"));
        charts_two = echarts.init(document.querySelector(".canvas-two"));
        charts_three = echarts.init(document.querySelector(".canvas-three"));
        charts_four = echarts.init(document.querySelector(".canvas-four"));
        charts_five = echarts.init(document.querySelector(".canvas-five"));
    }

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

    const queryScreenData = async () => {
        let SkillRankDataCache = [];
        let TaskScoreAnalDataCache = [];
        let GroupScoreRankDataCache = [];
        let AverageScoreRankDataCache = [];

        let ProFileData = await studentDatabase.studentAsly.toArray();
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
        TaskScoreAnalDatasRef.value = TaskScoreAnalDataCache;

        await setAllCanvas();
    }

    onBeforeUnmount(async () => {
        await charts_one.dispose();
        await charts_two.dispose();
        await charts_three.dispose();
        await charts_four.dispose();
        await charts_five.dispose();
    });

    const getStudentInfo = async () => {
        let StudentInfos = await studentDatabase.studentList.toArray();
        let find = StudentInfos[0].data.find(item => item[0] == props.id.someProp);
        if (find) {
            studentInfo.value = {
                id: find[0],na: find[1],xi: find[2],bu: find[3],ba: find[4],da: find[5]
            };
        } else {
            await UIStore.setSiteErrors(true);
            await ElMessage({ message: '数据源异常！', type: 'error', plain: true});
        }
    }

    const setAllCanvas = async () => {
        await setEchartsOne();
        await setEchartsTwo();
        await setEchartsThree();
        await setEchartsFour();
        await setEchartsFive();
    }

    const setEchartsOne = async () => {
        let head = [],data = [];
        for (let i=0;i<5;i++) {
            head.push({
                name: ProfileDataRef.value[1][i], max: 100
            });
            data.push(ProfileDataRef.value[2][i]);
        }

        const option = {
            tooltip: {
                trigger: 'item'
            },
            radar: {
                indicator: head,
            },
            series: [{
                type: 'radar',
                itemStyle: {
                    borderWidth: 2,
                    borderRadius: 10,
                    borderColor: '#ffffff'
                },
                data: [{
                    value: data,
                    name: '班级平均'
                }]
            }]
        }
        charts_one.setOption(option);
    }

    const setEchartsTwo = async () => {
        let head = [],data = [];
        for (let i=6;i<11;i++) {
            head.push({
                name: ProfileDataRef.value[1][i], max: 100
            });
            data.push(ProfileDataRef.value[2][i]);
        }

        const option = {
            tooltip: {
                trigger: 'item'
            },
            radar: {
                indicator: head,
            },
            series: [{
                type: 'radar',
                itemStyle: {
                    borderWidth: 2,
                    borderRadius: 10,
                    borderColor: '#ffffff'
                },
                data: [{
                    value: data,
                    name: '班级平均'
                }]
            }]
        }
        charts_two.setOption(option);
    }

    const setEchartsThree = async () => {
        let head = [],data = [];
        for (let i=12;i<17;i++) {
            head.push({
                name: ProfileDataRef.value[1][i], max: 100
            });
            data.push(ProfileDataRef.value[2][i]);
        }

        const option = {
            tooltip: {
                trigger: 'item'
            },
            radar: {
                indicator: head,
            },
            series: [{
                type: 'radar',
                itemStyle: {
                    borderWidth: 2,
                    borderRadius: 10,
                    borderColor: '#ffffff'
                },
                data: [{
                    value: data,
                    name: '班级平均'
                }]
            }]
        }
        charts_three.setOption(option);
    }

    const setEchartsFour = async () => {
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
                data: [
                    {name: AverageScoreHeadRef.value[0],value: random.getRandomIntInclusiveInter(1,45),},
                    {name: AverageScoreHeadRef.value[1],value: random.getRandomIntInclusiveInter(1,25),},
                    {name: AverageScoreHeadRef.value[2],value: random.getRandomIntInclusiveInter(1,15),},
                    {name: AverageScoreHeadRef.value[3],value: random.getRandomIntInclusiveInter(1,10),},
                    {name: AverageScoreHeadRef.value[4],value: random.getRandomIntInclusiveInter(1,5),},
                ],
            }]
        }
        charts_four.setOption(option);
    }

    const setEchartsFive = async () => {
        const option = {
            grid: {
                left: '8%',
                right: '4%',
                bottom: '10%',
            },
            xAxis: {
                type: 'category',
                axisTick: {
                    alignWithLabel: true
                },
                axisLabel: {
                    color: 'rgba(255, 255, 255)'
                },
                data: AverageScoreHeadRef.value
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    color: 'rgba(255, 255, 255)'
                },
            },
            label: {
                show: true,
                position: 'top',
                color: 'rgba(255, 255, 255)'
            },
            tooltip: {
                trigger: 'axis'
            },
            series: [{
                type: 'bar',
                barWidth: 25,
                name: '平均成绩分析',
                data: [
                    {name: AverageScoreHeadRef.value[0],value: random.getRandomIntInclusiveInter(1,45),},
                    {name: AverageScoreHeadRef.value[1],value: random.getRandomIntInclusiveInter(1,25),},
                    {name: AverageScoreHeadRef.value[2],value: random.getRandomIntInclusiveInter(1,15),},
                    {name: AverageScoreHeadRef.value[3],value: random.getRandomIntInclusiveInter(1,10),},
                    {name: AverageScoreHeadRef.value[4],value: random.getRandomIntInclusiveInter(1,5),},
                ],
            }]
        }
        charts_five.setOption(option);
    }

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

    const backHome = async (id) => location.href = `../`;
</script>

<template>
    <div class="screen-container" v-loading.fullscreen.lock="UIStore.siteErrors" element-loading-text="系统异常（请检查数据源）" :element-loading-svg="icons.loading" element-loading-svg-view-box="-10, -10, 50, 50">
        <img class="main-bg" src="../assets/images/map_bg.png" alt="" draggable="false">
        <div id='effect' style='position:absolute; width:100%; height:100%'></div>
        <div class="main-head">
            <div class="head-container">
                <div class="title-box" @click="backHome">
                    <img class="title-img" src="../../assets/image/mainl-3.png" alt="" draggable="false">
                    <span class="site-title">{{ UIStore.siteTitles }}</span>
                    <span class="site-desc">个人分析</span>
                </div>
                <div style="display: flex;">
                    <div class="head-box info-box">
                        <span class="title">姓名</span>
                        <span class="number">{{ studentInfo.na }}</span>
                    </div>
                    <div class="head-box info-box">
                        <span class="title">学号</span>
                        <span class="number">{{ studentInfo.id }}</span>
                    </div>
                    <div class="head-box info-box">
                        <span class="title">班级</span>
                        <span class="number">{{ studentInfo.ba }}</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="main-body">
            <div class="body-line">
                <div class="line-container">
                    <div class="list-box">
                        <div class="box-head">
                            <img src="../../assets/image/box_title.png" alt="" draggable="false">
                            <p class="head-title" v-if="ProfileDataRef != null">{{ ProfileDataRef[0][0] }}</p>
                        </div>
                        <div class="box-body">
                            <img src="../../assets/image/bg02.png" alt="" draggable="false">
                            <div class="canvas-box canvas-one"></div>
                        </div>
                    </div>
                </div>
                <div class="line-container">
                    <div class="list-box">
                        <div class="box-head">
                            <img src="../../assets/image/box_title.png" alt="" draggable="false">
                            <p class="head-title" v-if="ProfileDataRef != null">{{ ProfileDataRef[0][6] }}</p>
                        </div>
                        <div class="box-body">
                            <img src="../../assets/image/bg02.png" alt="" draggable="false">
                            <div class="canvas-box canvas-two"></div>
                        </div>
                    </div>
                </div>
                <div class="line-container">
                    <div class="list-box">
                        <div class="box-head">
                            <img src="../../assets/image/box_title.png" alt="" draggable="false">
                            <p class="head-title" v-if="ProfileDataRef != null">{{ ProfileDataRef[0][12] }}</p>
                        </div>
                        <div class="box-body">
                            <img src="../../assets/image/bg02.png" alt="" draggable="false">
                            <div class="canvas-box canvas-three"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="body-line">
                <div class="line-container">
                    <div class="list-box">
                        <div class="box-head">
                            <img src="../../assets/image/box_title.png" alt="" draggable="false">
                            <p class="head-title">小组排名情况</p>
                        </div>
                        <div class="box-body">
                            <img src="../../assets/image/bg02.png" alt="" draggable="false">
                            <el-table :data="GroupScoreRankDataRef" style="width: 100%" class="table" v-if="GroupScoreRankHeadRef != null && GroupScoreRankDataRef != null">
                                <el-table-column prop="pa" :label="GroupScoreRankHeadRef[0]" width="180" />
                                <el-table-column prop="zu" :label="GroupScoreRankHeadRef[1]" width="180" />
                                <el-table-column prop="ch" :label="GroupScoreRankHeadRef[2]" width="180"/>
                            </el-table>
                        </div>
                    </div>
                </div>
                <div class="line-container">
                    <div class="list-box">
                        <div class="box-head">
                            <img src="../../assets/image/box_title.png" alt="" draggable="false">
                            <p class="head-title">任务对比情况</p>
                        </div>
                        <div class="box-body">
                            <img src="../../assets/image/bg02.png" alt="" draggable="false">
                            <div class="canvas-box canvas-four"></div>
                        </div>
                    </div>
                </div>
                <div class="line-container">
                    <div class="list-box">
                        <div class="box-head">
                            <img src="../../assets/image/box_title.png" alt="" draggable="false">
                            <p class="head-title">综合成绩分析</p>
                        </div>
                        <div class="box-body">
                            <img src="../../assets/image/bg02.png" alt="" draggable="false">
                            <div class="canvas-box canvas-five"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>