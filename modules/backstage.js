var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var proScheMa = new Schema({
    projectname: { type:String,  allowNull: true, comment:'项目名' },
    projectlists:[
        {   extname:{type:String,allowNull:true,comment:'项目后台名称'},
            prourl: { type:String, allowNull: true, comment:'项目链接' },
            active: { type:Number, allowNull: true, defaultValue: true, comment:'是否正常状态'},
            pmextension:{type:Number,allowNull:true,comment:'项目经理分机号'},
            promanger:{type:String,allowNull:true,comment:'项目经理'},
            prosort:{type:Number,allowNull:true,comment:'排序'},
            share:{type:Boolean,allowNull:true,default:false,comment:'是否共享'},
            addtime:{type:Date,allowNull:true,default:new Date(), comment:'添加时间'},
            addperson:{type:Number,allowNull:true,comment:'添加人'}
        }
    ]
});
module.exports = mongoose.model('projectlist', proScheMa);