import {gql} from "apollo-server";
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
    lastName:String
    email:String
    password:String
    quotes:[quote]
}
type quote{
    name:String
    by:ID
}

type Mutation{
    signupUser(firstName:String!,lastName:String!,email:String!,password:String!):user
}

`
export default typeDefs