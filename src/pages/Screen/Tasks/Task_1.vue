
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
    database.version(1).stores(databaseOption.screenTrees);
    let charts_one,charts_two,charts_three,charts_four,charts_five,charts_six;

    const UIStore = useUIStore();
    const chartElements = async () => {
        charts_one = echarts.init(document.querySelector(".canvas-one"));
        charts_two = echarts.init(document.querySelector(".canvas-two"));
        charts_three = echarts.init(document.querySelector(".canvas-three"));
        charts_four = echarts.init(document.querySelector(".canvas-four"));
        charts_five = echarts.init(document.querySelector(".canvas-five"));
        charts_six = echarts.init(document.querySelector(".canvas-six"));
    }

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
        charts_four.dispose();
        charts_five.dispose();
        charts_six.dispose();
    });

    const setAllCanvas = async () => {
        await setEchartsOne();
        await setEchartsTwo();
        await setEchartsThree();
        await setEchartsFour();
        await setEchartsFive();
        await setEchartsSix();
    }

    const setEchartsOne = async () => {
        let d1 = random.getRandomIntInclusiveInter(75,95);
        let d2 = random.getRandomIntInclusiveInter(75,95);
        let d3 = random.getRandomIntInclusiveInter(75,95);
        let d4 = random.getRandomIntInclusiveInter(75,95);
        let d5 = random.getRandomIntInclusiveInter(75,95);

        let g1 = d1 + random.getRandomIntInclusiveInter(1,5);
        let g2 = d2 + random.getRandomIntInclusiveInter(1,5);
        let g3 = d3 + random.getRandomIntInclusiveInter(1,5);
        let g4 = d4 + random.getRandomIntInclusiveInter(1,5);
        let g5 = d5 + random.getRandomIntInclusiveInter(1,5);

        const option = {
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                left: '6%',
                right: '4%',
                bottom: '12%',
                containLabel: true
            },
            legend: {
                left: 'center',
                bottom: '0%',
                textStyle: {
                    color: 'rgba(255, 255, 255)'
                },
                data: ['低阶任务', '高阶任务']
            },
            xAxis: {
                axisLabel: {
                    color: 'rgba(255, 255, 255)'
                },
                type: 'category',
                data: ['预检流程','IACC系统故障树','传感器的功能','检修方法与流程']
            },
            yAxis: {
                min: 70,
                max: 100,
                type: 'value',
            },
            series: [
                {
                    name: '低阶任务',
                    type: 'line',
                    data: [d1,d2,d3,d4,d5]
                },
                {
                    name: '高阶任务',
                    type: 'line',
                    data: [g1,g2,g3,g4,g5]
                },
            ]
        }
        charts_one.setOption(option);
    }

    const setEchartsTwo = async () => {
        let d1 = random.getRandomIntInclusiveInter(75,95);
        let d2 = random.getRandomIntInclusiveInter(75,95);
        let d3 = random.getRandomIntInclusiveInter(75,95);
        let d4 = random.getRandomIntInclusiveInter(75,95);
        let d5 = random.getRandomIntInclusiveInter(75,95);

        let g1 = d1 + random.getRandomIntInclusiveInter(1,5);
        let g2 = d2 + random.getRandomIntInclusiveInter(1,5);
        let g3 = d3 + random.getRandomIntInclusiveInter(1,5);
        let g4 = d4 + random.getRandomIntInclusiveInter(1,5);
        let g5 = d5 + random.getRandomIntInclusiveInter(1,5);

        const option = {
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                left: '6%',
                right: '4%',
                bottom: '12%',
                containLabel: true
            },
            legend: {
                left: 'center',
                bottom: '0%',
                textStyle: {
                    color: 'rgba(255, 255, 255)'
                },
                data: ['低阶任务', '高阶任务']
            },
            xAxis: {
                axisLabel: {
                    color: 'rgba(255, 255, 255)'
                },
                type: 'category',
                data: ['完成接车预检','读取故障码','完成接车预检','制定检修方案','拆装更换部件']
            },
            yAxis: {
                min: 70,
                max: 100,
                type: 'value',
            },
            series: [
                {
                    name: '低阶任务',
                    type: 'line',
                    data: [d1,d2,d3,d4,d5]
                },
                {
                    name: '高阶任务',
                    type: 'line',
                    data: [g1,g2,g3,g4,g5]
                },
            ]
        }
        charts_two.setOption(option);
    }

    const setEchartsThree = async () => {
        let d1 = random.getRandomIntInclusiveInter(75,95);
        let d2 = random.getRandomIntInclusiveInter(75,95);
        let d3 = random.getRandomIntInclusiveInter(75,95);
        let d4 = random.getRandomIntInclusiveInter(75,95);
        let d5 = random.getRandomIntInclusiveInter(75,95);

        let g1 = d1 + random.getRandomIntInclusiveInter(1,5);
        let g2 = d2 + random.getRandomIntInclusiveInter(1,5);
        let g3 = d3 + random.getRandomIntInclusiveInter(1,5);
        let g4 = d4 + random.getRandomIntInclusiveInter(1,5);
        let g5 = d5 + random.getRandomIntInclusiveInter(1,5);

        const option = {
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                left: '6%',
                right: '4%',
                bottom: '12%',
                containLabel: true
            },
            legend: {
                left: 'center',
                bottom: '0%',
                textStyle: {
                    color: 'rgba(255, 255, 255)'
                },
                data: ['低阶任务', '高阶任务']
            },
            xAxis: {
                axisLabel: {
                    color: 'rgba(255, 255, 255)'
                },
                type: 'category',
                data: ['安全生产意识','专注检测','精益维修','规范验证','新技术应用']
            },
            yAxis: {
                min: 70,
                max: 100,
                type: 'value',
            },
            series: [
                {
                    name: '低阶任务',
                    type: 'line',
                    data: [d1,d2,d3,d4,d5]
                },
                {
                    name: '高阶任务',
                    type: 'line',
                    data: [g1,g2,g3,g4,g5]
                },
            ]
        }
        charts_three.setOption(option);
    }

    const setEchartsFour = async () => {
        const option = {
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                left: '6%',
                right: '4%',
                bottom: '12%',
                containLabel: true
            },
            legend: {
                left: 'center',
                bottom: '0%',
                textStyle: {
                    color: 'rgba(255, 255, 255)'
                },
                data: ['低阶任务', '高阶任务']
            },
            xAxis: {
                axisLabel: {
                    color: 'rgba(255, 255, 255)'
                },
                type: 'category',
                data: ['任务一', '任务二', '任务三', '任务四', '任务五', '任务六', '任务七', '任务八'],
            },
            yAxis: {
                min: 70,
                max: 100,
                type: 'value',
            },
            series: [
                {
                    name: '低阶任务',
                    type: 'bar',
                    data: [random.getRandomIntInclusiveInter(70,100), random.getRandomIntInclusiveInter(70,100), random.getRandomIntInclusiveInter(70,100), random.getRandomIntInclusiveInter(70,100), random.getRandomIntInclusiveInter(70,100), random.getRandomIntInclusiveInter(70,100), random.getRandomIntInclusiveInter(70,100), random.getRandomIntInclusiveInter(70,100)]
                },
                {
                    name: '高阶任务',
                    type: 'bar',
                    data: [random.getRandomIntInclusiveInter(85,100), random.getRandomIntInclusiveInter(85,100), random.getRandomIntInclusiveInter(85,100), random.getRandomIntInclusiveInter(85,100), random.getRandomIntInclusiveInter(85,100), random.getRandomIntInclusiveInter(85,100), random.getRandomIntInclusiveInter(85,100), random.getRandomIntInclusiveInter(85,100)]
                },
            ]
        }
        charts_four.setOption(option);
    }

    const setEchartsFive = async () => {
        const option = {
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                left: '6%',
                right: '4%',
                bottom: '12%',
                containLabel: true
            },
            legend: {
                left: 'center',
                bottom: '0%',
                textStyle: {
                    color: 'rgba(255, 255, 255)'
                },
                data: ['低阶任务', '高阶任务']
            },
            xAxis: {
                axisLabel: {
                    color: 'rgba(255, 255, 255)'
                },
                type: 'category',
                data: ['任务一', '任务二', '任务三', '任务四', '任务五', '任务六', '任务七', '任务八'],
            },
            yAxis: {
                min: 70,
                max: 100,
                type: 'value',
            },
            series: [
                {
                    name: '低阶任务',
                    type: 'bar',
                    data: [random.getRandomIntInclusiveInter(70,100), random.getRandomIntInclusiveInter(70,100), random.getRandomIntInclusiveInter(70,100), random.getRandomIntInclusiveInter(70,100), random.getRandomIntInclusiveInter(70,100), random.getRandomIntInclusiveInter(70,100), random.getRandomIntInclusiveInter(70,100), random.getRandomIntInclusiveInter(70,100)]
                },
                {
                    name: '高阶任务',
                    type: 'bar',
                    data: [random.getRandomIntInclusiveInter(85,100), random.getRandomIntInclusiveInter(85,100), random.getRandomIntInclusiveInter(85,100), random.getRandomIntInclusiveInter(85,100), random.getRandomIntInclusiveInter(85,100), random.getRandomIntInclusiveInter(85,100), random.getRandomIntInclusiveInter(85,100), random.getRandomIntInclusiveInter(85,100)]
                },
            ]
        }
        charts_five.setOption(option);
    }

    const setEchartsSix = async () => {
        const option = {
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                left: '6%',
                right: '4%',
                bottom: '12%',
                containLabel: true
            },
            legend: {
                left: 'center',
                bottom: '0%',
                textStyle: {
                    color: 'rgba(255, 255, 255)'
                },
                data: ['低阶任务', '高阶任务']
            },
            xAxis: {
                axisLabel: {
                    color: 'rgba(255, 255, 255)'
                },
                type: 'category',
                data: ['任务一', '任务二', '任务三', '任务四', '任务五', '任务六', '任务七', '任务八'],
            },
            yAxis: {
                min: 70,
                max: 100,
                type: 'value',
            },
            series: [
                {
                    name: '低阶任务',
                    type: 'bar',
                    data: [random.getRandomIntInclusiveInter(70,100), random.getRandomIntInclusiveInter(70,100), random.getRandomIntInclusiveInter(70,100), random.getRandomIntInclusiveInter(70,100), random.getRandomIntInclusiveInter(70,100), random.getRandomIntInclusiveInter(70,100), random.getRandomIntInclusiveInter(70,100), random.getRandomIntInclusiveInter(70,100)]
                },
                {
                    name: '高阶任务',
                    type: 'bar',
                    data: [random.getRandomIntInclusiveInter(85,100), random.getRandomIntInclusiveInter(85,100), random.getRandomIntInclusiveInter(85,100), random.getRandomIntInclusiveInter(85,100), random.getRandomIntInclusiveInter(85,100), random.getRandomIntInclusiveInter(85,100), random.getRandomIntInclusiveInter(85,100), random.getRandomIntInclusiveInter(85,100)]
                },
            ]
        }
        charts_six.setOption(option);
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
</script>

<template>
    <div class="screen-container" v-loading.fullscreen.lock="UIStore.siteErrors" element-loading-text="系统异常（请检查数据源）" :element-loading-svg="icons.loading" element-loading-svg-view-box="-10, -10, 50, 50">
        <img class="main-bg" src="../../assets/images/map_bg.png" alt="" draggable="false">
        <div id='effect' style='position:absolute; width:100%; height:100%'></div>
        <div class="main-head">
            <div class="head-container">
                <div class="title-box" @click="backHome">
                    <img class="title-img" src="../../../assets/image/mainl-3.png" alt="" draggable="false">
                    <span class="site-title">{{ UIStore.siteTitles }}</span>
                    <span class="site-desc">小组增值&nbsp;&nbsp;&nbsp;{{ ScreenStore.groupList[Number(id.someProp) - 1] }}</span>
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
                            <img src="../../../assets/image/box_title.png" alt="" draggable="false">
                            <p class="head-title">小组知识增值</p>
                        </div>
                        <div class="box-body">
                            <img src="../../../assets/image/bg02.png" alt="" draggable="false">
                            <div class="canvas-box canvas-one"></div>
                        </div>
                    </div>
                </div>
                <div class="line-container">
                    <div class="list-box">
                        <div class="box-head">
                            <img src="../../../assets/image/box_title.png" alt="" draggable="false">
                            <p class="head-title">小组能力增值</p>
                        </div>
                        <div class="box-body">
                            <img src="../../../assets/image/bg02.png" alt="" draggable="false">
                            <div class="canvas-box canvas-two"></div>
                        </div>
                    </div>
                </div>
                <div class="line-container">
                    <div class="list-box">
                        <div class="box-head">
                            <img src="../../../assets/image/box_title.png" alt="" draggable="false">
                            <p class="head-title">小组素养增值</p>
                        </div>
                        <div class="box-body">
                            <img src="../../../assets/image/bg02.png" alt="" draggable="false">
                            <div class="canvas-box canvas-three"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="body-line">
                <div class="line-container">
                    <div class="list-box">
                        <div class="box-head">
                            <img src="../../../assets/image/box_title.png" alt="" draggable="false">
                            <p class="head-title">知识成绩分布</p>
                        </div>
                        <div class="box-body">
                            <img src="../../../assets/image/bg02.png" alt="" draggable="false">
                            <div class="canvas-box canvas-four"></div>
                        </div>
                    </div>
                </div>
                <div class="line-container">
                    <div class="list-box">
                        <div class="box-head">
                            <img src="../../../assets/image/box_title.png" alt="" draggable="false">
                            <p class="head-title">能力成绩分布</p>
                        </div>
                        <div class="box-body">
                            <img src="../../../assets/image/bg02.png" alt="" draggable="false">
                            <div class="canvas-box canvas-five"></div>
                        </div>
                    </div>
                </div>
                <div class="line-container">
                    <div class="list-box">
                        <div class="box-head">
                            <img src="../../../assets/image/box_title.png" alt="" draggable="false">
                            <p class="head-title">素质成绩分布</p>
                        </div>
                        <div class="box-body">
                            <img src="../../../assets/image/bg02.png" alt="" draggable="false">
                            <div class="canvas-box canvas-six"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>