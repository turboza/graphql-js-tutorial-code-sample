const express = require('express')
const graphqlHTTP = require('express-graphql')

// Change the require below to other tutorial number to run that tutorial
const { schema, root } = require('./tutorial-8')

const app = express()
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}))

app.listen(4000)
console.log('Running a GraphQL API server at localhost:4000/graphql')
