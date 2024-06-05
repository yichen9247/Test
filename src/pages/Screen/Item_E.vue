
<script setup>
    import * as echarts from 'echarts'
    import icons from "@/scripts/icons.js"
    import { useUIStore } from '@/stores/UIStore.js'
    import databaseOption from "@/scripts/database.js"
    import { onBeforeUnmount, onMounted, ref } from "vue"
    import { useScreentore } from "@/stores/ScreenStore.js"
    import { SettingOutlined } from '@ant-design/icons-vue';

    let studentListVarious;
    defineProps({ id: Object });
    const ScreenStore = useScreentore();
    let database = databaseOption.screenDatabase;
    let charts_one,charts_two,charts_three,charts_four,charts_five,charts_six;
    let studentDatabase = databaseOption.studentDatabase;
    database.version(1).stores(databaseOption.screenTrees);
    studentDatabase.version(1).stores(databaseOption.studentTrees);

    const UIStore = useUIStore();
    const chartElements = async () => {
        charts_one = echarts.init(document.querySelector(".canvas-one"));
        charts_two = echarts.init(document.querySelector(".canvas-two"));
        charts_three = echarts.init(document.querySelector(".canvas-three"));
        charts_four = echarts.init(document.querySelector(".canvas-four"));
        charts_five = echarts.init(document.querySelector(".canvas-five"));
        charts_six = echarts.init(document.querySelector(".canvas-six"));
    }

    const AttendanceHeadRef = ref(null);
    const AttendanceDataRef = ref(null);

    const queryScreenData = async () => {
        let AttendanceHead = await database.AttendanceHead.toArray();
        AttendanceHeadRef.value = AttendanceHead[0].data;
        let AttendanceData = await database.AttendanceData.toArray();
        AttendanceDataRef.value = AttendanceData[0].data;

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
        await setEchartsOne([0,0,0,0,0,0]);
        await setEchartsThree([0,0,0,0,0,0]);
        await setEchartsFour([0,0,0,0,0,0]);
        await setEchartsFive([0,0,0,0,0,0]);
        await setEchartsSix([0,0,0,0,0,0]);
        await setEchartsTwo([0,0,0,0,0,0]);
    }

    const setEchartsOne = async (data) => {
        let option = {
            tooltip: {
                trigger: 'item'
            },
            grid: {
                left: '8%',
                right: '4%',
                bottom: '10%',
            },
            xAxis: {
                type: 'category',
                axisLabel: {
                    color: 'rgba(255, 255, 255)'
                },
                data: ['第一组', '第二组', '第三组', '第四组', '第五组', '第六组']
            },
            yAxis: {
                max: 5,
                type: 'value',
                axisLabel: {
                    color: 'rgba(255, 255, 255)'
                },
            },
            series: [{
                data: data,
                type: 'bar'
            }]
        };
        charts_one.setOption(option);
    }

    const setEchartsTwo = async (data) => {
        let option = {
            tooltip: {
                trigger: 'item'
            },
            grid: {
                left: '8%',
                right: '4%',
                bottom: '10%',
            },
            xAxis: {
                type: 'category',
                axisLabel: {
                    color: 'rgba(255, 255, 255)'
                },
                data: ['第一组', '第二组', '第三组', '第四组', '第五组', '第六组']
            },
            yAxis: {
                max: 20,
                type: 'value',
                axisLabel: {
                    color: 'rgba(255, 255, 255)'
                },
            },
            series: [{
                data: data,
                type: 'bar'
            }]
        };
        charts_two.setOption(option);
    }

    const setEchartsThree = async (data) => {
        let option = {
            tooltip: {
                trigger: 'item'
            },
            grid: {
                left: '8%',
                right: '4%',
                bottom: '10%',
            },
            xAxis: {
                type: 'category',
                axisLabel: {
                    color: 'rgba(255, 255, 255)'
                },
                data: ['第一组', '第二组', '第三组', '第四组', '第五组', '第六组']
            },
            yAxis: {
                max: 35,
                type: 'value',
                axisLabel: {
                    color: 'rgba(255, 255, 255)'
                },
            },
            series: [{
                data: data,
                type: 'bar'
            }]
        };
        charts_three.setOption(option);
    }

    const setEchartsFour = async (data) => {
        let option = {
            tooltip: {
                trigger: 'item'
            },
            grid: {
                left: '8%',
                right: '4%',
                bottom: '10%',
            },
            xAxis: {
                type: 'category',
                axisLabel: {
                    color: 'rgba(255, 255, 255)'
                },
                data: ['第一组', '第二组', '第三组', '第四组', '第五组', '第六组']
            },
            yAxis: {
                max: 20,
                type: 'value',
                axisLabel: {
                    color: 'rgba(255, 255, 255)'
                },
            },
            series: [{
                data: data,
                type: 'bar'
            }]
        };
        charts_four.setOption(option);
    }

    const setEchartsFive = async (data) => {
        let option = {
            tooltip: {
                trigger: 'item'
            },
            grid: {
                left: '8%',
                right: '4%',
                bottom: '10%',
            },
            xAxis: {
                type: 'category',
                axisLabel: {
                    color: 'rgba(255, 255, 255)'
                },
                data: ['第一组', '第二组', '第三组', '第四组', '第五组', '第六组']
            },
            yAxis: {
                max: 20,
                type: 'value',
                axisLabel: {
                    color: 'rgba(255, 255, 255)'
                },
            },
            series: [{
                data: data,
                type: 'bar'
            }]
        };
        charts_five.setOption(option);
    }

    const setEchartsSix = async (data) => {
        let option = {
            tooltip: {
                trigger: 'item'
            },
            grid: {
                left: '8%',
                right: '4%',
                bottom: '10%',
            },
            xAxis: {
                type: 'category',
                axisLabel: {
                    color: 'rgba(255, 255, 255)'
                },
                data: ['第一组', '第二组', '第三组', '第四组', '第五组', '第六组']
            },
            yAxis: {
                max: 100,
                type: 'value',
                axisLabel: {
                    color: 'rgba(255, 255, 255)'
                },
            },
            series: [{
                data: data,
                type: 'bar'
            }]
        };
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

        let studentListVarious = [];

        for (let i=0;i<6;i++) {
            studentListVarious.push({
                name: '刘强东'
            });
        }
        studentList.value = studentListVarious;
    });

    const saveOneData = async (id) => {
        settingDialog.value = false;
        setTimeout(() => {
            if (id == 1) {
                let dom1 = document.querySelectorAll(".one-one-input");
                let dom2 = document.querySelectorAll(".one-two-input");
                let dom3 = document.querySelectorAll(".one-three-input");
                let dom4 = document.querySelectorAll(".one-four-input");
                let dom5 = document.querySelectorAll(".one-five-input");
                let dom6 = document.querySelectorAll(".one-six-input");
                let data = [],max1 = 0,max2 = 0,max3 = 0,max4 = 0,max5 = 0,max6 = 0;

                for (let i=0;i<dom1.length;i++) {
                    max1 += Number(dom1[i].value);
                }
                for (let i=0;i<dom2.length;i++) {
                    max2 += Number(dom2[i].value);
                }
                for (let i=0;i<dom3.length;i++) {
                    max3 += Number(dom3[i].value);
                }
                for (let i=0;i<dom4.length;i++) {
                    max4 += Number(dom4[i].value);
                }
                for (let i=0;i<dom5.length;i++) {
                    max5 += Number(dom5[i].value);
                }
                for (let i=0;i<dom6.length;i++) {
                    max6 += Number(dom6[i].value);
                }

                data.push(max1);
                data.push(max2);
                data.push(max3);
                data.push(max4);
                data.push(max5);
                data.push(max6);
                setEchartsOne(data);
            }

            if (id == 2) {
                let dom1 = document.querySelectorAll(".two-one-input");
                let dom2 = document.querySelectorAll(".two-two-input");
                let dom3 = document.querySelectorAll(".two-three-input");
                let dom4 = document.querySelectorAll(".two-four-input");
                let dom5 = document.querySelectorAll(".two-five-input");
                let dom6 = document.querySelectorAll(".two-six-input");
                let data = [], max1 = [],max2 = [],max3 = [],max4 = [],max5 = [],max6 = [];

                for (let i=0;i<dom1.length;i++) {
                    max1.push(dom1[i].value);
                }
                for (let i=0;i<dom2.length;i++) {
                    max2.push(dom2[i].value);
                }
                for (let i=0;i<dom3.length;i++) {
                    max3.push(dom3[i].value);
                }
                for (let i=0;i<dom4.length;i++) {
                    max4.push(dom4[i].value);
                }
                for (let i=0;i<dom5.length;i++) {
                    max5.push(dom5[i].value);
                }
                for (let i=0;i<dom6.length;i++) {
                    max6.push(dom6[i].value);
                }

                data.push(max1);
                data.push(max2);
                data.push(max3);
                data.push(max4);
                data.push(max5);
                data.push(max6);
                setEchartsTwo(data);
            }

            if (id == 3) {
                let dom1 = document.querySelectorAll(".three-one-input");
                let dom2 = document.querySelectorAll(".three-two-input");
                let dom3 = document.querySelectorAll(".three-three-input");
                let dom4 = document.querySelectorAll(".three-four-input");
                let dom5 = document.querySelectorAll(".three-five-input");
                let dom6 = document.querySelectorAll(".three-six-input");
                let data = [],max1 = 0,max2 = 0,max3 = 0,max4 = 0,max5 = 0,max6 = 0;

                for (let i=0;i<dom1.length;i++) {
                    max1 += Number(dom1[i].value);
                }
                for (let i=0;i<dom2.length;i++) {
                    max2 += Number(dom2[i].value);
                }
                for (let i=0;i<dom3.length;i++) {
                    max3 += Number(dom3[i].value);
                }
                for (let i=0;i<dom4.length;i++) {
                    max4 += Number(dom4[i].value);
                }
                for (let i=0;i<dom5.length;i++) {
                    max5 += Number(dom5[i].value);
                }
                for (let i=0;i<dom6.length;i++) {
                    max6 += Number(dom6[i].value);
                }

                data.push(max1);
                data.push(max2);
                data.push(max3);
                data.push(max4);
                data.push(max5);
                data.push(max6);
                setEchartsThree(data);
            }

            if (id == 4) {
                let dom1 = document.querySelectorAll(".four-one-input");
                let dom2 = document.querySelectorAll(".four-two-input");
                let dom3 = document.querySelectorAll(".four-three-input");
                let dom4 = document.querySelectorAll(".four-four-input");
                let dom5 = document.querySelectorAll(".four-five-input");
                let dom6 = document.querySelectorAll(".four-six-input");
                let data = [],max1 = 0,max2 = 0,max3 = 0,max4 = 0,max5 = 0,max6 = 0;

                for (let i=0;i<dom1.length;i++) {
                    max1 += Number(dom1[i].value);
                }
                for (let i=0;i<dom2.length;i++) {
                    max2 += Number(dom2[i].value);
                }
                for (let i=0;i<dom3.length;i++) {
                    max3 += Number(dom3[i].value);
                }
                for (let i=0;i<dom4.length;i++) {
                    max4 += Number(dom4[i].value);
                }
                for (let i=0;i<dom5.length;i++) {
                    max5 += Number(dom5[i].value);
                }
                for (let i=0;i<dom6.length;i++) {
                    max6 += Number(dom6[i].value);
                }

                data.push(max1);
                data.push(max2);
                data.push(max3);
                data.push(max4);
                data.push(max5);
                data.push(max6);
                setEchartsFour(data);
            }

            if (id == 5) {
                let dom1 = document.querySelectorAll(".five-one-input");
                let dom2 = document.querySelectorAll(".five-two-input");
                let dom3 = document.querySelectorAll(".five-three-input");
                let dom4 = document.querySelectorAll(".five-four-input");
                let dom5 = document.querySelectorAll(".five-five-input");
                let dom6 = document.querySelectorAll(".five-six-input");
                let data = [],max1 = 0,max2 = 0,max3 = 0,max4 = 0,max5 = 0,max6 = 0;

                for (let i=0;i<dom1.length;i++) {
                    max1 += Number(dom1[i].value);
                }
                for (let i=0;i<dom2.length;i++) {
                    max2 += Number(dom2[i].value);
                }
                for (let i=0;i<dom3.length;i++) {
                    max3 += Number(dom3[i].value);
                }
                for (let i=0;i<dom4.length;i++) {
                    max4 += Number(dom4[i].value);
                }
                for (let i=0;i<dom5.length;i++) {
                    max5 += Number(dom5[i].value);
                }
                for (let i=0;i<dom6.length;i++) {
                    max6 += Number(dom6[i].value);
                }
                
                data.push(max1);
                data.push(max2);
                data.push(max3);
                data.push(max4);
                data.push(max5);
                data.push(max6);
                setEchartsFive(data);
            }

            if (id == 6) {
                let data1 = document.querySelector(".six-input-one").value;
                let data2 = document.querySelector(".six-input-two").value;

                startStudent.value = [
                    { zu: '技能之星', mz: data1 },
                    { zu: '安全之星', mz: data2 },
                ]
            }
        }, 1500);
        ElMessage({type: 'success',message: '保存更改成功！'});
    }

    const startStudent = ref([
        { zu: '技能之星', mz: '任思旭' },
        { zu: '安全之星', mz: '苏思元' },
    ]);

    const current = ref('one');
    const settingDialog = ref(false);
    const studentList = ref([{name: null}]);
    const backHome = async (id) => location.href = `../`;
</script>

<template>

    <a-modal v-model:open="settingDialog" width="1260px" :title="null" :closable="false" :footer="false">
        <el-tabs v-model="current" class="demo-tabs">
            <el-tab-pane label="作业前准备" name="one">
                <div class="panel-content" >
                    <el-table :data="[0]" style="width: 100%">
                        <el-table-column label="第一组">
                            <template #default="scope">
                                <input class="one-one-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column label="第二组">
                            <template #default="scope">
                                <input class="one-two-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column label="第三组">
                            <template #default="scope">
                                <input class="one-three-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column label="第四组">
                            <template #default="scope">
                                <input class="one-four-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column label="第五组">
                            <template #default="scope">
                                <input class="one-five-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column label="第六组">
                            <template #default="scope">
                                <input class="one-six-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-button type="primary" class="save-data" @click="saveOneData(1)">保存更改</el-button>
                </div>
            </el-tab-pane>
            
            <el-tab-pane label="部件拆卸" name="two">
                <div class="panel-content" >
                    <el-table :data="[0]" style="width: 100%">
                        <el-table-column label="第一组">
                            <template #default="scope">
                                <input class="two-one-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column label="第二组">
                            <template #default="scope">
                                <input class="two-two-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column label="第三组">
                            <template #default="scope">
                                <input class="two-three-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column label="第四组">
                            <template #default="scope">
                                <input class="two-four-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column label="第五组">
                            <template #default="scope">
                                <input class="two-five-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column label="第六组">
                            <template #default="scope">
                                <input class="two-six-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-button type="primary" class="save-data" @click="saveOneData(2)">保存更改</el-button>
                </div>
            </el-tab-pane>

            <el-tab-pane label="故障检测" name="three">
                <div class="panel-content" >
                    <el-table :data="[0]" style="width: 100%">
                        <el-table-column label="第一组">
                            <template #default="scope">
                                <input class="three-one-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column label="第二组">
                            <template #default="scope">
                                <input class="three-two-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column label="第三组">
                            <template #default="scope">
                                <input class="three-three-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column label="第四组">
                            <template #default="scope">
                                <input class="three-four-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column label="第五组">
                            <template #default="scope">
                                <input class="four-five-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column label="第六组">
                            <template #default="scope">
                                <input class="five-six-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-button type="primary" class="save-data" @click="saveOneData(3)">保存更改</el-button>
                </div>
            </el-tab-pane>

            <el-tab-pane label="故障分析" name="four">
                <div class="panel-content">
                    <el-table :data="[0]" style="width: 100%">
                        <el-table-column label="第一组">
                            <template #default="scope">
                                <input class="four-one-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column label="第二组">
                            <template #default="scope">
                                <input class="four-two-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column label="第三组">
                            <template #default="scope">
                                <input class="four-three-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column label="第四组">
                            <template #default="scope">
                                <input class="four-four-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column label="第五组">
                            <template #default="scope">
                                <input class="four-five-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column label="第六组">
                            <template #default="scope">
                                <input class="four-six-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-button type="primary" class="save-data" @click="saveOneData(4)">保存更改</el-button>
                </div>
            </el-tab-pane>

            <el-tab-pane label="课堂表现" name="five">
                <div class="panel-content">
                    <el-table :data="[0]" style="width: 100%">
                        <el-table-column label="第一组">
                            <template #default="scope">
                                <input class="five-one-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column label="第二组">
                            <template #default="scope">
                                <input class="five-two-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column label="第三组">
                            <template #default="scope">
                                <input class="five-three-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column label="第四组">
                            <template #default="scope">
                                <input class="five-four-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column label="第五组">
                            <template #default="scope">
                                <input class="five-five-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column label="第六组">
                            <template #default="scope">
                                <input class="five-six-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-button type="primary" class="save-data" @click="saveOneData(5)">保存更改</el-button>
                </div>
            </el-tab-pane>

            <el-tab-pane label="各组综合得分" name="six">
                <el-table :data="[0]" style="width: 100%">
                    <el-table-column label="第一组">
                        <template #default="scope">
                            <input class="six-one-input" type="number" :value="0">
                        </template>
                    </el-table-column>
                    <el-table-column label="第二组">
                        <template #default="scope">
                            <input class="six-two-input" type="number" :value="0">
                        </template>
                    </el-table-column>
                    <el-table-column label="第三组">
                        <template #default="scope">
                            <input class="six-three-input" type="number" :value="0">
                        </template>
                    </el-table-column>
                    <el-table-column label="第四组">
                        <template #default="scope">
                            <input class="six-four-input" type="number" :value="0">
                        </template>
                    </el-table-column>
                    <el-table-column label="第五组">
                        <template #default="scope">
                            <input class="six-five-input" type="number" :value="0">
                        </template>
                    </el-table-column>
                    <el-table-column label="第六组">
                        <template #default="scope">
                            <input class="six-six-input" type="number" :value="0">
                        </template>
                    </el-table-column>
                </el-table>
                <el-button type="primary" class="save-data" @click="saveOneData(6)">保存更改</el-button>
            </el-tab-pane>
        </el-tabs>
    </a-modal>

    <a-float-button shape="square" type="primary" :style="{right: '24px'}" @click="settingDialog = true">
        <template #icon>
            <SettingOutlined />
        </template>
    </a-float-button>

    <div class="screen-container" v-loading.fullscreen.lock="UIStore.siteErrors" element-loading-text="系统异常（请检查数据源）" :element-loading-svg="icons.loading" element-loading-svg-view-box="-10, -10, 50, 50">
        <img class="main-bg" src="../assets/images/map_bg.png" alt="" draggable="false">
        <div id='effect' style='position:absolute; width:100%; height:100%'></div>
        <div class="main-head">
            <div class="head-container">
                <div class="title-box" @click="backHome">
                    <img class="title-img" src="../../assets/image/mainl-3.png" alt="" draggable="false">
                    <span class="site-title">{{ UIStore.siteTitles }}</span>
                    <span class="site-desc">
                        小组过程评价&nbsp;&nbsp;&nbsp;{{ ScreenStore.taskList.find(item => item.id == Number(id.someProp)).name }}
                    </span>
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
                            <p class="head-title">作业前准备</p>
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
                            <p class="head-title">部件拆卸</p>
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
                            <p class="head-title">故障检测</p>
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
                            <p class="head-title">故障分析</p>
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
                            <p class="head-title">课堂表现</p>
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
                            <p class="head-title">各组综合得分</p>
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

<style>
table * {
    text-align: center
}

div.panel-content {
    width: 100%;
    overflow: hidden;
    max-height: 600px;
    overflow-y: scroll;
    overflow-x: scroll;
}

input[type='number'] {
    width: 90%;
    height: 25px;
    outline: none;
    margin: 0 auto;
    padding-left: 10px;
    border-radius: 5px;
    border: 1px solid #dddddd;
}

input[type='text'] {
    width: 90%;
    height: 35px;
    outline: none;
    margin: 0 auto;
    padding-left: 10px;
    border-radius: 5px;
    border: 1px solid #dddddd;
}

button.save-data {
    width: 98%;
    height: 40px;
    display: block;
    margin: 0 auto;
    margin-top: 20px;
}

h5.ant-typography {
    margin: 20px 0;
    text-align: center;
}
</style>