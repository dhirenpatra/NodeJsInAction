import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserSchema } from '../models/userModel';

const User = mongoose.model('User', UserSchema);
const secretKey = '5e8a09a1a615d50dca0fd964-5e8a1fbf0a556a0ebce810e9';

export const loginRequired = (req, res, next) => {
    if(req.user){
        next();
    } else {
        res.status(401).json({msg : 'Unauthorized Access !! '});
    }
}

export const registerUser = (req, res) => {
    const newUser = new User(req.body);
    newUser.hashPassword = bcrypt.hashSync(req.body.password, 10);
    newUser.save((err, user) => {
        if(err) {
            res.status(400).json({msg : err});
        } else {
            user.hashPassword = undefined;
            res.json(user);
        }
    });
}

export const login = (req, res) => {
    User.findOne({
        email : req.body.email
    }, (err, user) => {
        if( err ) throw err;
        if( !user ) {
            res.status(404).json({
                msg : 'No Users Found'
            })
        } else if (user) {
            if( ! user.comparePasswords(req.body.password, user.hashPassword) ) {
                res.status(401).json({
                    msg : 'Invalid Credentials check Username or Password !!'
                })
            } else {
                res.status(200).json({
                    token : jwt.sign({
                        email : user.email,
                        username  : user.userName,
                        _id : user.id
                    },secretKey)
                });
            }
        }
    });
}
