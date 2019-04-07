const { GraphQLServer } = require('graphql-yoga');


// 1
const typeDefs = `
type Query {
  info: String!
  feed: [Link!]!
}

type Mutation {
  post(url: String!, description: String!): Link!
}

type Link {
  id: ID!
  description: String!
  url: String!
}
`
// JUST A STRING
// typeDefs define graphql schema, String! can NEVER BE NULL
// typeDefs can be either 1 of 3: Query, Mutation, Subscription
// [LINK!]! means that feed will return a LIST OF LINKS in which BOTH THE LIST AND EACH LINK CAN NEVER BE NULL, OR it could be an EMPTY LIST
// info and feed under type Query are ROOT FIELDS



// DUMMY DATA FOR LINKS BELOW
let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
}];
let idCount = links.length;




// 2
const resolvers = {
    Query: {
        info: ()=>'This is the API',
        feed: ()=>{return links} // another resolver for the feed ROOT FIELD (has to be named the same)
    },
    Mutation: { 
        post: (parent, args) => {
           const link = {
            id: `link-${idCount++}`,
            description: args.description,
            url: args.url,
          }
          links.push(link)
          return link
        }
      },
}
// 3 more resolvers for the fields in the LINK TYPE SCHEMA
// resolvers is the implementation of the schema (notice the similarities with typeDefs (which are schemas ???))

// resolver functions are being invoked and package all the responses according to the query's shape
// each query nesting evaluates to 1 resolver invocation level
// THE "PARENT" PARAMETERS correspond to the parent objects (in this case, the parent is the element inside the links array)
// the post resolver function under Mutation servers to push a new link to list of links and returns said link



// 3
const server = new GraphQLServer ({
    typeDefs, // could also have typeDefs refer to schema.graphql file
    resolvers,
})
// server is composed of both typeDefs and resolvers



server.start(()=>console.log(`Server is running on http://localhost:4000`))




