const express = require('express')
const graphqlHTTP = require('express-graphql')
const { graphql, buildSchema } = require('graphql')

const schema = buildSchema(`
  type Query {
    quoteOfTheDay: String
    random: Float!
    rollThreeDice: [Int]
    rollDice(numDice: Int!, numSides: Int): [Int]
  }
`)

const root = {
  quoteOfTheDay: () => Math.random() < 0.5 ? 'This is awesome' : 'You can do it!',
  random: () => Math.random() * 1000,
  rollThreeDice: () => [1, 2, 3].map(_ => random(1, 6)),
  rollDice: ({ numDice, numSides }) => {
    const output = []
    for(let i = 0; i < numDice; i++) {
      output.push(random(1, numSides))
    }
    return output
  }
}

function random(start, end) {
  const range = end - start + 1
  return start + Math.floor(Math.random() * range)
}

const app = express()
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}))

app.listen(4000)
console.log('Running a GraphQL API server at localhost:4000/graphql')
