<script setup>
    import * as echarts from 'echarts'
    import icons from "@/scripts/icons"
    import random from '@/scripts/random'
    import { onBeforeUnmount, onMounted } from "vue"

    let charts_one, charts_two, charts_three, charts_four, charts_five, charts_six;

    const chartElements = async () => {
        charts_one = echarts.init(document.querySelector(".box-chart-one"));
        charts_two = echarts.init(document.querySelector(".box-chart-two"));
        charts_three = echarts.init(document.querySelector(".box-chart-three"));
        charts_four = echarts.init(document.querySelector(".box-chart-four"));
        charts_five = echarts.init(document.querySelector(".box-chart-five"));
        charts_six = echarts.init(document.querySelector(".box-chart-six"));
    }

    onMounted(async () => {
        await chartElements();
        await setEchartsOne();
        await setEchartsTwo();
        await setEchartsThree();
        await setEchartsFour();
        await setEchartsFive();
        await setEchartsSix();
        
    });

    onBeforeUnmount(async () => {
        await charts_one.dispose();
        await charts_two.dispose();
        await charts_three.dispose();
        await charts_four.dispose();
        await charts_five.dispose();
        await charts_six.dispose();
    });

    const setEchartsOne = async () => {
        const option = {
            tooltip: {
                trigger: 'item',
            },
            series: [{
                name: 'Access From',
                type: 'gauge',
                detail: {
                    valueAnimation: true,
                },
                data: [{
                    value: random.getRandomIntInclusive(),
                    name: 'SCORE'
                }]
            }]
        }
        charts_one.setOption(option);
    }

    const setEchartsTwo = async () => {
        const option = {
            tooltip: {
                trigger: 'item',
            },
            
            series: [{
                name: 'Access From',
                type: 'gauge',
                progress: {
                    show: true
                },
                detail: {
                    valueAnimation: true,
                },
                data: [{
                    value: random.getRandomIntInclusive(),
                    name: 'SCORE',
                }]
            }]
        }
        charts_two.setOption(option);
    }

    const setEchartsThree = async () => {
        const option = {
            tooltip: {
                trigger: 'item',
            },
            series: [{
                name: 'Access From',
                type: 'gauge',
                detail: {
                    valueAnimation: true,
                },
                data: [{
                    value: random.getRandomIntInclusive(),
                    name: 'SCORE'
                }]
            }]
        }
        charts_three.setOption(option);
    }

    const setEchartsFour = async () => {
        const option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'none'
                },
                formatter: function (params) {
                    return params[0].name + ': ' + params[0].value;
                }
            },
            grid: {
                left: '8%',
                right: '1%',
                bottom: '0',
                containLabel: true
            },
            xAxis: {
                data: ['驯鹿', '火箭', '飞机', '高铁', '轮船', '汽车', '跑步', '步行'],
                axisTick: { show: false },
                axisLine: { show: false },
                axisLabel: {
                    color: '#e54035'
                }
            },
            yAxis: {
                splitLine: { show: false },
                axisTick: { show: false },
                axisLine: { show: false },
                axisLabel: { show: false }
            },
            color: ['#e54035'],
            series: [{
                name: 'hill',
                type: 'pictorialBar',
                barCategoryGap: '-130%',
                symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
                itemStyle: {
                    opacity: 0.5
                },
                emphasis: {
                    itemStyle: {
                        opacity: 1
                    }
                },
                data: [123, 60, 25, 18, 12, 9, 2, 1],
                z: 10
            },{
                name: 'glyph',
                type: 'pictorialBar',
                barGap: '-100%',
                symbolPosition: 'end',
                symbolSize: 50,
                symbolOffset: [0, '-120%'],
                data: [{
                    value: 123,
                    symbol: icons.reindeer,
                    symbolSize: [60, 60]
                },{
                    value: 60,
                    symbol: icons.rocket,
                    symbolSize: [50, 60]
                },{
                    value: 25,
                    symbol: icons.plane,
                    symbolSize: [65, 35]
                },{
                    value: 18,
                    symbol: icons.train,
                    symbolSize: [50, 30]
                },{
                    value: 12,
                    symbol: icons.ship,
                    symbolSize: [50, 35]
                },{
                    value: 9,
                    symbol: icons.car,
                    symbolSize: [40, 30]
                },{
                    value: 2,
                    symbol: icons.run,
                    symbolSize: [40, 50]
                },{
                    value: 1,
                    symbol: icons.walk,
                    symbolSize: [40, 50]
                }]
            }]
        }
        charts_four.setOption(option)
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
                data: ['制作流程','操作规范','模型结构','模型比例']
            },
            xAxis: {
                type: 'category',
                data: ['第一组', '第二组', '第三组', '第四组', '第五组']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '制作流程',
                    type: 'line',
                    data: [random.getRandomIntInclusive(), random.getRandomIntInclusive(), random.getRandomIntInclusive(), random.getRandomIntInclusive(), random.getRandomIntInclusive()]
                },
                {
                    name: '操作规范',
                    type: 'line',
                    data: [random.getRandomIntInclusive(), random.getRandomIntInclusive(), random.getRandomIntInclusive(), random.getRandomIntInclusive(), random.getRandomIntInclusive()]
                },
                {
                    name: '模型结构',
                    type: 'line',
                    data: [random.getRandomIntInclusive(), random.getRandomIntInclusive(), random.getRandomIntInclusive(), random.getRandomIntInclusive(), random.getRandomIntInclusive()]
                },
                {
                    name: '模型比例',
                    type: 'line',
                    data: [random.getRandomIntInclusive(), random.getRandomIntInclusive(), random.getRandomIntInclusive(), random.getRandomIntInclusive(), random.getRandomIntInclusive()]
                },
            ]
        }
        charts_five.setOption(option);
    }

    const setEchartsSix = async () => {
        const option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
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
                data: ['会简单布光','分辨不清光','理解不到位','能制作动效']
            },
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01]
            },
            yAxis: {
                type: 'category',
                data: ['第五组', '第四组', '第三组', '第二组', '第一组']
            },
            series: [{
                name: '会简单布光',
                type: 'bar',
                data: [random.getRandomIntInclusive(), random.getRandomIntInclusive(), random.getRandomIntInclusive(), random.getRandomIntInclusive(), random.getRandomIntInclusive()]
            },{
                name: '分辨不清光',
                type: 'bar',
                data: [random.getRandomIntInclusive(), random.getRandomIntInclusive(), random.getRandomIntInclusive(), random.getRandomIntInclusive(), random.getRandomIntInclusive()]
            },{
                name: '理解不到位',
                type: 'bar',
                data: [random.getRandomIntInclusive(), random.getRandomIntInclusive(), random.getRandomIntInclusive(), random.getRandomIntInclusive(), random.getRandomIntInclusive()]
            },{
                name: '能制作动效',
                type: 'bar',
                data: [random.getRandomIntInclusive(), random.getRandomIntInclusive(), random.getRandomIntInclusive(), random.getRandomIntInclusive(), random.getRandomIntInclusive()]
            }]
        }
        charts_six.setOption(option);
    }
</script>

<template>
    <div class="fenxi-container">
        <div class="fenxi-box box-top">
            <div class="box-box box-l">
                <p class="title">知识与技能基础</p>
                <div class="charts">
                    <div class="charts-box box-chart-one" style="margin-top: 20px;"></div>
                    <div class="charts-box box-chart-two" style="margin-top: 20px;"></div>
                    <div class="charts-box box-chart-three" style="margin-top: 20px;"></div>
                </div>
            </div>
            <div class="box-box box-r">
                <p class="title">学习特点</p>
                <div class="charts">
                    <div class="charts-box box-chart-four"></div>
                </div>
            </div>
        </div>

        <div class="fenxi-box box-bottom">
            <div class="box-box box-b">
                <p class="title">认知与实践能力</p>
                <div class="charts">
                    <div class="box-b-b box-b-b-l">
                        <div class="charts-box box-chart-five"></div>
                    </div>

                    <div class="box-b-b box-b-b-r">
                        <div class="charts-box box-chart-six"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>