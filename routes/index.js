var express = require('express');
var router = express.Router();
var ordermm=require('../lib/api_order');
/* GET home page. */

router.get('/', function(req, res, next) {
    var order_ss = {
        extension : req.session.extension,
    };
    ordermm.findOne(order_ss)
        .then(result => {
            if(result==null){
                ordermm.save(order_ss);
            }
            console.log(result);
            res.render('index',{title:'日 历',result});
        });

});

router.post('/', function(req, res, next) {
    var order_ss = {
        extension : req.session.extension,
    };
    let array_aa=req.body;
    console.log(array_aa);
    let array_new=array_aa[Object.keys(array_aa)[0]];
    if(typeof array_new=='string'){
        array_new=[array_new];
    };
    let array_oo=new Set();
    let array_bb=new Set();
    for(let i=0;i<array_new.length;i++){
        console.log(array_new[i]);
        if(array_new[i].indexOf('TD')==-1){
            console.log('不存在');
            array_oo.add(array_new[i]);
        }else{
            console.log('存在');
            var kk=array_new[i].slice(0,array_new[i].indexOf('TD'));
            array_bb.add(kk);
        }
    };
    ordermm.update(order_ss,{$pullAll:{orderdata:Array.from(array_bb)}}).then(result=>{console.log(result)});
    ordermm.update(order_ss,{$pushAll:{orderdata:Array.from(array_oo)}}).then(result=>{console.log(result)});
    res.render('index');
});

module.exports = router;
