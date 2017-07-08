const express = require('express')
const graphqlHTTP = require('express-graphql')
const { graphql, buildSchema } = require('graphql')
const { range } = require('lodash')

const schema = buildSchema(`
  type RandomDie {
    numSides: Int!
    rollOnce: Int!
    roll(numRolls: Int!): [Int]
  }

  type Query {
    getDie(numSides: Int): RandomDie
  }
`)

class RandomDie {
  constructor(numSides) {
    this.numSides = numSides
  }

  rollOnce() {
    return random(1, this.numSides)
  }

  roll({ numRolls }) {
    return range(numRolls).map(_ => this.rollOnce())
  }
}

const root = {
  getDie: ({ numSides }) => new RandomDie(numSides || 6)
}

const app = express()
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}))

app.listen(4000)
console.log('Running a GraphQL API server at localhost:4000/graphql')


/*
 * Helpers
 */
function random(start, end) {
  const range = end - start + 1
  return start + Math.floor(Math.random() * range)
}
