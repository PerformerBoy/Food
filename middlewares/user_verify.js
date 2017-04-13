/**
 * Created by Administrator on 2017/4/13.
 */
module.exports.loginYes=function (req,res,next) {
        let extension = req.session.extension;
        let username = req.session.username;
        if(!extension){
            res.redirect('/');
        }else{
            res.locals.extension = extension;
            res.locals.username = username;
            next();
        }
    };