
<script setup>
    import "./assets/TasklistView.css"
    import { onMounted, ref } from "vue"
    import { useUIStore } from '@/stores/UIStore.js'

    const pageId = ref(null);
    const UIStore = useUIStore();

    const siteConfig = [
        {
            title: '项目一：人机交互系统检修'
        },
        {
            subTitle: '项目二：全景影像系统检修'
        },
        {
            title: '项目三：人机交互系统检修'
        },
        {
            title: '项目四：并线辅助BSM系统检修'
        },
        {
            title: '项目五：集成式自适应巡航IACC系统检修'
        },
    ]

    onMounted(() => {
        let search = new URLSearchParams(location.search);
        UIStore.setSiteReadys(true);
        pageId.value = search.get('id');
        document.title = `项目课程 - ${UIStore.siteTitles}`;
    });
</script>

<template>
    <div class="task-container" v-if="UIStore.siteReadys">
        <img class="main-bg" src="../assets/sl03//f1_1.821b9c76.jpg" alt="">

        <div class="container-header">
            <p class="title">{{ siteConfig[pageId - 1].title }}</p>
        </div>

        <div class="container-body">
            <div class="body-left">
                <!-- <div class="action-box">
                    <div class="head">
                        <span class="name">签到人数</span>
                    </div>
                    <div class="body">
                        <el-statistic class="box-data":value="outputValue" />
                    </div>
                </div>

                <div class="action-box">
                    <div class="head">
                        <span class="name">旷课人数</span>
                    </div>
                    <div class="body">
                        <el-statistic class="box-data":value="outputValue" />
                    </div>
                </div>

                <div class="action-box">
                    <div class="head">
                        <span class="name">迟到人数</span>
                    </div>
                    <div class="body">
                        <el-statistic class="box-data":value="outputValue" />
                    </div>
                </div>

                <div class="action-box">
                    <div class="head">
                        <span class="name">旷课人数</span>
                    </div>
                    <div class="body">
                        <el-statistic class="box-data":value="outputValue" />
                    </div>
                </div> -->
            </div>
            <div class="body-right">
                <div class="right-box">
                    <div class="content-box">

                        <div class="list-box" v-if="pageId == 5">
                            <el-space wrap :size="40">
                                <div class="list-item">
                                    <!-- <img class="bg" src="../../assets/image/main_middle.png" alt="" draggable="false"> -->
                                    <div class="box">
                                        <span class="name"><span style="color: yellow">预检</span>IACC系统不响应</span>
                                    </div>
                                </div>

                                <div class="list-item">
                                    <!-- <img class="bg" src="../../assets/image/main_middle.png" alt="" draggable="false"> -->
                                    <div class="box">
                                        <span class="name"><span style="color: yellow">检测</span>IACC电路及通讯故障</span>
                                    </div>
                                    
                                </div>

                                <div class="list-item">
                                    <!-- <img class="bg" src="../../assets/image/main_middle.png" alt="" draggable="false"> -->
                                    <div class="box">
                                        <span class="name"><span style="color: yellow">维修</span>IACC电路及通讯故障</span>
                                    </div>
                                </div>

                                <div class="list-item">
                                    <!-- <img class="bg" src="../../assets/image/main_middle.png" alt="" draggable="false"> -->
                                    <div class="box">
                                        <span class="name"><span style="color: yellow">验证</span>IACC功能正常激活</span>
                                    </div>
                                </div>

                                <div class="list-item">
                                    <!-- <img class="bg" src="../../assets/image/main_middle.png" alt="" draggable="false"> -->
                                    <div class="box">
                                        <span class="name"><span style="color: yellow">预检</span>报IACC系统故障</span>
                                    </div>
                                </div>

                                <div class="list-item">
                                    <!-- <img class="bg" src="../../assets/image/main_middle.png" alt="" draggable="false"> -->
                                    <div class="box">
                                        <span class="name"><span style="color: yellow">检测</span>IACC控制器及关联系统</span>
                                    </div>
                                </div>

                                <div class="list-item">
                                    <!-- <img class="bg" src="../../assets/image/main_middle.png" alt="" draggable="false"> -->
                                    <div class="box">
                                        <span class="name"><span style="color: yellow">维修</span>IACC及关联系统故障</span>
                                    </div>
                                </div>

                                <div class="list-item">
                                    <!-- <img class="bg" src="../../assets/image/main_middle.png" alt="" draggable="false"> -->
                                    <div class="box">
                                        <span class="name"><span style="color: yellow">标定</span>和验证IACC系统功能</span>
                                    </div>
                                </div>
                            </el-space>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>