/*
 * Tutorial 4: Basic Types
 * --------------------------------------
 * http://graphql.org/graphql-js/basic-types/
 */
const { buildSchema } = require('graphql')

var schema = buildSchema(`
  type Query {
    quoteOfTheDay: String
    random: Float!
    rollThreeDice: [Int]
  }
`);

var root = {
  quoteOfTheDay: () => Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within',
  random: () => Math.random() * 10000000,
  rollThreeDice: () => [1, 2, 3].map(_ => random(1, 6)),
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
