import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground, gql } from "apollo-server-core";
import { users,quotes } from "./fakedb.js";

const typeDefs=gql`
type Query{
    users:[users]
    quotes:[quotes]
}
type users{
    id:ID
    firstName:String
    lastname:String
    email:String
    password:String
}
type quotes{
    name:String
    by:ID
}
`
const resolvers={
    Query:{
        users:()=>users,
        quotes:()=>quotes
    }
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