
import { ref } from "vue"
import { defineStore } from "pinia"

export const useDataStore = defineStore('DataStore',() => {

    const fileData = ref([]);
    const fileName = ref(null);
    const uploadStatus = ref(false);
    const attendTableName = ref([]);
    const screenTableName = ref([]);

    const setFileName = (value) => fileName.value = value;
    const setFileData = (value) => fileData.value = value;
    const setUploadStatus = (value) => uploadStatus.value = value;
    const setScreenTableName = (value) => screenTableName.value = value;
    const setAttendTableName = (value) => attendTableName.value = value;

    return ({ fileName, fileData, attendTableName, screenTableName, uploadStatus, setFileName, setFileData ,setScreenTableName, setAttendTableName, setUploadStatus });
});