import { users,quotes } from "./fakedb.js";
import {randomBytes} from 'crypto';
import mongoose, { model } from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "./config.js";
const User=mongoose.model("User")

const resolvers={
    Query:{
        users:()=>users,
        user:(_,{_id})=>users.find(user=>user._id==_id),
        quotes:()=>quotes,
        iquote:(_,{by})=>quotes.filter(quote=>quote.by==by)
    },
    user:{
        quotes:(ur)=>quotes.filter(quote=>quote.by==ur._id)
    },
    Mutation:{
        signupUser:async(_,{userNew})=>{
            const user=await User.findOne({email:userNew.email})
            if(user){
                throw new Error("User already exit email")
            }
            const salting = await bcrypt.genSalt(10)
            const hashedPassword=await bcrypt.hash(userNew.password,salting)
            const newUser=new User({

                ...userNew,
                password:hashedPassword

            })
            return await newUser.save()


        },
        signinUser:async(_,{userSignin})=>{

            const user=await User.findOne({email:userSignin.email})
            if(!user){
                throw new Error("user dones't exist with that email")
            }
            const doMatch=await bcrypt.compare(userSignin.password,user.password)
            if(!doMatch){
                throw new Error("Email or password in invalid")
            }
            const token=jwt.sign({userID:user._id},JWT_SECRET)
            return {token}
        },
    }
}

export default resolvers