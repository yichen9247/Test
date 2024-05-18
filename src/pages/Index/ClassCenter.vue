
<script setup>
    import { ref } from "vue";
    import "./assets/ClassCenter.css"

    const taskOne = ref(true);
    const setInfoDialog = (pageId) => open(`../task?id=${pageId}`);
</script>

<template>
    <div class="page-container">
        <ul class="class-list"> 
            <li class="class-list-item" @click="setInfoDialog(1)">项目一：人机交互系统检修</li>
            <li class="class-list-item" @click="setInfoDialog(2)">项目二：全景影像系统检修</li>
            <li class="class-list-item" @click="setInfoDialog(3)">项目三：倒车辅助PAS系统检修</li>
            <li class="class-list-item" @click="setInfoDialog(4)">项目四：并线辅助BSM系统检修</li>
            <li class="class-list-item" @click="setInfoDialog(5)">项目五：集成式自适应巡航IACC系统检修</li>
        </ul>
    </div>
</template>