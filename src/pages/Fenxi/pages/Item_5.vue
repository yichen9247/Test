<script setup>
    import * as echarts from 'echarts'
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
            grid: {
                left: '6%',
                right: '4%',
                bottom: '12%',
                containLabel: true
            },
            legend: {
                left: 'center',
                bottom: '0%',
                data: ['装备模块','骨骼创建']
            },
            xAxis: {
                type: 'category',
                axisTick: {
                    alignWithLabel: true
                },
                data: ['项目一', '项目二', '项目三', '项目四', '项目五']
            },
            yAxis: {
                type: 'value'
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
                name: '装备模块',
                data: [random.getRandomIntInclusive(), random.getRandomIntInclusive(), random.getRandomIntInclusive(), random.getRandomIntInclusive(), random.getRandomIntInclusive()]
            }, {
                type: 'bar',
                name: '骨骼创建',
                data: [random.getRandomIntInclusive(), random.getRandomIntInclusive(), random.getRandomIntInclusive(), random.getRandomIntInclusive(), random.getRandomIntInclusive()]
            }]
        }
        charts_one.setOption(option);
    }

    const setEchartsTwo = async () => {
        const option = {

        }
        charts_two.setOption(option);
    }

    const setEchartsThree = async () => {
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
                data: ['使用控制器','调整角色权重']
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
                    name: '使用控制器',
                    type: 'line',
                    data: [random.getRandomIntInclusive(), random.getRandomIntInclusive(), random.getRandomIntInclusive(), random.getRandomIntInclusive(), random.getRandomIntInclusive()]
                },
                {
                    name: '调整角色权重',
                    type: 'line',
                    data: [random.getRandomIntInclusive(), random.getRandomIntInclusive(), random.getRandomIntInclusive(), random.getRandomIntInclusive(), random.getRandomIntInclusive()]
                },
            ]
        }
        charts_three.setOption(option);
    }

    const setEchartsFour = async () => {
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
                name: 'Access From',
                type: 'pie',
                radius: ['0','65%'],
                center: ['50%', '50%'],
                data: [
                    { value: 335, name: '微信' },
                    { value: 310, name: '微博' },
                    { value: 274, name: '钉钉' },
                    { value: 235, name: '知乎' },
                    { value: 400, name: '淘宝' }
                ].sort(function (a, b) {
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
                bottom: '0',
                containLabel: true
            },
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                data: ['第一组', '第二组', '第三组', '第四组', '第五组']
            }],
            yAxis: [{
                type: 'value'
            }],
            series: [{
                name: '完成湖面建模',
                type: 'line',
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
                data: [random.getRandomIntInclusive(), random.getRandomIntInclusive(), random.getRandomIntInclusive(), random.getRandomIntInclusive(), random.getRandomIntInclusive()]
            },{
                name: '完成图片收集',
                type: 'line',
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
                data: [random.getRandomIntInclusive(), random.getRandomIntInclusive(), random.getRandomIntInclusive(), random.getRandomIntInclusive(), random.getRandomIntInclusive()]
            }]
        }
        charts_five.setOption(option);
    }

    const setEchartsSix = async () => {
        const option = {
            grid: {
                left: '6%',
                right: '4%',
                bottom: '0%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                axisTick: {
                    alignWithLabel: true
                },
                data: ['项目一', '项目二', '项目三', '项目四', '项目五', '项目六', '项目七', '项目八', '项目九', '项目十']
            },
            yAxis: {
                type: 'value'
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
                name: 'Access From',
                data: [random.getRandomIntInclusive(), random.getRandomIntInclusive(), random.getRandomIntInclusive(), random.getRandomIntInclusive(), random.getRandomIntInclusive(), random.getRandomIntInclusive(), random.getRandomIntInclusive(), random.getRandomIntInclusive(), random.getRandomIntInclusive(), random.getRandomIntInclusive()]
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
                    <div class="charts-box box-chart-one" style="width: 50%;"></div>
                    <div class="charts-box box-chart-two" style="display: none;"></div>
                    <div class="charts-box box-chart-three" style="width: 50%;"</div>
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