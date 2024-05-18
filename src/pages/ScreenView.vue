
<script setup>
    import "@/scripts/canvas.js"
    import "./assets/ScreenView.css"
    import { onMounted, ref } from "vue"
    import Item_1 from "./Screen/Item_1.vue"
    import Item_2 from "./Screen/Item_2.vue"
    import Item_3 from "./Screen/Item_3.vue"
    import Item_4 from "./Screen/Item_4.vue"
    import Item_5 from "./Screen/Item_5.vue"
    import Item_6 from "./Screen/Item_6.vue"
    import Item_7 from "./Screen/Item_7.vue"
    import Item_8 from "./Screen/Item_8.vue"
    import Item_P from "./Screen/Item_P.vue"
    import Item_A from "./Screen/Item_A.vue"
    import Task_1 from "./Screen/Tasks/Task_1.vue"
    import Task_2 from "./Screen/Tasks/Task_2.vue"
    import Task_3 from "./Screen/Tasks/Task_3.vue"
    import Task_4 from "./Screen/Tasks/Task_4.vue"
    import Task_5 from "./Screen/Tasks/Task_5.vue"
    import Task_6 from "./Screen/Tasks/Task_6.vue"
    import Task_7 from "./Screen/Tasks/Task_7.vue"
    import Task_8 from "./Screen/Tasks/Task_8.vue"
    
    import { useUIStore } from '@/stores/UIStore.js'

    const pageId = ref(null);
    const pageKey = ref(null);
    const UIStore = useUIStore();

    onMounted(async () => {
        let search = new URLSearchParams(location.search);
        pageId.value = search.get('id');
        pageKey.value = search.get('key');
        document.title = `数据大屏 - ${ UIStore.siteTitles }` 
    });
</script>

<template>
    <Item_1 v-if="pageId == '1'" />
    <Item_2 v-if="pageId == '2'" />
    <Item_3 v-if="pageId == '3'" />
    <Item_4 v-if="pageId == '4'" />
    <Item_5 v-if="pageId == '5'" />
    <Item_6 v-if="pageId == '6'" />
    <Item_7 v-if="pageId == '7'" />
    <Item_8 v-if="pageId == '8'" />

    <Item_P v-if="pageId == 'P'" :id="{ someProp: pageKey }" />
    <Item_A v-if="pageId == 'A'" :id="{ someProp: pageKey }" />

    <Task_1 v-if="pageId == 'T-1'" :id="{ someProp: pageKey }" />
    <Task_2 v-if="pageId == 'T-2'" :id="{ someProp: pageKey }" />
    <Task_3 v-if="pageId == 'T-3'" :id="{ someProp: pageKey }" />
</template>