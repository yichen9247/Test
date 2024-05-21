
const getRandomIntInclusive = () => {
    let min = Math.ceil(0);
    let max = Math.floor(100);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getRandomIntInclusiveInter = (mins,maxs) => {
    let min = Math.ceil(mins);
    let max = Math.floor(maxs);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default { getRandomIntInclusive, getRandomIntInclusiveInter }