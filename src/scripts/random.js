
const getRandomIntInclusive = () => {
    let min = Math.ceil(0);
    let max = Math.floor(100);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default { getRandomIntInclusive }