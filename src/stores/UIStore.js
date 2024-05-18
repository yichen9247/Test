
import { ref } from "vue"
import Pace from 'pace-js'
import Cookies from "js-cookie"
import { defineStore } from "pinia"

export const useUIStore = defineStore('UIStore',() => {

    const headSelect = ref(0);
    const siteReadys = ref(false);
    const isCollapse = ref(false);
    const siteTitles = ref("智慧管理云平台");
    const siteErrors = ref(false);
    const userNickName = localStorage.getItem('nick');

    const setSiteErrors = (value) => siteErrors.value = value;
    const setHeadSelect = (value) => headSelect.value = value;
    const setIsCollapse = (value) => isCollapse.value = value;
    const setSiteReadys = (value) => siteReadys.value = value;

    return ({ siteErrors, headSelect, isCollapse, userNickName, siteTitles, siteReadys, setSiteErrors, setHeadSelect, setIsCollapse, setSiteReadys });
});