
<script setup>
    import "./assets/Index.css"
    import task from "@/scripts/task"
    import * as echarts from 'echarts'
    import { useRoute } from "vue-router"
    import icons from "@/scripts/icons.js"
    import classreport from "@/scripts/classreport"
    import { useUIStore } from '@/stores/UIStore.js'
    import { onBeforeUnmount, onMounted, ref } from "vue"

    const route = useRoute();
    const UIStore = useUIStore();
    const pageId = ref(Number(route.params.id) - 1);
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
        charts_five.dispose();
        charts_six.dispose();
    });

    onMounted(async () => {
        try {
            await chartElements();
            await setAllCanvas();
            document.title = "学生个人能力画像";
        } catch(e) {
            await UIStore.setSiteErrors(true);
            // eslint-disable-next-line no-undef
            await ElMessage({ message: '数据源异常！', type: 'error', plain: true});
        }
    });

    const setEchartsOne = async () => {
        const option = {
            tooltip: {
                trigger: 'item'
            },
            series: [{
                type: 'pie',
                radius: ['0','65%'],
                itemStyle: {
                    borderWidth: 2,
                    borderRadius: 10,
                    borderColor: '#ffffff'
                },
                label: {
                    show: true,
                    color: 'rgba(255, 255, 255)'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left'
                },
                data: classreport[pageId.value][0].data,
            }]
        };
        charts_one.setOption(option);
    }

    const setEchartsTwo = async () => {
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
                left: '8%',
                right: '4%',
                bottom: '13%',
            },
            dataset: classreport[pageId.value][1].dataset,
            xAxis: { 
                type: 'category',
                axisLabel: {
                    color: 'rgba(255, 255, 255)'
                },
             },
            label: {
                show: true,
                position: 'top',
                color: 'rgba(255, 255, 255)'
            },
            yAxis: {},
            series: [{ type: 'line' }, { type: 'line' }]
        };
        charts_two.setOption(option);
    }

    const setEchartsThree = async () => {
        const option = {
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            series: [{
                type: 'pie',
                selectedMode: 'single',
                radius: [0, '30%'],
                label: {
                    position: 'inner',
                    fontSize: 14,
                    color: 'rgba(255, 255, 255)'
                },
                labelLine: {
                    show: false
                },
                data: classreport[pageId.value][2].series.data
            },{
            type: 'pie',
            radius: ['55%', '45%'],
            labelLine: {
                length: 25
            },
            label: {
                formatter: '  {b|{b}} {c}  ',
                backgroundColor: '#F6F8FC',
                borderColor: '#8C8D8E',
                borderWidth: 1,
                borderRadius: 4,
                rich: {
                    b: {
                        lineHeight: 24,
                        color: '#4C5058'
                    }
                }
            },data: classreport[pageId.value][2].data}
        ]};
        charts_three.setOption(option);
    }

    const setEchartsFour = async () => {
        const option = {
            tooltip: {
                trigger: 'item'
            },
            series: [{
                type: 'pie',
                radius: ['0','65%'],
                itemStyle: {
                    borderWidth: 2,
                    borderRadius: 10,
                    borderColor: '#ffffff'
                },
                label: {
                    show: true,
                    color: 'rgba(255, 255, 255)'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left'
                },
                data: classreport[pageId.value][3].data,
            }]
        };
        charts_four.setOption(option);
    }

    const setEchartsFive = async () => {
        const option = {
            tooltip: {
                trigger: 'item'
            },
            series: [{
                type: 'pie',
                radius: ['0','65%'],
                itemStyle: {
                    borderWidth: 2,
                    borderRadius: 10,
                    borderColor: '#ffffff'
                },
                label: {
                    show: true,
                    color: 'rgba(255, 255, 255)'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left'
                },
                data: classreport[pageId.value][4].data,
            }]
        };
        charts_five.setOption(option);
    }

    const setEchartsSix = async () => {
        const option = {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                top: '3%',
                textStyle: {
                    color: 'rgba(255, 255, 255)'
                },
            },
            grid: {
                left: '8%',
                right: '4%',
                bottom: '13%',
            },
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                axisLabel: {
                    color: 'rgba(255, 255, 255)'
                },
                data: classreport[pageId.value][5].xAxis.data,
            }],
            yAxis: [{type: 'value'}],
            series: [{
                name: classreport[pageId.value][5].series[0].name,
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                  focus: 'series'
                },
                label: {
                    show: true,
                    position: 'top',
                    color: 'rgba(255, 255, 255)'
                },
                data: classreport[pageId.value][5].series[0].data
            },{
                name: classreport[pageId.value][5].series[1].name,
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                  focus: 'series'
                },
                label: {
                    show: true,
                    position: 'top',
                    color: 'rgba(255, 255, 255)'
                },
                data: classreport[pageId.value][5].series[1].data
            },{
                name: classreport[pageId.value][5].series[2].name,
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                label: {
                    show: true,
                    position: 'top',
                    color: 'rgba(255, 255, 255)'
                },
                data: classreport[pageId.value][5].series[2].data
            },]
        };
        charts_six.setOption(option);
    }
</script>

<template>
    <div style="width: 100vw;height: 100vh;" v-loading.fullscreen.lock="UIStore.siteErrors" element-loading-text="系统异常（请检查数据源）" :element-loading-svg="icons.loading" element-loading-svg-view-box="-10, -10, 50, 50" >
        <header>
            <h1>AI课堂数据统计报告（&nbsp;{{ task.find(item => item.id == Number(route.params.id)).name }}）
            </h1>
        </header>
    
        <section class="main">
            <div class="column">
                <div class="panel pie">
                    <h2>问题类型</h2>
                    <div class="canvas canvas-one"></div>
                    <div class="panel-footer"></div>
                </div>
                <div class="panel piel">
                    <h2>学生参与度统计</h2>
                    <div class="canvas canvas-five"></div>
                    <div class="panel-footer"></div>
                </div>
            </div>
    
            <div class="column">
                <div class="flex">
                    <div class="panelx">
                        <h2>学生应答</h2>
                        <div class="canvas canvas-two"></div>
                    </div>
    
                    <div class="panelx">
                        <h2>教师理答</h2>
                        <div class="canvas canvas-three"></div>
                    </div>
                </div>
                <div class="panel piel">
                    <h2>课堂参与度/凝聚度/专注度变化</h2>
                    <div class="canvas canvas-six"></div>
                    <div class="panel-footer"></div>
                </div>
            </div>
    
            <div class="column">
                <div class="panel pie">
                    <h2>课堂行为统计</h2>
                    <div class="canvas canvas-four"></div>
                    <div class="panel-footer"></div>
                </div>
                <div class="panel piel">
                    <h2>AI数据报告分析</h2>
                    <p class="post-text">{{ classreport[pageId][6][0].report }}</p>
                    <div class="panel-footer"></div>
                </div>
            </div>
        </section>
    </div>
</template>