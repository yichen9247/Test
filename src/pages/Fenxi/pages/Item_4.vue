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
                name: 'Access From',
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
                data: [
                    { value: 16, name: '良好率' },
                    { value: 83, name: '优秀率' },
                    { value: 32, name: '及格率' },
                ]
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
                name: 'Access From',
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
                data: [
                    { value: 16, name: '命令运用' },
                    { value: 83, name: '创建低模' },
                    { value: 32, name: '熟悉软件' },
                ],
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
                name: 'Access From',
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
                data: [
                    { value: 16, name: '良好率' },
                    { value: 83, name: '优秀率' },
                    { value: 32, name: '及格率' },
                ]
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
                name: 'Access From',
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
                data: [
                    { value: 16, name: '抖音' },
                    { value: 18, name: '快手' },
                    { value: 30, name: '微博' },
                    { value: 28, name: '微信' },
                    { value: 20, name: '知乎' },
                    { value: 22, name: '闲鱼' },

                ],
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
        const rawData = [
            [100, 302, 301, 334, 390, 330, 320, 390, 330, 320],
            [320, 132, 101, 134, 90, 230, 210, 90, 230, 210],
            [220, 182, 191, 234, 290, 330, 310, 290, 330, 310],
            [150, 212, 201, 154, 190, 330, 410,190, 330, 410],
        ];
        const totalData = [];
        for (let i = 0; i < rawData[0].length; ++i) {
            let sum = 0;
            for (let j = 0; j < rawData.length; ++j) {
                sum += rawData[j][i];
            }
            totalData.push(sum);
        }
        const series = ['会简单布光','分辨不清光','理解不到位','能制作动效'].map((name, sid) => {
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
                data: ['第一组', '第二组', '第三组', '第四组', '第五组', '第六组', '第七组', '第八组', '第九组', '第十组']
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