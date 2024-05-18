
import Dexie from 'dexie'

const screenDatabase = new Dexie('screenDatabase');
const studentDatabase = new Dexie('studentDatabase');

const screenTrees = {
    SkillRankHead: 'data',
    SkillRankData: 'data',
    AttendanceHead: 'data',
    AttendanceData: 'data',
    AverageScoreHead: 'data',
    AverageScoreData: 'data',
    GroupScoreRankHead: 'data',
    GroupScoreRankData: 'data',
    TaskScoreAnalyLabel: 'data',
    TaskScoreAnalyDatas: 'data',
    AverageScoreRankHead: 'data',
    AverageScoreRankData: 'data',
}

const studentTrees = {
    studentList: 'data'
}

const addIntoData = async (table,data) => {
    try {
        await table.add({ data: data });
    } catch (error) {
        console.log(error)
        await ElMessage({ message: '写入数据库失败！', type: 'error', plain: true});
    }
}

const deleteDatabase = async (databaseName) => {
    const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    await indexedDB.deleteDatabase(databaseName);
}

export default { screenTrees, studentTrees, screenDatabase, studentDatabase, addIntoData, deleteDatabase };