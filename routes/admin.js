/**
 * Created by Administrator on 2017/4/10.
 */
var express=require('express');
var router=express.Router();
var orderss=require('../modules/orderlist');
router.get('/',function (req,res,next) {


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
        { $match : { orderdata : "2017/4/11" } },
        {
            $project: {_id:0,extension:1,orderdata:1,inventory_docs:1}
        },

        ],function (err,docs) {
            console.log(docs);
            res.render('admin',{title:'管理后台',docs});
        }
    );


    //XLSX.writeFile(workbook, 'out.xlsx');

});

module.exports = router;
