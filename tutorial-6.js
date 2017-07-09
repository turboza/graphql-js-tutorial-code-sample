/*
 * Tutorial 6: Object Types
 * --------------------------------------
 * http://graphql.org/graphql-js/object-types/
 */
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

module.exports = {
  schema,
  root,
}

/*
 * Helpers
 */
function random(start, end) {
  const range = end - start + 1
  return start + Math.floor(Math.random() * range)
}
