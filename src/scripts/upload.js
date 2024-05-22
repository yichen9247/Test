
import * as XLSX from 'xlsx'
import databaseOption from "@/scripts/database.js"
import { useDataStore } from "@/stores/DataStore.js"
import { useScreentore } from "@/stores/ScreenStore.js"

let datas = [],names = [],namds = [];
const DataStore = useDataStore();
const ScreenStore = useScreentore();
let screenDatabase = databaseOption.screenDatabase;
let studentDatabase = databaseOption.studentDatabase;
screenDatabase.version(1).stores(databaseOption.screenTrees);
studentDatabase.version(1).stores(databaseOption.studentTrees);

const handleFileUpload = async(event) => {
    const file = await event.target.files[0];
    const reader = new FileReader();
    await deleteDatabaseCat().then(async () => {
        reader.onload = async (e) => {
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: 'binary' });

            const profileData_book = workbook.SheetNames[workbook.SheetNames.indexOf('能力画像')];
            const profileData_shet = workbook.Sheets[profileData_book];
            const profileData_data = XLSX.utils.sheet_to_json(profileData_shet, { header: 1 });

            const StudentAsly_book = workbook.SheetNames[workbook.SheetNames.indexOf('个人分析')];
            const StudentAsly_shet = workbook.Sheets[StudentAsly_book];
            const StudentAsly_data = XLSX.utils.sheet_to_json(StudentAsly_shet, { header: 1 });

            const FamilysAsly_book = workbook.SheetNames[workbook.SheetNames.indexOf('整体分析')];
            const FamilysAsly_shet = workbook.Sheets[FamilysAsly_book];
            const FamilysAsly_data = XLSX.utils.sheet_to_json(FamilysAsly_shet, { header: 1 });

            const GroupsAsly_book = workbook.SheetNames[workbook.SheetNames.indexOf('小组分析')];
            const GroupsAsly_shet = workbook.Sheets[GroupsAsly_book];
            const GroupsAsly_data = XLSX.utils.sheet_to_json(GroupsAsly_shet, { header: 1 });

            const studentList_book = workbook.SheetNames[workbook.SheetNames.indexOf('学生信息')];
            const studentList_shet = workbook.Sheets[studentList_book];
            const studentList_data = XLSX.utils.sheet_to_json(studentList_shet, { header: 1 });

            const attendance_book = workbook.SheetNames[workbook.SheetNames.indexOf('考勤统计')];
            const attendance_shet = workbook.Sheets[attendance_book];
            const attendance_data = XLSX.utils.sheet_to_json(attendance_shet, { header: 1 });

            const groupScoreRank_book = workbook.SheetNames[workbook.SheetNames.indexOf('小组成绩排名')];
            const groupScoreRank_shet = workbook.Sheets[groupScoreRank_book];
            const groupScoreRank_data = XLSX.utils.sheet_to_json(groupScoreRank_shet, { header: 1 });

            const averageScore_book = workbook.SheetNames[workbook.SheetNames.indexOf('平均成绩分析')];
            const averageScore_shet = workbook.Sheets[averageScore_book];
            const averageScore_data = XLSX.utils.sheet_to_json(averageScore_shet, { header: 1 });

            const taskScoreAnalysis_book = workbook.SheetNames[workbook.SheetNames.indexOf('任务成绩分析')];
            const taskScoreAnalysis_shet = workbook.Sheets[taskScoreAnalysis_book];
            const taskScoreAnalysis_data = XLSX.utils.sheet_to_json(taskScoreAnalysis_shet, { header: 1 });

            const averageScoreRank_book = workbook.SheetNames[workbook.SheetNames.indexOf('平均成绩排名')];
            const averageScoreRank_shet = workbook.Sheets[averageScoreRank_book];
            const averageScoreRank_data = XLSX.utils.sheet_to_json(averageScoreRank_shet, { header: 1 });

            const skillRank_book = workbook.SheetNames[workbook.SheetNames.indexOf('技能标兵排名')];
            const skillRank_shet = workbook.Sheets[skillRank_book];
            const skillRank_data = XLSX.utils.sheet_to_json(skillRank_shet, { header: 1 });

            await renderProfile(profileData_data);
            await renderSkillRank(skillRank_data);
            await renderGroupsAsly(GroupsAsly_data);
            await renderAtttendance(attendance_data);
            await renderFamliysAsly(FamilysAsly_data);
            await renderStudentAsly(StudentAsly_data);
            await renderStudentList(studentList_data);
            await renderAverageScore(averageScore_data);
            await renderGroupScoreRank(groupScoreRank_data);
            await renderTaskScoreAnal(taskScoreAnalysis_data);
            await renderAverageScoreRank(averageScoreRank_data);
        };
        reader.readAsBinaryString(file);
    }).catch(async () => {
        ElMessage({type: 'error',message: "写入数据库异常！"});
    }).then(async () => {
        await DataStore.setUploadStatus(true);
        await DataStore.setFileName(file.name);
        await ScreenStore.setUploadStatus(true);
        ElMessage({type: 'success',message: "写入数据库成功！"});
    });
}

const deleteDatabaseCat = async () => {
    await databaseOption.deleteDatabase('screenDatabase');
    await databaseOption.deleteDatabase('studentDatabase');
}

const renderStudentList = async(data) => {
    let data_1 = data;
    let name_1 = data[0];
    await data_1.shift();
    
    names = [
        {id: name_1[0]},
        {na: name_1[1]},
        {xi: name_1[2]},
        {bu: name_1[3]},
        {cl: name_1[4]},
        {da: name_1[5]},
    ]

    namds = [
        {id: name_1[0]},
        {na: name_1[1]},
        {xi: name_1[2]},
        {bu: name_1[3]},
        {cl: name_1[4]},
        {da: name_1[5]},
        {qd: '签到'},{qj: '请假'},{cd: '迟到'},{kk: '旷课'}
    ]
    
    for (const iterator of data_1) {
        datas.push({
            id: iterator[0],
            na: iterator[1],
            xi: iterator[2],
            bu: iterator[3],
            cl: iterator[4],
            da: iterator[5],
            qd: iterator[6],
            qj: iterator[7],
            cd: iterator[8],
            kk: iterator[9],
            ph: iterator[10],
        });
    }
    await DataStore.setFileData(datas);
    await DataStore.setAttendTableName(namds);
    await DataStore.setScreenTableName(names);
    await databaseOption.addIntoData(studentDatabase.studentList,data);
}

const renderProfile = async(data) => {
    await databaseOption.addIntoData(studentDatabase.profileData,data);
}

const renderStudentAsly = async(data) => {
    await databaseOption.addIntoData(studentDatabase.studentAsly,data);
}

const renderGroupsAsly = async(data) => {
    await databaseOption.addIntoData(studentDatabase.groupsAsly,data);
}

const renderFamliysAsly = async(data) => {
    await databaseOption.addIntoData(studentDatabase.familysAsly,data);
}

const renderSkillRank = async(data) => {
    await databaseOption.addIntoData(screenDatabase.SkillRankHead,data[0]);
    await databaseOption.addIntoData(screenDatabase.SkillRankData,data);
}

const renderAverageScore = async(data) => {
    await databaseOption.addIntoData(screenDatabase.AverageScoreHead,data[0]);
    await databaseOption.addIntoData(screenDatabase.AverageScoreData,data[1]);
}

const renderAtttendance = async(data) => {
    await databaseOption.addIntoData(screenDatabase.AttendanceHead,data[0]);
    await databaseOption.addIntoData(screenDatabase.AttendanceData,data[1]);
}
const renderGroupScoreRank = async(data) => {
    await databaseOption.addIntoData(screenDatabase.GroupScoreRankData,data);
    await databaseOption.addIntoData(screenDatabase.GroupScoreRankHead,data[0]);
}

const renderTaskScoreAnal = async(data) => {
    await databaseOption.addIntoData(screenDatabase.TaskScoreAnalyLabel,data[0]);
    await databaseOption.addIntoData(screenDatabase.TaskScoreAnalyDatas,data[1]);
}

const renderAverageScoreRank = async(data) => {
    await databaseOption.addIntoData(screenDatabase.AverageScoreRankData,data);
    await databaseOption.addIntoData(screenDatabase.AverageScoreRankHead,data[0]);
}

const addQianDao = async (index, row) => {
    if (datas[datas.findIndex(item => item.id === row.id)]) {
        datas[datas.findIndex(item => item.id === row.id)].qd += 1;
    }
    await DataStore.setFileData(datas);
    await ElMessage({ message: '已添加签到，请点击刷新！', type: 'success', plain: true});
}

const addQingJia = async (index, row) => {
    if (datas[datas.findIndex(item => item.id === row.id)]) {
        datas[datas.findIndex(item => item.id === row.id)].qj += 1;
    }
    await DataStore.setFileData(datas);
    await ElMessage({ message: '已添加请假，请点击刷新！', type: 'success', plain: true});
}

const addChiDao = async (index, row) => {
    if (datas[datas.findIndex(item => item.id === row.id)]) {
        datas[datas.findIndex(item => item.id === row.id)].cd += 1;
    }
    await DataStore.setFileData(datas);
    await ElMessage({ message: '已添加迟到，请点击刷新！', type: 'success', plain: true});
}

const addKuangke = async (index, row) => {
    if (datas[datas.findIndex(item => item.id === row.id)]) {
        datas[datas.findIndex(item => item.id === row.id)].kk += 1;
    }
    await DataStore.setFileData(datas);
    await ElMessage({ message: '已添加旷课，请点击刷新！', type: 'success', plain: true});
}

const signAll = async () => {
    if (DataStore.uploadStatus) {
        for(let i=0;i<datas.length;i++) datas[i].qd += 1;
        await DataStore.setFileData(datas);
        ElMessage({type: 'success',message: "一键签到成功，请刷新！"});
    } else ElMessage({type: 'warning',message: "请先上传数据！"});
}

const exportArrayToExcel = async (header, data, filename = 'data.xlsx') => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([header, ...data]);
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, filename);
}

const exportData = async () => {
    const nameArr = ['学号/工号','姓名','院系','专业','班级','入学年份','签到','请假','迟到','旷课'];
    const dataArr = [];
    for (const iterator of datas) {
        dataArr.push([
            iterator.id,iterator.na,iterator.xi,iterator.bu,iterator.cl,iterator.da,iterator.qd,iterator.qj,iterator.cd,iterator.kk
        ]);
    }
    exportArrayToExcel(nameArr, dataArr);
    ElMessage({type: 'success',message: "保存出勤数据成功！"});
}

const serveData = async () => {
    if (DataStore.uploadStatus) {
        await exportData();
    } else ElMessage({type: 'warning',message: "请先上传数据！"});
}

const refreshPage = async () => {
    if (DataStore.uploadStatus) {
        DataStore.setUploadStatus(false);
        setTimeout(() => {
            DataStore.setUploadStatus(true);
        });
        await ElMessage({ message: '刷新成功！', type: 'success', plain: true});
    } else ElMessage({type: 'warning',message: "请先上传数据！"});
    
}

const removeStoreStatus = async () => {
    // await DataStore.setFileData([]);
    // await DataStore.setFileName(null);
    // await DataStore.setScreenTableName([]);
    // await DataStore.setAttendTableName([]);
    // await DataStore.setUploadStatus(false);
    // await ScreenStore.setUploadStatus(false);
}

export default { handleFileUpload, addChiDao, addKuangke, addQianDao, addQingJia, serveData, signAll, refreshPage, removeStoreStatus }