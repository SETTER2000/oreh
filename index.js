const through2 = require('through2');
const _ = require('lodash');
const fs = require('fs');

// const users = require('https://api.randomuser.me/?nat=US&results=5');
const Readable = require('readable-stream').Readable;
const stream = Readable({objectMode: true});
const request = require('request');
let
     filePath = './assets/users.json'
    , dora = 0 // раунд
    , sek = 10000
    , countUsers = getRandomIntInclusive(10,10)
    , usUrl = `https://api.randomuser.me/?format=json&nat=us,dk,fr,gb&results=${countUsers}`
    , users = require(filePath)
;
// Запись данных о пользователях. Формирование файла json.
request
    .get(usUrl)
    .on('error', function (err) {
        console.error(err)
    })
    .pipe(fs.createWriteStream(filePath));

//
// fs.readFile(filePath, 'utf8', function (err, data) {
//     if (err) throw err;
//     users = data;
//     console.log(uesrs);
// });


/*request(usUrl, function (error, response, body) {
    console.error('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
  users = body;
});*/
/*const getUsers = count => new Promise((resolves, rejects) => {
    const api = `https://api.randomuser.me/?nat=US&results=5`;
    request.open('GET', api);
    request.onload = () => (request.status === 200) ?
        resolves(JSON.parse(request.response).results) :
        rejects(Error(request.statusText));
    request.onerror = (err) => rejects(err);
    request.send()
});*/



/* 1 */
stream._read = () => {};


console.log('игра "ОРЁЛ или РЕШКА" кол-во участников всего: ', countUsers);
console.log(`Через ${sek / 1000} секунд начнётся розыгрыш`);
console.log('Участники розыгрыша: ');
_.each(_.pluck(users.results, 'name'), user=>{
    console.log(`${user.title}: ${user.first} ${user.last}`);
});
// let r = Math.random().toString(36).substring(8);
// console.log("random", r);

/* 2 */


function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

function z(ln, sum = []) {
    dora = dora + 1;
    if (ln === 1) {
        return console.log(`Ура! Есть победитель. На ${dora} раунде`);

    } else {
        if (!ln) return console.log(`Нет победителя после ${dora} раундов!`);
        for (let i = 0; i < ln; i++) {
            Math.round(Math.random()) === 1 ? sum.push(1) : '';
        }
        console.log(`Раунд ${dora}; Кол-во участников имеющих орла: ${sum.length} из ${ln}`);
        z(sum.length);
    }
}

// z(countUsers);
// console.log('sum: ', z(100));

setInterval(() => {
    dora = 0;/* 3 */
    stream.push({
        x: _.isString(z(countUsers)) ? z(countUsers) : `Через ${sek / 1000} секунд начнётся розыгрыш`
    });
}, 5000);
const getX = through2.obj((data, enc, cb) => { /* 4 */
    cb(null, `${data.x.toString()}\n`);
});
stream.pipe(getX).pipe(process.stdout);
/* 5 */