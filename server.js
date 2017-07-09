const express = require('express')
const graphqlHTTP = require('express-graphql')

const { schema, root } = require('./tutorial-7')

const app = express()
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}))

app.listen(4000)
console.log('Running a GraphQL API server at localhost:4000/graphql')
