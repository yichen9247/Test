
<script setup>
    import * as echarts from 'echarts'
    import icons from "@/scripts/icons.js"
    import { useUIStore } from '@/stores/UIStore.js'
    import databaseOption from "@/scripts/database.js"
    import { onBeforeUnmount, onMounted, ref } from "vue"

    let database = databaseOption.screenDatabase;
    database.version(1).stores(databaseOption.screenTrees);
    let charts_one,charts_two,charts_three,charts_four,charts_five,charts_six;
    
    const UIStore = useUIStore();
    const chartElements = async () => {
        charts_one = echarts.init(document.querySelector(".canvas-one"));
        charts_two = echarts.init(document.querySelector(".canvas-two"));
        charts_three = echarts.init(document.querySelector(".canvas-three"));
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
    });

    const setAllCanvas = async () => {
        await setEchartsOne();
        await setEchartsTwo();
        await setEchartsThree();
    }

    const setEchartsOne = async () => {
        const option = {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                left: 'center',
                bottom: '0%',
                textStyle: {
                    color: 'rgba(255, 255, 255)'
                },
                data: ['班级平均', '个人平均']
            },
            radar: {
                indicator: [
                    { name: '雷达加装流程', max: 100 },
                    { name: '雷达加装要求', max: 100 },
                    { name: '激光雷达知识', max: 100 },
                    { name: '融合标定流程', max: 100 },
                    { name: '融合标定原理', max: 100 },
                ],
            },
            series: [{
                name: 'Budget vs spending',
                type: 'radar',
                itemStyle: {
                    borderWidth: 2,
                    borderRadius: 10,
                    borderColor: '#ffffff'
                },
                data: [
                    {
                        value: [
                            AverageScoreRankDataRef.value[0].ch,
                            AverageScoreRankDataRef.value[1].ch,
                            AverageScoreRankDataRef.value[2].ch,
                            AverageScoreRankDataRef.value[3].ch,
                            AverageScoreRankDataRef.value[4].ch,
                        ],
                        name: '班级平均'
                    },{
                        value: [
                            GroupScoreRankDataRef.value[0].ch,
                            GroupScoreRankDataRef.value[1].ch,
                            GroupScoreRankDataRef.value[2].ch,
                            GroupScoreRankDataRef.value[3].ch,
                            GroupScoreRankDataRef.value[4].ch,
                        ],
                        name: '个人平均'
                    }
                ]
            }]
        }
        charts_one.setOption(option);
    }

    const setEchartsTwo = async () => {
        const option = {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                left: 'center',
                bottom: '0%',
                textStyle: {
                    color: 'rgba(255, 255, 255)'
                },
                data: ['班级平均', '个人平均']
            },
            radar: {
                indicator: [
                    { name: '方案设计', max: 100 },
                    { name: '认知能力', max: 100 },
                    { name: '测试能力', max: 100 },
                    { name: '装配能力', max: 100 },
                    { name: '标定能力', max: 100 },
                ],
            },
            series: [{
                name: 'Budget vs spending',
                type: 'radar',
                itemStyle: {
                    borderWidth: 2,
                    borderRadius: 10,
                    borderColor: '#ffffff'
                },
                data: [
                    {
                        value: [
                            AverageScoreRankDataRef.value[0].ch,
                            AverageScoreRankDataRef.value[1].ch,
                            AverageScoreRankDataRef.value[2].ch,
                            AverageScoreRankDataRef.value[3].ch,
                            AverageScoreRankDataRef.value[4].ch,
                        ],
                        name: '班级平均'
                    },{
                        value: [
                            GroupScoreRankDataRef.value[0].ch,
                            GroupScoreRankDataRef.value[1].ch,
                            GroupScoreRankDataRef.value[2].ch,
                            GroupScoreRankDataRef.value[3].ch,
                            GroupScoreRankDataRef.value[4].ch,
                        ],
                        name: '个人平均'
                    }
                ]
            }]
        }
        charts_two.setOption(option);
    }

    const setEchartsThree = async () => {
        const option = {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                left: 'center',
                bottom: '0%',
                textStyle: {
                    color: 'rgba(255, 255, 255)'
                },
                data: ['班级平均', '个人平均']
            },
            radar: {
                indicator: [
                    { name: '安全意识', max: 100 },
                    { name: '规范意识', max: 100 },
                    { name: '劳动精神', max: 100 },
                    { name: '协作精神', max: 100 },
                    { name: '创新意识', max: 100 },
                ],
            },
            series: [{
                name: 'Budget vs spending',
                type: 'radar',
                itemStyle: {
                    borderWidth: 2,
                    borderRadius: 10,
                    borderColor: '#ffffff'
                },
                data: [
                    {
                        value: [
                            AverageScoreRankDataRef.value[0].ch,
                            AverageScoreRankDataRef.value[1].ch,
                            AverageScoreRankDataRef.value[2].ch,
                            AverageScoreRankDataRef.value[3].ch,
                            AverageScoreRankDataRef.value[4].ch,
                        ],
                        name: '班级平均'
                    },{
                        value: [
                            GroupScoreRankDataRef.value[0].ch,
                            GroupScoreRankDataRef.value[1].ch,
                            GroupScoreRankDataRef.value[2].ch,
                            GroupScoreRankDataRef.value[3].ch,
                            GroupScoreRankDataRef.value[4].ch,
                        ],
                        name: '个人平均'
                    }
                ]
            }]
        }
        charts_three.setOption(option);
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
        <img class="main-bg" src="../assets/images/map_bg.png" alt="" draggable="false">
        <div id='effect' style='position:absolute; width:100%; height:100%'></div>
        <div class="main-head">
            <div class="head-container">
                <div class="title-box" @click="backHome">
                    <img class="title-img" src="../../assets/image/mainl-3.png" alt="" draggable="false">
                    <span class="site-title">{{ UIStore.siteTitles }}</span>
                    <span class="site-desc">任务六</span>
                </div>
                <div class="head-box" v-for="(item,key) in AttendanceHeadRef" :key="key" v-if="AttendanceDataRef != null">
                    <span class="title">{{ item }}</span>
                    <span class="number">{{ AttendanceDataRef[key] }}</span>
                </div>
            </div>
        </div>
        <img class="line" src="../../assets/image/bottom.png" alt="" draggable="false">

        <div class="main-body">
            <div class="body-line">
                <div class="line-container">
                    <div class="list-box">
                        <div class="box-head">
                            <img src="../../assets/image/box_title.png" alt="" draggable="false">
                            <p class="head-title">平均成绩排名</p>
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
                            <p class="head-title">小组成绩排名</p>
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
                            <p class="head-title">技能标兵排名</p>
                        </div>
                        <div class="box-body">
                            <img src="../../assets/image/bg02.png" alt="" draggable="false">
                            <el-table :data="SkillRankDataRef" style="width: 100%" class="table" v-if="SkillRankHeadRef != null && SkillRankDataRef != null">
                                <el-table-column prop="pa" :label="SkillRankHeadRef[0]" width="180" />
                                <el-table-column prop="zu" :label="SkillRankHeadRef[1]" width="180" />
                                <el-table-column prop="ch" :label="SkillRankHeadRef[2]" width="180"/>
                            </el-table>
                        </div>
                    </div>
                </div>
            </div>

            <div class="body-line">
                <div class="line-container">
                    <div class="list-box">
                        <div class="box-head">
                            <img src="../../assets/image/box_title.png" alt="" draggable="false">
                            <p class="head-title">整体知识目标分析</p>
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
                            <p class="head-title">整体能力目标分析</p>
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
                            <p class="head-title">整体素质目标分析</p>
                        </div>
                        <div class="box-body">
                            <img src="../../assets/image/bg02.png" alt="" draggable="false">
                            <div class="canvas-box canvas-three"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>