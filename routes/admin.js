/**
 * Created by Administrator on 2017/4/10.
 */
var express=require('express');
var router=express.Router();
router.get('/',function (req,res,next) {
    res.render('admin',{title:'管理后台'});
});

module.exports = router;
