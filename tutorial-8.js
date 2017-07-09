/*
 * Tutorial 8: Constucting Types
 * -------------------------------------
 * http://graphql.org/graphql-js/constructing-types/
 */
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
} = require('graphql')

const fakeDatabase = {
  a: { id: 'a', name: 'alice' },
  b: { id: 'b', name: 'bob' },
}

const userType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString }
  }
})

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: userType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: (_, { id }) => fakeDatabase[id]
    },
  },
})

module.exports = {
  schema: new GraphQLSchema({ query: queryType }),
  root: null,
}
