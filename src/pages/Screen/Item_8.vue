
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
        await charts_one.dispose();
        await charts_two.dispose();
        await charts_three.dispose();
        await charts_four.dispose();
        await charts_five.dispose();
        await charts_six.dispose();
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
        const rawData = [
            [
                AverageScoreRankDataRef.value[0].ch,
                AverageScoreRankDataRef.value[1].ch,
                AverageScoreRankDataRef.value[2].ch,
                AverageScoreRankDataRef.value[3].ch,
                AverageScoreRankDataRef.value[4].ch,
            ],
            [
                GroupScoreRankDataRef.value[0].ch,
                GroupScoreRankDataRef.value[1].ch,
                GroupScoreRankDataRef.value[2].ch,
                GroupScoreRankDataRef.value[3].ch,
                GroupScoreRankDataRef.value[4].ch,
            ],
            [
                SkillRankDataRef.value[0].ch,
                SkillRankDataRef.value[1].ch,
                SkillRankDataRef.value[2].ch,
                SkillRankDataRef.value[3].ch,
                SkillRankDataRef.value[4].ch,
            ],
        ];
        const totalData = [];
        for (let i = 0; i < rawData[0].length; ++i) {
            let sum = 0;
            for (let j = 0; j < rawData.length; ++j) {
                sum += rawData[j][i];
            }
            totalData.push(sum);
        }
        const series = ['知识分数','能力分数','素质分数'].map((name, sid) => {
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
            legend: {
                left: 'center',
                bottom: '0%',
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
                data: [
                    AverageScoreRankDataRef.value[0].zu,
                    AverageScoreRankDataRef.value[1].zu,
                    AverageScoreRankDataRef.value[2].zu,
                    AverageScoreRankDataRef.value[3].zu,
                    AverageScoreRankDataRef.value[4].zu
                ],
                axisLabel: {
                    color: 'rgba(255, 255, 255)'
                },
            },
            series
        }
        charts_one.setOption(option);
    }

    const setEchartsTwo = async () => {
        const rawData = [
            [
                AverageScoreRankDataRef.value[0].ch,
                AverageScoreRankDataRef.value[1].ch,
                AverageScoreRankDataRef.value[2].ch,
                AverageScoreRankDataRef.value[3].ch,
                AverageScoreRankDataRef.value[4].ch,
            ],
            [
                GroupScoreRankDataRef.value[0].ch,
                GroupScoreRankDataRef.value[1].ch,
                GroupScoreRankDataRef.value[2].ch,
                GroupScoreRankDataRef.value[3].ch,
                GroupScoreRankDataRef.value[4].ch,
            ],
            [
                SkillRankDataRef.value[0].ch,
                SkillRankDataRef.value[1].ch,
                SkillRankDataRef.value[2].ch,
                SkillRankDataRef.value[3].ch,
                SkillRankDataRef.value[4].ch,
            ],
        ];
        const totalData = [];
        for (let i = 0; i < rawData[0].length; ++i) {
            let sum = 0;
            for (let j = 0; j < rawData.length; ++j) {
                sum += rawData[j][i];
            }
            totalData.push(sum);
        }
        const series = ['知识分数','能力分数','素质分数'].map((name, sid) => {
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
            legend: {
                left: 'center',
                bottom: '0%',
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
                data: [
                    AverageScoreRankDataRef.value[0].zu,
                    AverageScoreRankDataRef.value[1].zu,
                    AverageScoreRankDataRef.value[2].zu,
                    AverageScoreRankDataRef.value[3].zu,
                    AverageScoreRankDataRef.value[4].zu
                ],
                axisLabel: {
                    color: 'rgba(255, 255, 255)'
                },
            },
            series
        }
        charts_two.setOption(option);
    }

    const setEchartsThree = async () => {
        const rawData = [
            [
                AverageScoreRankDataRef.value[0].ch,
                AverageScoreRankDataRef.value[1].ch,
                AverageScoreRankDataRef.value[2].ch,
                AverageScoreRankDataRef.value[3].ch,
                AverageScoreRankDataRef.value[4].ch,
            ],
            [
                GroupScoreRankDataRef.value[0].ch,
                GroupScoreRankDataRef.value[1].ch,
                GroupScoreRankDataRef.value[2].ch,
                GroupScoreRankDataRef.value[3].ch,
                GroupScoreRankDataRef.value[4].ch,
            ],
            [
                SkillRankDataRef.value[0].ch,
                SkillRankDataRef.value[1].ch,
                SkillRankDataRef.value[2].ch,
                SkillRankDataRef.value[3].ch,
                SkillRankDataRef.value[4].ch,
            ],
        ];
        const totalData = [];
        for (let i = 0; i < rawData[0].length; ++i) {
            let sum = 0;
            for (let j = 0; j < rawData.length; ++j) {
                sum += rawData[j][i];
            }
            totalData.push(sum);
        }
        const series = ['知识分数','能力分数','素质分数'].map((name, sid) => {
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
            legend: {
                left: 'center',
                bottom: '0%',
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
                data: [
                    AverageScoreRankDataRef.value[0].zu,
                    AverageScoreRankDataRef.value[1].zu,
                    AverageScoreRankDataRef.value[2].zu,
                    AverageScoreRankDataRef.value[3].zu,
                    AverageScoreRankDataRef.value[4].zu
                ],
                axisLabel: {
                    color: 'rgba(255, 255, 255)'
                },
            },
            series
        }
        charts_three.setOption(option);
    }

    const setEchartsFour = async () => {
        const rawData = [
            [
                AverageScoreRankDataRef.value[0].ch,
                AverageScoreRankDataRef.value[1].ch,
                AverageScoreRankDataRef.value[2].ch,
                AverageScoreRankDataRef.value[3].ch,
                AverageScoreRankDataRef.value[4].ch,
            ],
            [
                GroupScoreRankDataRef.value[0].ch,
                GroupScoreRankDataRef.value[1].ch,
                GroupScoreRankDataRef.value[2].ch,
                GroupScoreRankDataRef.value[3].ch,
                GroupScoreRankDataRef.value[4].ch,
            ],
            [
                SkillRankDataRef.value[0].ch,
                SkillRankDataRef.value[1].ch,
                SkillRankDataRef.value[2].ch,
                SkillRankDataRef.value[3].ch,
                SkillRankDataRef.value[4].ch,
            ],
        ];
        const totalData = [];
        for (let i = 0; i < rawData[0].length; ++i) {
            let sum = 0;
            for (let j = 0; j < rawData.length; ++j) {
                sum += rawData[j][i];
            }
            totalData.push(sum);
        }
        const series = ['知识分数','能力分数','素质分数'].map((name, sid) => {
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
            legend: {
                left: 'center',
                bottom: '0%',
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
                data: [
                    AverageScoreRankDataRef.value[0].zu,
                    AverageScoreRankDataRef.value[1].zu,
                    AverageScoreRankDataRef.value[2].zu,
                    AverageScoreRankDataRef.value[3].zu,
                    AverageScoreRankDataRef.value[4].zu
                ],
                axisLabel: {
                    color: 'rgba(255, 255, 255)'
                },
            },
            series
        }
        charts_four.setOption(option);
    }

    const setEchartsFive = async () => {
        const rawData = [
            [
                AverageScoreRankDataRef.value[0].ch,
                AverageScoreRankDataRef.value[1].ch,
                AverageScoreRankDataRef.value[2].ch,
                AverageScoreRankDataRef.value[3].ch,
                AverageScoreRankDataRef.value[4].ch,
            ],
            [
                GroupScoreRankDataRef.value[0].ch,
                GroupScoreRankDataRef.value[1].ch,
                GroupScoreRankDataRef.value[2].ch,
                GroupScoreRankDataRef.value[3].ch,
                GroupScoreRankDataRef.value[4].ch,
            ],
            [
                SkillRankDataRef.value[0].ch,
                SkillRankDataRef.value[1].ch,
                SkillRankDataRef.value[2].ch,
                SkillRankDataRef.value[3].ch,
                SkillRankDataRef.value[4].ch,
            ],
        ];
        const totalData = [];
        for (let i = 0; i < rawData[0].length; ++i) {
            let sum = 0;
            for (let j = 0; j < rawData.length; ++j) {
                sum += rawData[j][i];
            }
            totalData.push(sum);
        }
        const series = ['知识分数','能力分数','素质分数'].map((name, sid) => {
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
            legend: {
                left: 'center',
                bottom: '0%',
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
                data: [
                    AverageScoreRankDataRef.value[0].zu,
                    AverageScoreRankDataRef.value[1].zu,
                    AverageScoreRankDataRef.value[2].zu,
                    AverageScoreRankDataRef.value[3].zu,
                    AverageScoreRankDataRef.value[4].zu
                ],
                axisLabel: {
                    color: 'rgba(255, 255, 255)'
                },
            },
            series
        }
        charts_five.setOption(option);
    }

    const setEchartsSix = async () => {
        const rawData = [
            [
                AverageScoreRankDataRef.value[0].ch,
                AverageScoreRankDataRef.value[1].ch,
                AverageScoreRankDataRef.value[2].ch,
                AverageScoreRankDataRef.value[3].ch,
                AverageScoreRankDataRef.value[4].ch,
            ],
            [
                GroupScoreRankDataRef.value[0].ch,
                GroupScoreRankDataRef.value[1].ch,
                GroupScoreRankDataRef.value[2].ch,
                GroupScoreRankDataRef.value[3].ch,
                GroupScoreRankDataRef.value[4].ch,
            ],
            [
                SkillRankDataRef.value[0].ch,
                SkillRankDataRef.value[1].ch,
                SkillRankDataRef.value[2].ch,
                SkillRankDataRef.value[3].ch,
                SkillRankDataRef.value[4].ch,
            ],
        ];
        const totalData = [];
        for (let i = 0; i < rawData[0].length; ++i) {
            let sum = 0;
            for (let j = 0; j < rawData.length; ++j) {
                sum += rawData[j][i];
            }
            totalData.push(sum);
        }
        const series = ['知识分数','能力分数','素质分数'].map((name, sid) => {
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
            legend: {
                left: 'center',
                bottom: '0%',
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
                data: [
                    AverageScoreRankDataRef.value[0].zu,
                    AverageScoreRankDataRef.value[1].zu,
                    AverageScoreRankDataRef.value[2].zu,
                    AverageScoreRankDataRef.value[3].zu,
                    AverageScoreRankDataRef.value[4].zu
                ],
                axisLabel: {
                    color: 'rgba(255, 255, 255)'
                },
            },
            series
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
        <img class="main-bg" src="../assets/images/map_bg.png" alt="" draggable="false">
        <div id='effect' style='position:absolute; width:100%; height:100%'></div>
        <div class="main-head">
            <div class="head-container">
                <div class="title-box" @click="backHome">
                    <img class="title-img" src="../../assets/image/mainl-3.png" alt="" draggable="false">
                    <span class="site-title">{{ UIStore.siteTitles }}</span>
                    <span class="site-desc">任务八</span>
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
                            <p class="head-title">第一组成绩统计</p>
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
                            <p class="head-title">第二组成绩统计</p>
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
                            <p class="head-title">第三组成绩统计</p>
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
                            <p class="head-title">第四组成绩统计</p>
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
                            <p class="head-title">第五组成绩统计</p>
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
                            <p class="head-title">第六组成绩统计</p>
                        </div>
                        <div class="box-body">
                            <img src="../../assets/image/bg02.png" alt="" draggable="false">
                            <div class="canvas-box canvas-six"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>