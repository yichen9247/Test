<script setup>
    import * as echarts from 'echarts'
    import random from '@/scripts/random'
    import data from "@/scripts/data.js"
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
                trigger: 'item'
            },
            legend: {
                left: 'center',
                bottom: '0%',
            },
            series: [{
                type: 'pie',
                radius: ['40%', '65%'],
                itemStyle: {
                    borderWidth: 2,
                    borderRadius: 10,
                    borderColor: '#ffffff',
                },
                label: {
                    show: true,
                    color: 'rgba(255, 255, 255)'
                },
                data: data[2][0].data
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
                data: data[2][1].data,
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
            },
            visualMap: {
                show: false,
                min: 80,
                max: 600,
                inRange: {
                    colorLightness: [0, 1]
                }
            },
            series: [{
                type: 'pie',
                radius: ['0','65%'],
                center: ['50%', '50%'],
                data: data[2][2].data.sort(function (a, b) {
                    return a.value - b.value;
                }),
                roseType: 'radius',
                label: {
                    color: 'rgba(255, 255, 255)'
                },
                labelLine: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.3)'
                    },
                    smooth: 0.2,
                    length: 10,
                    length2: 20
                },
                itemStyle: {
                    color: '#c23531',
                    shadowBlur: 200,
                    shadowColor: 'rgba(0, 0, 0, 0)'
                },
                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function (idx) {
                    return Math.random() * 200;
                }
            }]
        }
        charts_three.setOption(option);
    }

    const setEchartsFour = async () => {
        const option = {
            tooltip: {
                trigger: 'item',
            },
            legend: {
                left: 'center',
                bottom: '0%',
                data: data[2][3].legend
            },
            series: [{
                type: 'funnel',
                left: '10%',
                top: 60,
                bottom: 60,
                width: '80%',
                min: 0,
                max: 100,
                minSize: '0%',
                maxSize: '100%',
                sort: 'ascending',
                gap: 2,
                labelLine: {
                    length: 10,
                    lineStyle: {
                        width: 1,
                        type: 'solid'
                    }
                },
                itemStyle: {
                    borderColor: '#fff',
                    borderWidth: 1
                },
                emphasis: {
                    label: {
                        fontSize: 20
                    }
                },
                data:data[2][3].data
            }]
        }
        charts_four.setOption(option)
    }


    const setEchartsFive = async () => {
        const option = {
            color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross'
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
                data: data[2][4].legend
            },
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                data: data[2][3].label
            }],
            yAxis: [{
                type: 'value'
            }],
            series: [{
                name: data[2][4].data[0].name,
                type: data[2][4].data[0].type,
                stack: 'Total',
                smooth: true,
                lineStyle: {
                    width: 0
                },
                showSymbol: false,
                areaStyle: {
                    opacity: 0.8,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgb(128, 255, 165)'
                    },{
                        offset: 1,
                        color: 'rgb(1, 191, 236)'
                    }])
                },
                emphasis: {
                    focus: 'series'
                },
                data: data[2][4].data[0].value,
            },{
                name: data[2][4].data[1].name,
                type: data[2][4].data[1].type,
                stack: 'Total',
                smooth: true,
                lineStyle: {
                    width: 0
                },
                showSymbol: false,
                areaStyle: {
                    opacity: 0.8,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgb(0, 221, 255)'
                    },{
                        offset: 1,
                        color: 'rgb(77, 119, 255)'
                    }])
                },
                emphasis: {
                    focus: 'series'
                },
                data: data[2][4].data[0].value,
            }]
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
                data: data[2][5].lengend,
            },
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01]
            },
            yAxis: {
                type: 'category',
                data: data[2][5].label,
            },
            series: data[2][5].series,
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
                    <div class="charts-box box-chart-one"></div>
                    <div class="charts-box box-chart-two"></div>
                    <div class="charts-box box-chart-three"></div>
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