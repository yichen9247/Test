
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
        await setEchartsThree([0,0,0,0,0]);
        await setEchartsFour([0,0,0,0,0]);
        await setEchartsFive([0,0,0,0,0,0]);
        await setEchartsTwo([0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]);
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
                data: ['操作员', '驾驶员', '安全员', '记录员', '准备员', '通讯员']
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

    const setEchartsTwo = async (max1,max2,max3,max4,max5,max6) => {
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
                data: ['小组分工', '标定准备', '标定过程', '安全预案']
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    color: 'rgba(255, 255, 255)'
                },
            },
            series: [{
                name: '操作员',
                type: 'line',
                stack: 'Total',
                emphasis: {
                    focus: 'series'
                },
                data: max1
            },{
                name: '驾驶员',
                type: 'line',
                stack: 'Total',
                emphasis: {
                    focus: 'series'
                },
                data: max2
            },{
                name: '安全员',
                type: 'line',
                stack: 'Total',
                data: max3
            },{
                name: '记录员',
                type: 'line',
                stack: 'Total',
                data: max4
            },{
                name: '准备员',
                type: 'line',
                stack: 'Total',
                data: max5
            },{
                name: '通讯员',
                type: 'line',
                stack: 'Total',
                data: max6
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
                data: ['第一步', '第二步', '第三步', '第四步', '第五步']
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
                data: ['车辆', '工具', '环境', '道路', '专业人员']
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    color: 'rgba(255, 255, 255)'
                },
            },
            series: [{
                data: data,
                type: 'line'
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
                data: ['团队合作', '交流沟通', '默契度', '操作熟练度', '职业素养', '安全意识']
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
                let dom1 = document.querySelectorAll(".caozuo-one-input");
                let dom2 = document.querySelectorAll(".jiashi-one-input");
                let dom3 = document.querySelectorAll(".anquan-one-input");
                let dom4 = document.querySelectorAll(".jilu-one-input");
                let dom5 = document.querySelectorAll(".zhunbei-one-input");
                let dom6 = document.querySelectorAll(".tongxun-one-input");
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

                data.push(max1/6.0);
                data.push(max2/6.0);
                data.push(max3/6.0);
                data.push(max4/6.0);
                data.push(max5/6.0);
                data.push(max6/6.0);
                setEchartsOne(data);
            }

            if (id == 2) {
                let dom1 = document.querySelectorAll(".caozuo-two-input");
                let dom2 = document.querySelectorAll(".jiashi-two-input");
                let dom3 = document.querySelectorAll(".anquan-two-input");
                let dom4 = document.querySelectorAll(".jilu-two-input");
                let dom5 = document.querySelectorAll(".zhunbei-two-input");
                let dom6 = document.querySelectorAll(".tongxun-two-input");
                let max1 = [],max2 = [],max3 = [],max4 = [],max5 = [],max6 = [];

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

                setEchartsTwo(max1,max2,max3,max4,max5,max6);
            }

            if (id == 3) {
                let dom1 = document.querySelectorAll(".one-three-input");
                let dom2 = document.querySelectorAll(".two-three-input");
                let dom3 = document.querySelectorAll(".three-three-input");
                let dom4 = document.querySelectorAll(".four-three-input");
                let dom5 = document.querySelectorAll(".five-three-input");
                let dom6 = document.querySelectorAll(".six-three-input");
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

                data.push(max1/6.0);
                data.push(max2/6.0);
                data.push(max3/6.0);
                data.push(max4/6.0);
                data.push(max5/6.0);
                data.push(max6/6.0);
                setEchartsThree(data);
            }

            if (id == 4) {
                let dom1 = document.querySelectorAll(".one-four-input");
                let dom2 = document.querySelectorAll(".two-four-input");
                let dom3 = document.querySelectorAll(".three-four-input");
                let dom4 = document.querySelectorAll(".four-four-input");
                let dom5 = document.querySelectorAll(".five-four-input");
                let dom6 = document.querySelectorAll(".six-four-input");
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

                data.push(max1/6.0);
                data.push(max2/6.0);
                data.push(max3/6.0);
                data.push(max4/6.0);
                data.push(max5/6.0);
                data.push(max6/6.0);
                setEchartsFour(data);
            }

            if (id == 5) {
                let dom1 = document.querySelectorAll(".one-five-input");
                let dom2 = document.querySelectorAll(".two-five-input");
                let dom3 = document.querySelectorAll(".three-five-input");
                let dom4 = document.querySelectorAll(".four-five-input");
                let dom5 = document.querySelectorAll(".five-five-input");
                let dom6 = document.querySelectorAll(".six-five-input");
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

                data.push(max1/6.0);
                data.push(max2/6.0);
                data.push(max3/6.0);
                data.push(max4/6.0);
                data.push(max5/6.0);
                data.push(max6/6.0);
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
            <el-tab-pane label="小组成员得分情况" name="one">
                <div class="panel-content" >
                    <el-table :data="studentList" style="width: 100%">
                        <el-table-column prop="name" label="学生姓名" width="100"/>
                        <el-table-column label="操作员">
                            <template #default="scope">
                                <input class="caozuo-one-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column label="驾驶员">
                            <template #default="scope">
                                <input class="jiashi-one-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column label="安全员">
                            <template #default="scope">
                                <input class="anquan-one-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column label="记录员">
                            <template #default="scope">
                                <input class="jilu-one-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column label="准备员">
                            <template #default="scope">
                                <input class="zhunbei-one-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column label="通讯员">
                            <template #default="scope">
                                <input class="tongxun-one-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-button type="primary" class="save-data" @click="saveOneData(1)">保存更改</el-button>
                </div>
            </el-tab-pane>
            
            <el-tab-pane label="标定环节得分情况" name="two">
                <div class="panel-content" >
                    <a-typography-title :level="5">操作员</a-typography-title>
                    <el-table :data="[0]" style="width: 100%" class="ttt">
                        <el-table-column label="小组分工">
                            <template #default="scope">
                                <input class="caozuo-two-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column prop="jiashi" label="标定准备">
                            <template #default="scope">
                                <input class="caozuo-two-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column prop="anquan" label="标定过程">
                            <template #default="scope">
                                <input class="caozuo-two-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column prop="jilu" label="安全预案">
                            <template #default="scope">
                                <input class="caozuo-two-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                    </el-table>

                    <a-typography-title :level="5">驾驶员</a-typography-title>
                    <el-table :data="[0]" style="width: 100%">
                        <el-table-column label="小组分工">
                            <template #default="scope">
                                <input class="jiashi-two-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column prop="jiashi" label="标定准备">
                            <template #default="scope">
                                <input class="jiashi-two-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column prop="anquan" label="标定过程">
                            <template #default="scope">
                                <input class="jiashi-two-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column prop="jilu" label="安全预案">
                            <template #default="scope">
                                <input class="jiashi-two-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                    </el-table>

                    <a-typography-title :level="5">安全员</a-typography-title>
                    <el-table :data="[0]" style="width: 100%">
                        <el-table-column label="小组分工">
                            <template #default="scope">
                                <input class="anquan-two-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column prop="jiashi" label="标定准备">
                            <template #default="scope">
                                <input class="anquan-two-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column prop="anquan" label="标定过程">
                            <template #default="scope">
                                <input class="anquan-two-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column prop="jilu" label="安全预案">
                            <template #default="scope">
                                <input class="anquan-two-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                    </el-table>

                    <a-typography-title :level="5">记录员</a-typography-title>
                    <el-table :data="[0]" style="width: 100%">
                        <el-table-column label="小组分工">
                            <template #default="scope">
                                <input class="jilu-two-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column prop="jiashi" label="标定准备">
                            <template #default="scope">
                                <input class="jilu-two-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column prop="anquan" label="标定过程">
                            <template #default="scope">
                                <input class="jilu-two-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column prop="jilu" label="安全预案">
                            <template #default="scope">
                                <input class="jilu-two-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                    </el-table>

                    <a-typography-title :level="5">准备员</a-typography-title>
                    <el-table :data="[0]" style="width: 100%">
                        <el-table-column label="小组分工">
                            <template #default="scope">
                                <input class="zhunbei-two-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column prop="jiashi" label="标定准备">
                            <template #default="scope">
                                <input class="zhunbei-two-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column prop="anquan" label="标定过程">
                            <template #default="scope">
                                <input class="zhunbei-two-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column prop="jilu" label="安全预案">
                            <template #default="scope">
                                <input class="zhunbei-two-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                    </el-table>

                    <a-typography-title :level="5">通讯员</a-typography-title>
                    <el-table :data="[0]" style="width: 100%">
                        <el-table-column label="小组分工">
                            <template #default="scope">
                                <input class="tongxun-two-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column prop="jiashi" label="标定准备">
                            <template #default="scope">
                                <input class="tongxun-two-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column prop="anquan" label="标定过程">
                            <template #default="scope">
                                <input class="tongxun-two-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column prop="jilu" label="安全预案">
                            <template #default="scope">
                                <input class="tongxun-two-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-button type="primary" class="save-data" @click="saveOneData(2)">保存更改</el-button>
                </div>
            </el-tab-pane>

            <el-tab-pane label="标定步骤得分情况" name="three">
                <div class="panel-content" >
                    <el-table :data="studentList" style="width: 100%">
                        <el-table-column prop="name" label="学生姓名" width="100"/>
                        <el-table-column label="第一步">
                            <template #default="scope">
                                <input class="one-three-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column label="第二步">
                            <template #default="scope">
                                <input class="two-three-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column label="第三步">
                            <template #default="scope">
                                <input class="three-three-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column label="第四步">
                            <template #default="scope">
                                <input class="four-three-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column label="第五步">
                            <template #default="scope">
                                <input class="five-three-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-button type="primary" class="save-data" @click="saveOneData(3)">保存更改</el-button>
                </div>
            </el-tab-pane>

            <el-tab-pane label="协定准备得分情况" name="four">
                <div class="panel-content">
                    <el-table :data="studentList" style="width: 100%">
                        <el-table-column prop="name" label="学生姓名" width="100"/>
                        <el-table-column label="车辆">
                            <template #default="scope">
                                <input class="one-four-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column label="工具">
                            <template #default="scope">
                                <input class="two-four-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column label="环境">
                            <template #default="scope">
                                <input class="three-four-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column label="道路">
                            <template #default="scope">
                                <input class="four-four-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column label="专业人员">
                            <template #default="scope">
                                <input class="five-four-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-button type="primary" class="save-data" @click="saveOneData(4)">保存更改</el-button>
                </div>
            </el-tab-pane>

            <el-tab-pane label="小组合作完成任务情况" name="five">
                <div class="panel-content">
                    <el-table :data="studentList" style="width: 100%">
                        <el-table-column prop="name" label="学生姓名" width="100"/>
                        <el-table-column label="团队合作">
                            <template #default="scope">
                                <input class="one-five-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column label="交流沟通">
                            <template #default="scope">
                                <input class="two-five-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column label="默契度">
                            <template #default="scope">
                                <input class="three-five-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column label="操作熟练度">
                            <template #default="scope">
                                <input class="four-five-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column label="职业素养">
                            <template #default="scope">
                                <input class="five-five-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                        <el-table-column label="安全意识">
                            <template #default="scope">
                                <input class="six-five-input" type="number" :value="0">
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-button type="primary" class="save-data" @click="saveOneData(5)">保存更改</el-button>
                </div>
            </el-tab-pane>

            <el-tab-pane label="小组优秀成员" name="six">
                <el-table :data="[0]" style="width: 100%">
                    <el-table-column label="技能之星">
                        <template #default="scope">
                            <input class="six-input-one" type="text" :value="'任思旭'">
                        </template>
                    </el-table-column>
                    <el-table-column label="安全之星">
                        <template #default="scope">
                            <input class="six-input-two" type="text" :value="'苏思元'">
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
                            <p class="head-title">小组成员得分情况</p>
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
                            <p class="head-title">标定环节得分情况</p>
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
                            <p class="head-title">标定步骤得分情况</p>
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
                            <p class="head-title">协定准备得分情况</p>
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
                            <p class="head-title">小组合作完成任务情况</p>
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
                            <p class="head-title">小组优秀成员</p>
                        </div>
                        <div class="box-body">
                            <img src="../../assets/image/bg02.png" alt="" draggable="false">
                            <el-table :data="startStudent" style="width: 100%;margin-top:0" class="table" v-if="startStudent != null">
                                <el-table-column prop="zu"  width="180" />
                                <el-table-column prop="mz"  width="180" />
                            </el-table>
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