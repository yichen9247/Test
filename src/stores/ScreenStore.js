
import { ref } from "vue"
import { defineStore } from "pinia"

export const useScreentore = defineStore('ScreenStore',() => {

    const fileName = ref(null);
    const uploadStatus = ref(false);

    const groupList = ref([
        '第一组','第二组','第三组','第四组','第五组','第六组','第七组','第八组'
    ]);

    const taskList = ref([
        { id: 1, name: '任务一：预检IACC系统不响应' },
        { id: 2, name: '任务二：检测IACC电路及通讯故障' },
        { id: 3, name: '任务三：维修IACC电路及通讯故障' },
        { id: 4, name: '任务四：验证IACC功能正常激活' },
        { id: 5, name: '任务五：预检报IACC系统故障' },
        { id: 6, name: '任务六：检测IACC控制器及关联系统' },
        { id: 7, name: '任务七：维修IACC及关联系统故障' },
        { id: 8, name: '任务八：标定和验证IACC系统功能' },
    ]);

    const setFileName = (value) => fileName.value = value;
    const setUploadStatus = (value) => uploadStatus.value = value;

    return ({ groupList, taskList, fileName, uploadStatus, setFileName, setUploadStatus });
});