
<script setup>
    import * as echarts from 'echarts'
    import icons from "@/scripts/icons.js"
    import random from '@/scripts/random.js'
    import { useUIStore } from '@/stores/UIStore.js'
    import databaseOption from "@/scripts/database.js"
    import { onBeforeUnmount, onMounted, ref } from "vue"
    import { useScreentore } from "@/stores/ScreenStore.js"

    defineProps({ id: Object });
    const ScreenStore = useScreentore();
    let database = databaseOption.screenDatabase;
    let charts_one,charts_two,charts_three,charts_five;
    let studentDatabase = databaseOption.studentDatabase;
    database.version(1).stores(databaseOption.screenTrees);
    studentDatabase.version(1).stores(databaseOption.studentTrees);

    const UIStore = useUIStore();
    const chartElements = async () => {
        charts_one = echarts.init(document.querySelector(".canvas-one"));
        charts_two = echarts.init(document.querySelector(".canvas-two"));
        charts_three = echarts.init(document.querySelector(".canvas-three"));
        charts_five = echarts.init(document.querySelector(".canvas-five"));
    }

    const GroupAslyTitleRef = ref(null);
    const GroupAslyLabelRef = ref(null);
    const GroupAslyDatasRef = ref(null);

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

        let ProFileData = await studentDatabase.familysAsly.toArray();
        ProfileDataRef.value = ProFileData[0].data;

        let GroupAslyData = await studentDatabase.groupsAsly.toArray();
        GroupAslyTitleRef.value = GroupAslyData[0].data[0];
        GroupAslyLabelRef.value = GroupAslyData[0].data[1];
        GroupAslyDatasRef.value = GroupAslyData[0].data[2];
        console.log(GroupAslyData)
        console.log(GroupAslyLabelRef.value)

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
        charts_one.dispose();
        charts_two.dispose();
        charts_three.dispose();
        charts_five.dispose();
        charts_six.dispose();
    });

    const setAllCanvas = async () => {
        await setEchartsOne();
        await setEchartsTwo();
        await setEchartsThree();
        await setEchartsFive();
    }

    const setEchartsOne = async () => {
        let label = [],datas = [];
        for(let i=0;i<5;i++) {
            label.push(GroupAslyLabelRef.value[i]);
            datas.push(GroupAslyDatasRef.value[i]);
        }


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
                data: label
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
                data: datas
            }]
        }
        charts_one.setOption(option);
    }

    const setEchartsTwo = async () => {
        let label = [],datas = [];
        for(let i=6;i<10;i++) {
            label.push(GroupAslyLabelRef.value[i]);
            datas.push(GroupAslyDatasRef.value[i]);
        }

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
                data: label
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
                data: datas
            }]
        }
        charts_two.setOption(option);
    }

    const setEchartsThree = async () => {
        let label = [],datas = [];
        for(let i=12;i<16;i++) {
            label.push(GroupAslyLabelRef.value[i]);
            datas.push(GroupAslyDatasRef.value[i]);
        }

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
                data: label
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
                data: datas
            }]
        }
        charts_three.setOption(option);
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
                data: ['第一组', '第二组', '第三组', '第四组', '第五组','第六组','第七组','第八组'],
            },
            yAxis: {
                min: 70,
                max: 100,
                type: 'value',
                axisLabel: {
                    color: 'rgba(255, 255, 255)'
                },
            },
            label: {
                show: true,
                position: 'top',
                color: 'rgba(255, 255, 255)',
            },
            legend: {
                left: 'center',
                textStyle: {
                    color: 'rgba(255, 255, 255)'
                },
                data: ['沟通', '分工','决策']
            },
            tooltip: {
                trigger: 'axis'
            },
            series: [{
                name: '沟通',
                type: 'line',
                barWidth: 25,
                data: [
                    random.getRandomIntInclusiveInter(70,100),
                    random.getRandomIntInclusiveInter(70,100),
                    random.getRandomIntInclusiveInter(70,100),
                    random.getRandomIntInclusiveInter(70,100),
                    random.getRandomIntInclusiveInter(70,100),
                    random.getRandomIntInclusiveInter(70,100),
                    random.getRandomIntInclusiveInter(70,100),
                    random.getRandomIntInclusiveInter(70,100),
                ]
            },{
                name: '分工',
                type: 'line',
                barWidth: 25,
                data: [
                    random.getRandomIntInclusiveInter(70,100),
                    random.getRandomIntInclusiveInter(70,100),
                    random.getRandomIntInclusiveInter(70,100),
                    random.getRandomIntInclusiveInter(70,100),
                    random.getRandomIntInclusiveInter(70,100),
                    random.getRandomIntInclusiveInter(70,100),
                    random.getRandomIntInclusiveInter(70,100),
                    random.getRandomIntInclusiveInter(70,100),
                ]
            },
            {
                name: '决策',
                type: 'line',
                barWidth: 25,
                data: [
                    random.getRandomIntInclusiveInter(70,100),
                    random.getRandomIntInclusiveInter(70,100),
                    random.getRandomIntInclusiveInter(70,100),
                    random.getRandomIntInclusiveInter(70,100),
                    random.getRandomIntInclusiveInter(70,100),
                    random.getRandomIntInclusiveInter(70,100),
                    random.getRandomIntInclusiveInter(70,100),
                    random.getRandomIntInclusiveInter(70,100),
                ]
            }]
        }
        charts_five.setOption(option);
    }

    onMounted(async () => {
        try {
            await chartElements();
            await queryScreenData();
        } catch {
            await UIStore.setSiteErrors(true);
            await ElMessage({ message: '数据源异常！', type: 'error', plain: true});
        }
    });

    const backHome = async (id) => location.href = `../`;

    const GroupStart = ref([
        { zu: '第一组', mz: '任思旭' },
        { zu: '第二组', mz: '刘运林' },
        { zu: '第三组', mz: '任思旭' },
        { zu: '第四组', mz: '罗鹏' },
        { zu: '第五组', mz: '龙锦然' },
        { zu: '第六组', mz: '杨椓雲' },
        { zu: '第七组', mz: '张明豪' },
        { zu: '第八组', mz: '吴国鸿' },
    ]);
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
                    <span class="site-desc">小组分析&nbsp;&nbsp;&nbsp;{{ ScreenStore.taskList.find(item => item.id == Number(id.someProp)).name }}</span>
                </div>
                <div style="display: flex;">
                    <div class="head-box" v-for="(item,key) in AttendanceHeadRef" :key="key" v-if="AttendanceDataRef != null">
                        <span class="title">{{ item }}</span>
                        <span class="number">{{ AttendanceDataRef[key] }}</span>
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
                            <p class="head-title" v-if="GroupAslyTitleRef != null">{{ GroupAslyTitleRef[0] }}</p>
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
                            <p class="head-title" v-if="GroupAslyTitleRef != null">{{ GroupAslyTitleRef[6] }}</p>
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
                            <p class="head-title" v-if="GroupAslyTitleRef != null">{{ GroupAslyTitleRef[12] }}</p>
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
                            <p class="head-title" v-if="GroupAslyTitleRef != null">{{ GroupAslyTitleRef[18] }}</p>
                        </div>
                        <div class="box-body">
                            <img src="../../assets/image/bg02.png" alt="" draggable="false">
                            <el-table :data="AverageScoreRankDataRef" style="width: 100%" class="table" v-if="AverageScoreRankHeadRef != null && AverageScoreRankDataRef != null">
                                <el-table-column prop="pa" :label="AverageScoreRankHeadRef[0]" width="180" />
                                <el-table-column prop="zu" :label="AverageScoreRankHeadRef[1]" width="180" />
                                <el-table-column prop="ch" :label="AverageScoreRankHeadRef[2]" width="180"/>
                            </el-table>
                        </div>
                    </div>
                </div>
                <div class="line-container">
                    <div class="list-box">
                        <div class="box-head">
                            <img src="../../assets/image/box_title.png" alt="" draggable="false">
                            <p class="head-title">小组协作情况</p>
                        </div>
                        <div class="box-body">
                            <img src="../../assets/image/bg02.png" alt="" draggable="false">
                            <div class="canvas-box canvas-five"></div>
                        </div>
                    </div>
                </div>
                <div class="line-container">
                    <div class="list-box">
                        <div class="box-head">
                            <img src="../../assets/image/box_title.png" alt="" draggable="false">
                            <p class="head-title">小组技能之星</p>
                        </div>
                        <div class="box-body">
                            <img src="../../assets/image/bg02.png" alt="" draggable="false">
                            <el-table :data="GroupStart" style="width: 100%;margin-top:0" class="table" v-if="GroupStart != null">
                                <el-table-column prop="zu"  width="180" />
                                <el-table-column prop="mz"  width="180" />
                            </el-table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>