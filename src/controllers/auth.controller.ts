import { Request, Response } from 'express';
import User, { IUser } from '../models/User';

import jwt from 'jsonwebtoken';

export const signup = async (req: Request, res: Response) => {

    const user: IUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    user.password = await user.encryptPassword(user.password);
    const savedUser = await user.save();

    // Token
    const token = jwt.sign({_id: savedUser._id}, process.env.SECRET_KEY || 'TOKENTEST');


    res.header('auth-token', token).json(savedUser);
}

export const signin = async (req: Request, res: Response) => {

    console.log(req.body.email)
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).json('invalid email or password');
    const correctPassword: boolean = await user.validatePassword(req.body.password);
    if(!correctPassword) return res.status(400).json('invalid email or password');

    const token = await jwt.sign({_id: user._id}, process.env.SECRET_KEY || 'asdasd', {
        expiresIn: 60 * 60
    });

    res.header('auth-token', token).json(user);
}

export const profile = (req: Request, res: Response) => {
    
}