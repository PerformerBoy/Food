/**
 * Created by perform on 2017/3/15.
 */
var express = require('express');
var router = express.Router();
var apiuser=require('../lib/api_user');

router.get('/', function(req, res, next) {

    res.render('login', { title: '登陆' ,layout:null});
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
