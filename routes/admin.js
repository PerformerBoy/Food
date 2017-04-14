/**
 * Created by Administrator on 2017/4/10.
 */
var express=require('express');
var router=express.Router();
var orderss=require('../modules/orderlist');
var XLSX=require('xlsx');

router.get('/',function (req,res,next) {
    let ss=req.query.ddd;
    console.log(ss);
    let date_mm=new Date();
    let qq='';
    if (date_mm.getDate()<10){
        qq=date_mm.getFullYear()+'/'+(date_mm.getMonth()+1)+'/0'+date_mm.getDate();
    }else{
        qq=date_mm.getFullYear()+'/'+(date_mm.getMonth()+1)+'/'+date_mm.getDate();
    }
    let selectdate=ss||qq;
    console.log(selectdate+"selectdate-----");
    orderss.aggregate([
        {
            $lookup:
                {
                    from: "users",
                    localField: "extension",
                    foreignField: "extension",
                    as: "inventory_docs",
                }
        },
        { $match : { orderdata : selectdate } },
        {
            $project: {_id:0,extension:1,orderdata:1,inventory_docs:1}
        },

        ],function (err,docs) {
            console.log(docs);
           //  XLSX.writeFile(docs, 'out.xlsx');
            res.render('admin',{title:'管理后台',docs});
        }
    );
});
router.post('/',function (req,res,next) {
    let ss=req.body.ddd;
    console.log(ss);
    let date_mm=new Date();
    let qq='';
    if (date_mm.getDate()<10){
        qq=date_mm.getFullYear()+'/'+(date_mm.getMonth()+1)+'/0'+date_mm.getDate();
    }else{
        qq=date_mm.getFullYear()+'/'+(date_mm.getMonth()+1)+'/'+date_mm.getDate();
    }
    let selectdate=ss||qq;
    console.log(selectdate+"selectdate-----");
    orderss.aggregate([
            {
                $lookup:
                    {
                        from: "users",
                        localField: "extension",
                        foreignField: "extension",
                        as: "inventory_docs",
                    }
            },
            { $match : { orderdata : selectdate } },
            {
                $project: {_id:0,extension:1,orderdata:1,inventory_docs:1}
            },

        ],function (err,data) {
            console.log(data);
            res.send(JSON.stringify(data));
        }
    );
});

module.exports = router;
