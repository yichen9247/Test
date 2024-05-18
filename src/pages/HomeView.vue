
<script setup>
    import "./assets/HomeView.css"
    import { onMounted } from "vue"
    import IndexView from "./IndexView.vue"
    import HeadView from "@/pages/HeadView.vue"
    
    import { useUIStore } from '@/stores/UIStore.js'

    const UIStore = useUIStore();

    onMounted(async() => {
        document.title = UIStore.siteTitles;
    });
    if (localStorage.getItem('login') != 'true') router.push('/login');
</script>

<template>
    <div class="main-container">
        <el-container>
            <HeadView />
            <IndexView v-if="UIStore.headSelect == 0" />
            
        </el-container>
    </div>
</template>