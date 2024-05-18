<script setup>
  import { watch } from 'vue'
  import router from './router'
  import "@/assets/paces/pace.css"
  import { RouterView } from 'vue-router'
  import { useUIStore } from "@/stores/UIStore.js"
  import { useDataStore } from "@/stores/DataStore.js"
  
  const UIStore = useUIStore();
  const DataStore = useDataStore();
  if (localStorage.getItem('login') != 'true') router.push('/login');

  const isExitLogin = async () => {
    if (localStorage.getItem('login') != 'true') {
      await ElMessageBox.alert('当前登录状态已失效，请重新登录', '请重新登录', {
        confirmButtonText: '确认',
        callback: (action) => {
          setTimeout(() => location.reload(),1000);
        },
      });
    };
  }

  watch(UIStore,async (newValue,oldValue) => await isExitLogin(),{deep: true});
  watch(DataStore,async (newValue,oldValue) => await isExitLogin(),{deep: true});
</script>

<template>
  <RouterView />
</template>