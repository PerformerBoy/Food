/**
 * Created by Administrator on 2017/2/20.
 * 用户表
 */
var mongoose = require("mongoose");
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;
var userScheMa = new Schema({
    //_id:{type:Number, autoIncrement:true, primaryKey : true, unique : true},
    username: { type:String,  allowNull: true, comment:'用户名' },
    active: { type:Number, allowNull: true, defaultValue: true, comment:'是否正常状态'},
    extension:{type:Number,allowNull:false,comment:'分机号'},
    pew:{type:String,allowNull:true,comment:'工位号'},
    telephone:{type:String,allowNull:true ,comment:'电话号'},
    department:{type:String, allowNull:true ,comment:'部门'},
    email:{type:String,allowNull:true,comment:'邮箱'}
});
module.exports = mongoose.model('users', userScheMa);