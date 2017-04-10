/**
 * Created by Administrator on 2017/3/31.
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var orderScheMa = new Schema({
    extension:{type:Number,allowNull:false,comment:'分机号'},
    orderdata:{type:Array,allowNull:true,comment:'订餐日期'},
    modification:{type:Date,default:new Date(),comment:'修改日期'}
});
module.exports = mongoose.model('orderlist', orderScheMa);