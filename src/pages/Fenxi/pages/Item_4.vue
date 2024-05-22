<script setup>
    import * as echarts from 'echarts'
    import icons from "@/scripts/icons"
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

    const setEchartsOne = async () =>  {
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
                    borderColor: '#ffffff'
                },
                label: {
                    show: true,
                    color: 'rgba(255, 255, 255)'
                },
                data: data[3][0].data
            }]
        };
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
                data: data[3][1].data,
            }]
        };
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
            series: [{
                type: 'pie',
                radius: ['40%', '65%'],
                avoidLabelOverlap: false,
                padAngle: 5,
                itemStyle: {
                    borderRadius: 10
                },
                label: {
                    show: true,
                    color: 'rgba(255, 255, 255)'
                },
                labelLine: {
                    show: true
                },
                itemStyle: {
                    borderWidth: 2,
                    borderRadius: 10,
                    borderColor: '#ffffff'
                },
                data: data[3][2].data
            }]
        }
        charts_three.setOption(option);
    }

    const setEchartsFour = async () => {
        const piePatternImg = new Image();
        piePatternImg.src = icons.piePatternSrc;
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
                selectedMode: 'single',
                radius: ['0','65%'],
                selectedOffset: 30,
                clockwise: true,
                label: {
                    fontSize: 18,
                    color: '#235894'
                },
                labelLine: {
                    lineStyle: {
                        color: '#235894'
                    }
                },
                data: data[3][3].data,
                itemStyle: {
                    opacity: 0.7,
                    color: {
                        repeat: 'repeat',
                        image: piePatternImg
                    },
                    borderWidth: 3,
                    borderColor: '#235894'
                }
            }]
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
                data: data[3][4].legend
            },
            xAxis: {
                type: 'category',
                data: data[3][4].label
            },
            yAxis: {
                type: 'value'
            },
            series: data[3][4].series
        }
        charts_five.setOption(option);
    }

    const setEchartsSix = async () => {
        const totalData = [];
        for (let i = 0; i < data[3][5].data[0].length; ++i) {
            let sum = 0;
            for (let j = 0; j < data[3][5].data.length; ++j) {
                sum += data[3][5].data[j][i];
            }
            totalData.push(sum);
        }
        const series = data[3][5].legend.map((name, sid) => {
            return {
                name,
                type: 'bar',
                stack: 'total',
                barWidth: '60%',
                label: {
                    show: true,
                    formatter: (params) => Math.round(params.value * 1000) / 10 + '%'
                },
                data: data[3][5].data[sid].map((d, did) =>
                    totalData[did] <= 0 ? 0 : d / totalData[did]
                )
            };
        });

        const option = {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                left: 'center',
                bottom: '0%',
            },
            grid: {
                left: '6%',
                right: '4%',
                bottom: '12%',
                containLabel: true
            },
            yAxis: {
                type: 'value'
            },
            xAxis: {
                type: 'category',
                data: data[3][5].label
            },
            series
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