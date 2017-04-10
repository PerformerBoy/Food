var express = require('express');
var router = express.Router();
var backstage=require('../lib/api_backstage');


router.get('/', function(req, res, next) {
    var order_ss = {
        extension : req.session.extension,
    };
   // backstage.save(order_ss);
    backstage.find({$or:[{'projectlists.share':'true'},{'projectlists.addperson':order_ss.extension}]},{projectname:1, projectlists:1, _id:0},{sort:{prosort:1}}).then(result => {
            console.log('------');
            console.log(result);

            res.render('backstage',{title:'项目后台',result});
        });
});
router.post('/', function(req, res, next) {
    var pro_ss = {
        extension : req.session.extension,
    };
    let pro=req.body;
    console.log(pro);
    let projectname=pro[Object.keys(pro)[0]] , extname=pro[Object.keys(pro)[1]], prourl=pro[Object.keys(pro)[2]], promanger=pro[Object.keys(pro)[3]],pmextension=pro[Object.keys(pro)[4]], prosort=pro[Object.keys(pro)[5]],share=pro[Object.keys(pro)[6]];
    backstage.findOne({projectname:projectname})
        .then(result=>{
            if (result==null){
                return backstage.save({projectname:projectname});
            }
        }).then(result=>{
        console.log(result);
        backstage.update({projectname:projectname},{$push:{projectlists:{extname:extname,prourl:prourl,promanger:promanger,pmextension:pmextension,prosort:prosort,share:share,addperson:pro_ss.extension}}});

    });


    res.render('backstage');
});
module.exports = router;
