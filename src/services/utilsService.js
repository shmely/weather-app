export default {
    getRandomInteger,
    makeId
}

function getRandomInteger(min, max) {
    return min + Math.floor(Math.random() * Math.floor(max));
}

function makeId(length = 3) {
    console.log('got to makeId');

    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}