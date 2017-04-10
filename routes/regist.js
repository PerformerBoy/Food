/**
 * Created by perform on 2017/3/15.
 */
var express = require('express');
var router = express.Router();
var userapi=require('../lib/api_user');

router.get('/', function(req, res, next) {
    res.render('regist', { title: '注册' });
});
router.post('/',function (req,res,next) {
     let rr=req.body;
     console.log(rr);
     let savedata={extension:rr[Object.keys(rr)[0]],department:rr[Object.keys(rr)[1]],username:rr[Object.keys(rr)[2]],email:rr[Object.keys(rr)[3]],telephone:rr[Object.keys(rr)[4]],pew:rr[Object.keys(rr)[5]]};
     userapi.save(savedata).then(
        result=>{
            console.log(result);
            req.session.extension=result.extension;
            req.session.username=result.username;
            console.log( req.session.username+"--------"+req.session.extension);
         }
     );
});
module.exports = router;
