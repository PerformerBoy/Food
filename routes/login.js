/**
 * Created by perform on 2017/3/15.
 */
var express = require('express');
var router = express.Router();
var apiuser=require('../lib/api_user');

router.get('/', function(req, res, next) {
    let signature=req.query.signature;
    let timestamp=req.query.timestamp;
    let nonce=req.query.nonce;
    let echostr=req.query.echostr;
    let token='food';
    console.log('signature:'+signature);
    console.log('timestamp:'+timestamp);
    console.log('nonce:'+nonce);
    console.log('echostr:'+echostr);
    res.render('login', { title: '登陆' ,echostr,layout:null});
});
router.post('/',function (req,res,next) {

     let postdata={
        extension:parseInt(req.body.extension),
    };
    console.log(postdata);
    let message={
        status:false,
        msg:''
    }
    apiuser.findOne(postdata).then(
        result=>{
            if(result==null){
                message.msg='没有用户';
                message.status=false;
                res.send(message);
            }else{
                req.session.extension=result.extension;
                req.session.username=result.username;
                console.log( req.session.username+"--------"+req.session.extension);
                message.status=true;
                res.send(message);
            }
        }
    );
});
module.exports = router;
