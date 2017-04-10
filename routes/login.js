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
    apiuser.findOne(postdata).then(
        result=>{
            if(result==null){
                console.log('没有用户');
                let aa=1;
                res.render('login', { title: '登陆' ,layout:null,aa});
            }else{
                req.session.extension=result.extension;
                req.session.username=result.username;
                console.log( req.session.username+"--------"+req.session.extension);
                res.redirect(303,'/index');
            }
        }
    );
});
module.exports = router;
