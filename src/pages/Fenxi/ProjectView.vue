
<script setup>
    import "./assets/ProjectView.css"
    import Item_1 from "./pages/Item_1.vue"
    import Item_2 from "./pages/Item_2.vue"
    import Item_3 from "./pages/Item_3.vue"
    import Item_4 from "./pages/Item_4.vue"
    import Item_5 from "./pages/Item_5.vue"
    import Item_6 from "./pages/Item_6.vue"
    import Item_7 from "./pages/Item_7.vue"
    import Item_8 from "./pages/Item_8.vue"

    defineProps({id: String});
</script>

<template>
    <Item_1 v-if="id == '6-1'" />
    <Item_2 v-if="id == '6-2'" />
    <Item_3 v-if="id == '6-3'" />
    <Item_4 v-if="id == '6-4'" />
    <Item_5 v-if="id == '6-5'" />
    <Item_6 v-if="id == '6-6'" />
    <Item_7 v-if="id == '6-7'" />
    <Item_8 v-if="id == '6-8'" />
</template>