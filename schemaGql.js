import {gql} from "apollo-server";
const typeDefs=gql`
type Query{
    users:[user]
    user(_id:ID!):user
    quotes:[quote]
    iquote(by:ID!):[quote]
}
type user{
    _id:ID!
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
type Token{
    token:String
}
type Mutation{
    signupUser(userNew:UserInput!):user
    signinUser(userSignin:UserSigninInput!):Token
}

input UserInput{
    firstName:String!
    lastName:String!
    email:String!
    password:String!
}
input UserSigninInput{
    email:String!
    password:String!
}

`
export default typeDefs