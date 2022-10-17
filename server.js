import { ApolloServer} from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground, gql } from "apollo-server-core";
import typeDefs from "./schemaGql.js";
import resolvers from "./resolvers.js";

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