/**
 * Created by Administrator on 2017/2/20.
 */
var express = require('express');
var router = express.Router();
var user=require('../modules/users');

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('---------------------------');
    let page=1;
    let size=4;
    let counts=0;
    let array=[];
    user.find({},{_id:0,username:1,extension:1,pew:1,telephone:1,department:1,email:1},function (err,docs) {
        for(let i=0;i<docs.length;i++){
            array[i]=docs[i];
            console.log(array.length);
            counts=array.length;
        }
        console.log(docs);
        res.render('userinfo', { title: '电话号码表' ,info:array,counts:counts});
    });
});

module.exports = router;
