var express = require('express');
var router = express.Router();
var calendar = require('../modules/calendar').Calendar;

/* GET users listing. */
router.get('/', function (req, res, next) {
    let todaydate = new Date();
    var month_days = [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    month_days[1] = (((todaydate.getFullYear() % 100 != 0) && (todaydate.getFullYear() % 4 == 0)) || (todaydate.getFullYear() % 400 == 0)) ? 29 : 28;
    console.log(month_days[todaydate.getMonth()]);
    let dd = todaydate.getDate();
    let ww = todaydate.getDay();
    if (ww === 0) ww = 7;
    console.log(ww + '===' + dd + '====' + todaydate.getMonth());
    let array = [];
    for (let i = 0; i < 42; i++) {
        if ((i < ww - dd % 7) || (i > (ww - dd % 7 - 1) + month_days[todaydate.getMonth()])) {
            array[i] = 0;
        } else {
            array[i] = i - (ww - dd % 7) + 1;
        }
    }
    console.log(array);
    res.render('calendar', {array});
});

module.exports = router;
