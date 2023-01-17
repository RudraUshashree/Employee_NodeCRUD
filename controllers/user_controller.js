const userModel = require('../models/user_model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv');

const register = (req,res,next)=>{
    bcrypt.hash(req.body.password,10,function(err,hassedpass){
        if(err){
            res.json({
                error: err
            })
        }
        let newuser = new userModel({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: hassedpass
        });
        //console.log(hassedpass);
        newuser.save().then((response)=>{
            res.json({
                message: 'User added successfully...'
            })
        }).catch((err)=>{
            res.json({
                error: `An error occur while adding user ${err}`
            });
        })
    })
};

const login = (req,res,next)=>{
    var username = req.body.username;
    var password = req.body.password;

    userModel.findOne({$or: [{email:username},{phone:username}]})
        .then((user)=>{
            if(user){
                bcrypt.compare(password,user.password,function(err,result){
                    if(err){
                        res.json({
                            error: err
                        })
                    }
                    if(result){
                        let token = jwt.sign({name: user.name},process.env.ACCESS_TOKEN_SECRET,{expiresIn: process.env.ACCESS_TOKEN_EXPRIE_TIME});
                        let refreshtoken = jwt.sign({name: user.name},process.env.REFRESH_TOKEN_SECRET,{expiresIn: process.env.REFRESH_TOKEN_EXPRIE_TIME});
                        res.json({
                            message: 'Login Successfully',
                            token: token,
                            refreshtoken: refreshtoken
                        })
                    }else{
                        res.json({
                            message: 'password does not match...'
                        })
                    }
                })
            }else{
                res.json({
                    message: 'User not found...'
                })
            }
        })
}

const refreshtoken = (req,res,next)=>{
    const refreshtoken = req.body.refreshtoken;
    jwt.verify(refreshtoken,'!refresh%token@secret',function(err,decode){
        if(err){
            res.status(400).json({
                err
            })
        }else{          
            let token = jwt.sign({name: decode.name},process.env.ACCESS_TOKEN_SECRET,{expiresIn: process.env.ACCESS_TOKEN_EXPRIE_TIME});
            let refreshtoken = req.body.refreshtoken;
            res.status(200).json({
                message: 'Refreshed Token Successfully',
                token: token,
                refreshtoken: refreshtoken
            })
        }
    })
}


module.exports = {
    register,
    login,
    refreshtoken,
}; 