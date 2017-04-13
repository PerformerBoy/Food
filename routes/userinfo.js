/**
 * Created by Administrator on 2017/2/20.
 */
var express = require('express');
var router = express.Router();
//var user=require('../lib/api_user');
var users = require('../modules/users');

/* GET home page. */
router.get('/', function (req, res, next) {
    users.aggregate({$project: {"department": 1, "username": 1, "extension": 1, "pew": 1, "telephone": 1, "email": 1}}
        , {
            $group: {
                _id: "$department",
                users: {
                    $push: {
                        username: '$username',
                        extension: "$extension",
                        pew: "$pew",
                        telephone: "$telephone",
                        email: "$email"
                    }
                },
                count: {$sum: 1}
            }
        }
        , function (err, docs) {
            console.log(docs);
            res.render('userinfo', {title: '电话号码表', docs});
        });
});

module.exports = router;