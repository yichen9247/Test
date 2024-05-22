
<script setup>
    import { ref } from "vue";
    import "./assets/ClassCenter.css"
    import { VueDraggable } from 'vue-draggable-plus'
    const setInfoDialog = (pageId) => open(`../task?id=${pageId}`);

    const classList = ref([
        {
            id: 1,
            name: '项目一：人机交互系统检修'
        }
        ,{
            id: 2,
            name: '项目二：全景影像系统检修'
        },
        {
            id: 3,
            name: '项目三：PAS倒车辅助系统检修'
        },
        {
            id: 4,
            name: '项目四：BSM并线辅助系统检修'
        },
        {
            id: 5,
            name: '项目五：IACC集成式自适应巡航系统检修'
        }
    ]);
</script>

<template>
    <div class="page-container">
        <ul class="class-list"> 
            <VueDraggable v-model="classList" class="drag-container" :animation="300">
                <li v-for="item in classList" :key="classList.indexOf(item)" class="class-list-item" @click="setInfoDialog(classList[classList.indexOf(item)].id)">{{ classList[classList.indexOf(item)].name }}</li>
            </VueDraggable>
        </ul>
    </div>
</template>