
<script setup>
    import { ref } from "vue";
    import "./assets/ClassCenter.css"
    import { VueDraggable } from 'vue-draggable-plus'
    const setInfoDialog = (pageId) => open(`../task?id=${pageId}`);

    const list = ref([
        '项目一：人机交互系统检修','项目二：全景影像系统检修','项目三：倒车辅助PAS系统检修','项目四：并线辅助BSM系统检修','项目五：集成式自适应巡航IACC系统检修'
    ]);
    
</script>

<template>
    <div class="page-container">
        <ul class="class-list"> 
            <VueDraggable v-model="list" class="drag-container" :animation="300">
                <li v-for="item in list" :key="list.indexOf(item)" class="class-list-item" @click="setInfoDialog(list.indexOf(item)+1)">{{ list[list.indexOf(item)] }}</li>
            </VueDraggable>
        </ul>
    </div>
</template>