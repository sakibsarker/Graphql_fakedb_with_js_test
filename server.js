import { ApolloServer} from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground, gql } from "apollo-server-core";
import typeDefs from "./schemaGql.js";

import mongoose from "mongoose";
import { MONGO_URI } from "./config.js";

// mongoose.connect(MONGO_URI,{
//     useNewUr1Parser:true,
//     useUnifiedTopology:true
// })

// mongoose.connection.on("connected",()=>{
//     console.log("Connected to mongodb")
// })

// mongoose.connection.on("error",(err)=>{
//     console.log("error connecting",err)
// })
await mongoose
      .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
       
      })
      .then((res) => {
        console.log("Connected to mongoDB");
      })
      .catch((err) => {
        console.log("Error connecting",err);
      });

// model
import './models/Quotes.js'
import './models/User.js'
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