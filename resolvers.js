import { users,quotes } from "./fakedb.js";
import {randomBytes} from 'crypto'
const resolvers={
    Query:{
        users:()=>users,
        user:(_,{id})=>users.find(user=>user.id==id),
        quotes:()=>quotes,
        iquote:(_,{by})=>quotes.filter(quote=>quote.by==by)
    },
    user:{
        quotes:(ur)=>quotes.filter(quote=>quote.by==ur.id)
    },
    Mutation:{
        signupUser:(_,{firstName,lastName,email,password})=>{
            const id=randomBytes(5).toString("hex")
            users.push({
                id,
                firstName,
                lastName,
                email,
                password,
            })

            return users.find(user=>user.id==id)


        }
    }
}

export default resolvers