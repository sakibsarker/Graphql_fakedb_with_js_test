import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground, gql } from "apollo-server-core";
import { users,quotes } from "./fakedb.js";

const typeDefs=gql`
type Query{
    users:[user]
    user(id:ID!):user
    quotes:[quote]
    iquote(by:ID!):[quote]
}
type user{
    id:ID!
    firstName:String
    middleName:String
    lastname:String
    email:String
    password:String
    quotes:[quote]
}
type quote{
    name:String
    by:ID
}
`
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
}

const server= new ApolloServer({
    typeDefs,
    resolvers,
    plugins:[
        ApolloServerPluginLandingPageGraphQLPlayground()
    ]

})

server.listen().then(({url})=>{
    console.log(`server ready at ${url}`)
});