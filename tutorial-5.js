/*
 * Tutorial 5: Passing Arguments
 * --------------------------------------
 * http://graphql.org/graphql-js/passing-arguments/
 */
const { buildSchema } = require('graphql')
const { range } = require('lodash')

var schema = buildSchema(`
  type Query {
    rollDice(numDice: Int!, numSides: Int): [Int]
  }
`);

var root = {
  rollDice: ({numDice, numSides}) => {
    return range(numDice).map(_ => random(1, numSides || 6))
  }
};

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
