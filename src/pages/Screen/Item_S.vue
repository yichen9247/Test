
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
    let charts_one,charts_two,charts_three,charts_four,charts_five,charts_six,charts_seven,charts_eight;
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
        charts_seven = echarts.init(document.querySelector(".canvas-seven"));
        charts_eight = echarts.init(document.querySelector(".canvas-eight"));
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
        charts_seven.dispose();
        charts_eight.dispose();
    });

    const setAllCanvas = async () => {
        await setEchartsOne([0,0,0,0]);
        await setEchartsTwo([0,0,0,0]);
        await setEchartsThree([0,0,0,0]);
        await setEchartsFour([0,0,0,0]);
        await setEchartsFive([0,0,0,0]);
        await setEchartsSix([0,0,0,0]);
        await setEchartsSeven([0,0,0,0]);
        await setEchartsEight([0,0,0,0]);
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
                data: ['标定计划', '标定流程', '功能验证', '仿真操作']
            },
            yAxis: {
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
                data: ['标定计划', '标定流程', '功能验证', '仿真操作']
            },
            yAxis: {
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
                data: ['标定计划', '标定流程', '功能验证', '仿真操作']
            },
            yAxis: {
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
                data: ['标定计划', '标定流程', '功能验证', '仿真操作']
            },
            yAxis: {
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
                data: ['标定计划', '标定流程', '功能验证', '仿真操作']
            },
            yAxis: {
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
                data: ['标定计划', '标定流程', '功能验证', '仿真操作']
            },
            yAxis: {
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

    const setEchartsSeven = async (data) => {
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
                data: ['标定计划', '标定流程', '功能验证', '仿真操作']
            },
            yAxis: {
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
        charts_seven.setOption(option);
    }

    const setEchartsEight = async (data) => {
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
                data: ['标定计划', '标定流程', '功能验证', '仿真操作']
            },
            yAxis: {
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
        charts_eight.setOption(option);
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
                let data = [],max1 = 0,max2 = 0,max3 = 0,max4 = 0;
                let dom1 = document.querySelectorAll(".one-one-input");
                let dom2 = document.querySelectorAll(".one-two-input");
                let dom3 = document.querySelectorAll(".one-three-input");
                let dom4 = document.querySelectorAll(".one-four-input");

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

                data.push(max1/6.0);
                data.push(max2/6.0);
                data.push(max3/6.0);
                data.push(max4/6.0);
                setEchartsOne(data);
            }

            if (id == 2) {
                let data = [],max1 = 0,max2 = 0,max3 = 0,max4 = 0;
                let dom1 = document.querySelectorAll(".two-one-input");
                let dom2 = document.querySelectorAll(".two-two-input");
                let dom3 = document.querySelectorAll(".two-three-input");
                let dom4 = document.querySelectorAll(".two-four-input");

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

                data.push(max1/6.0);
                data.push(max2/6.0);
                data.push(max3/6.0);
                data.push(max4/6.0);
                setEchartsTwo(data);
            }

            if (id == 3) {
                let data = [],max1 = 0,max2 = 0,max3 = 0,max4 = 0;
                let dom1 = document.querySelectorAll(".three-one-input");
                let dom2 = document.querySelectorAll(".three-two-input");
                let dom3 = document.querySelectorAll(".three-three-input");
                let dom4 = document.querySelectorAll(".three-four-input");

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

                data.push(max1/6.0);
                data.push(max2/6.0);
                data.push(max3/6.0);
                data.push(max4/6.0);
                setEchartsThree(data);
            }

            if (id == 4) {
                let data = [],max1 = 0,max2 = 0,max3 = 0,max4 = 0;
                let dom1 = document.querySelectorAll(".four-one-input");
                let dom2 = document.querySelectorAll(".four-two-input");
                let dom3 = document.querySelectorAll(".four-three-input");
                let dom4 = document.querySelectorAll(".four-four-input");

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

                data.push(max1/6.0);
                data.push(max2/6.0);
                data.push(max3/6.0);
                data.push(max4/6.0);
                setEchartsFour(data);
            }

            if (id == 5) {
                let data = [],max1 = 0,max2 = 0,max3 = 0,max4 = 0;
                let dom1 = document.querySelectorAll(".five-one-input");
                let dom2 = document.querySelectorAll(".five-two-input");
                let dom3 = document.querySelectorAll(".five-three-input");
                let dom4 = document.querySelectorAll(".five-four-input");

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

                data.push(max1/6.0);
                data.push(max2/6.0);
                data.push(max3/6.0);
                data.push(max4/6.0);
                setEchartsFive(data);
            }

            if (id == 6) {
                let data = [],max1 = 0,max2 = 0,max3 = 0,max4 = 0;
                let dom1 = document.querySelectorAll(".six-one-input");
                let dom2 = document.querySelectorAll(".six-two-input");
                let dom3 = document.querySelectorAll(".six-three-input");
                let dom4 = document.querySelectorAll(".six-four-input");

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

                data.push(max1/6.0);
                data.push(max2/6.0);
                data.push(max3/6.0);
                data.push(max4/6.0);
                setEchartsSix(data);
            }

            if (id == 7) {
                let data = [],max1 = 0,max2 = 0,max3 = 0,max4 = 0;
                let dom1 = document.querySelectorAll(".seven-one-input");
                let dom2 = document.querySelectorAll(".seven-two-input");
                let dom3 = document.querySelectorAll(".seven-three-input");
                let dom4 = document.querySelectorAll(".seven-four-input");

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

                data.push(max1/6.0);
                data.push(max2/6.0);
                data.push(max3/6.0);
                data.push(max4/6.0);
                setEchartsSeven(data);
            }

            if (id == 8) {
                let data = [],max1 = 0,max2 = 0,max3 = 0,max4 = 0;
                let dom1 = document.querySelectorAll(".eight-one-input");
                let dom2 = document.querySelectorAll(".eight-two-input");
                let dom3 = document.querySelectorAll(".eight-three-input");
                let dom4 = document.querySelectorAll(".eight-four-input");

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

                data.push(max1/6.0);
                data.push(max2/6.0);
                data.push(max3/6.0);
                data.push(max4/6.0);
                setEchartsEight(data);
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
            <el-tab-pane label="第一组积分" name="one">
                <div class="panel-content" >
                    <el-table :data="studentList" style="width: 100%">
                        <el-table-column prop="name" label="学生姓名" width="100"/>
                        <el-table-column label="标定计划">
                            <template #default="scope">
                                <input class="one-one-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column label="标定流程">
                            <template #default="scope">
                                <input class="one-two-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column label="功能验证">
                            <template #default="scope">
                                <input class="one-three-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column label="仿真操作">
                            <template #default="scope">
                                <input class="one-four-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-button type="primary" class="save-data" @click="saveOneData(1)">保存更改</el-button>
                </div>
            </el-tab-pane>
            
            <el-tab-pane label="第二组积分" name="two">
                <div class="panel-content" >
                    <el-table :data="studentList" style="width: 100%">
                        <el-table-column prop="name" label="学生姓名" width="100"/>
                        <el-table-column label="标定计划">
                            <template #default="scope">
                                <input class="two-one-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column label="标定流程">
                            <template #default="scope">
                                <input class="two-two-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column label="功能验证">
                            <template #default="scope">
                                <input class="two-three-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column label="仿真操作">
                            <template #default="scope">
                                <input class="two-four-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-button type="primary" class="save-data" @click="saveOneData(2)">保存更改</el-button>
                </div>
            </el-tab-pane>

            <el-tab-pane label="第三组积分" name="three">
                <div class="panel-content" >
                    <el-table :data="studentList" style="width: 100%">
                        <el-table-column prop="name" label="学生姓名" width="100"/>
                        <el-table-column label="标定计划">
                            <template #default="scope">
                                <input class="three-one-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column label="标定流程">
                            <template #default="scope">
                                <input class="three-two-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column label="功能验证">
                            <template #default="scope">
                                <input class="three-three-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column label="仿真操作">
                            <template #default="scope">
                                <input class="three-four-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-button type="primary" class="save-data" @click="saveOneData(3)">保存更改</el-button>
                </div>
            </el-tab-pane>

            <el-tab-pane label="第四组积分" name="four">
                <div class="panel-content">
                    <el-table :data="studentList" style="width: 100%">
                        <el-table-column prop="name" label="学生姓名" width="100"/>
                        <el-table-column label="标定计划">
                            <template #default="scope">
                                <input class="four-one-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column label="标定流程">
                            <template #default="scope">
                                <input class="four-two-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column label="功能验证">
                            <template #default="scope">
                                <input class="four-three-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column label="仿真操作">
                            <template #default="scope">
                                <input class="four-four-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-button type="primary" class="save-data" @click="saveOneData(4)">保存更改</el-button>
                </div>
            </el-tab-pane>

            <el-tab-pane label="第五组积分" name="five">
                <div class="panel-content">
                    <el-table :data="studentList" style="width: 100%">
                        <el-table-column prop="name" label="学生姓名" width="100"/>
                        <el-table-column label="标定计划">
                            <template #default="scope">
                                <input class="five-one-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column label="标定流程">
                            <template #default="scope">
                                <input class="five-two-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column label="功能验证">
                            <template #default="scope">
                                <input class="five-three-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column label="仿真操作">
                            <template #default="scope">
                                <input class="five-four-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-button type="primary" class="save-data" @click="saveOneData(5)">保存更改</el-button>
                </div>
            </el-tab-pane>

            <el-tab-pane label="第六组积分" name="six">
                <div class="panel-content">
                    <el-table :data="studentList" style="width: 100%">
                        <el-table-column prop="name" label="学生姓名" width="100"/>
                        <el-table-column label="标定计划">
                            <template #default="scope">
                                <input class="six-one-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column label="标定流程">
                            <template #default="scope">
                                <input class="six-two-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column label="功能验证">
                            <template #default="scope">
                                <input class="six-three-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column label="仿真操作">
                            <template #default="scope">
                                <input class="six-four-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-button type="primary" class="save-data" @click="saveOneData(6)">保存更改</el-button>
                </div>
            </el-tab-pane>

            <el-tab-pane label="第七组积分" name="seven">
                <div class="panel-content">
                    <el-table :data="studentList" style="width: 100%">
                        <el-table-column prop="name" label="学生姓名" width="100"/>
                        <el-table-column label="标定计划">
                            <template #default="scope">
                                <input class="seven-one-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column label="标定流程">
                            <template #default="scope">
                                <input class="seven-two-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column label="功能验证">
                            <template #default="scope">
                                <input class="seven-three-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column label="仿真操作">
                            <template #default="scope">
                                <input class="seven-four-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <el-button type="primary" class="save-data" @click="saveOneData(7)">保存更改</el-button>
            </el-tab-pane>

            <el-tab-pane label="第八组积分" name="eight">
                <div class="panel-content">
                    <el-table :data="studentList" style="width: 100%">
                        <el-table-column prop="name" label="学生姓名" width="100"/>
                        <el-table-column label="标定计划">
                            <template #default="scope">
                                <input class="eight-one-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column label="标定流程">
                            <template #default="scope">
                                <input class="eight-two-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column label="功能验证">
                            <template #default="scope">
                                <input class="eight-three-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column label="仿真操作">
                            <template #default="scope">
                                <input class="eight-four-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <el-button type="primary" class="save-data" @click="saveOneData(8)">保存更改</el-button>
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
                        小组课堂评价&nbsp;&nbsp;&nbsp;{{ ScreenStore.taskList.find(item => item.id == Number(id.someProp)).name }}
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
                            <p class="head-title">第一组小组积分</p>
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
                            <p class="head-title">第二组小组积分</p>
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
                            <p class="head-title">第三组小组积分</p>
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
                            <p class="head-title">第四组小组积分</p>
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
                            <p class="head-title">第五组小组积分</p>
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
                            <p class="head-title">第六组小组积分</p>
                        </div>
                        <div class="box-body">
                            <img src="../../assets/image/bg02.png" alt="" draggable="false">
                            <div class="canvas-box canvas-six"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="body-line">
                <div class="line-container">
                    <div class="list-box">
                        <div class="box-head">
                            <img src="../../assets/image/box_title.png" alt="" draggable="false">
                            <p class="head-title">第七组小组积分</p>
                        </div>
                        <div class="box-body">
                            <img src="../../assets/image/bg02.png" alt="" draggable="false">
                            <div class="canvas-box canvas-seven"></div>
                        </div>
                    </div>
                </div>
                <div class="line-container">
                    <div class="list-box">
                        <div class="box-head">
                            <img src="../../assets/image/box_title.png" alt="" draggable="false">
                            <p class="head-title">第八组小组积分</p>
                        </div>
                        <div class="box-body">
                            <img src="../../assets/image/bg02.png" alt="" draggable="false">
                            <div class="canvas-box canvas-eight"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>

div.main-body {
    overflow-y: scroll;
}

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