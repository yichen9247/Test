
<script setup>
    import router from "@/router"
    import "./assets/LoginView.css"
    import { onMounted, ref } from "vue"
    import { useUIStore } from '@/stores/UIStore.js'
    
    const username = ref('');
    const password = ref('');
    const UIStore = useUIStore();
    
    const loginCheck = async () => {
        if (username.value == '' || password.value == '') {
           await ElMessage({ message: '请输入账号或者密码！', type: 'warning', plain: true});
        } else {
            if (username.value == 'admin' && password.value == '12345678') {
                localStorage.setItem('nick','Admin');
                localStorage.setItem('login','true');
                setTimeout(() => router.push('../'),1000);
                await ElMessage({ message: '登录成功！', type: 'success', plain: true});
            } else await ElMessage({ message: '账号或密码错误！', type: 'error', plain: true});
        }
    }

    onMounted(async() => {
        document.title = `登录 - ${UIStore.siteTitles}`;
        await ElMessageBox.alert('测试账号：admin，测试密码：12345678', '测试账号', {
            confirmButtonText: '确认',
        });
    });
    const forgetPassword = async () => await ElMessage({ message: '请联系平台管理人员！', type: 'info', plain: true});
</script>

<template>
    <div class="login-container">
        <div class="login-warrper">
            <el-container>
                <el-header>
                    <span class="title">{{ UIStore.siteTitles }}</span>
                </el-header>
                <el-main>
                    <form action="" class="login-form">
                        <input v-model="username" class="username" type="text" placeholder="请输入账号">
                        <input v-model="password" class="password" type="password" placeholder="请输入密码">
                    </form>
                    <el-button class="loginButton" @click="loginCheck">登录</el-button>
                    <div class="user-action">
                        <a @click="forgetPassword">忘记密码</a>
                    </div>
                </el-main>
            </el-container>
        </div>
    </div>
</template>