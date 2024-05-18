
<script setup>
    import "./assets/HeadView.css"
    import { useUIStore } from '@/stores/UIStore.js'

    const UIStore = useUIStore();

    const exitLogin = async() => {
        await ElMessageBox.alert('即将退出登录，请确认！', '退出登录', {
            confirmButtonText: '确认',
            callback: (action) => {
                if (action == 'confirm') {
                    ElMessage({
                    type: 'success',
                        message: "退出登录成功！",
                    });
                    localStorage.setItem('login','false');
                    setTimeout(() => location.reload(),1000);
                }
            },
        });
    }
</script>

<template>
    <el-header>
        <div class="title-box">
            <span class="title">{{ UIStore.siteTitles }}</span>
        </div>
        <div class="right-box">
            <a @click="exitLogin">退出登录</a>
            <a>个人中心</a>
            <a>{{ UIStore.userNickName }}</a>
        </div>
    </el-header>
</template>