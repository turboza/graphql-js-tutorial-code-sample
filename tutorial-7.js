/*
 * Tutorial 7: Mutation and Input type
 * -------------------------------------
 * http://graphql.org/graphql-js/mutations-and-input-types/
 */
const { buildSchema } = require('graphql')
const crypto = require('crypto')

const schema = buildSchema(`
  input MessageInput {
    content: String
    author: String
  }

  type Message {
    id: ID!
    content: String
    author: String
  }

  type Query {
    getMessage(id: ID!): Message
  }

  type Mutation {
    createMessage(input: MessageInput): Message
    updateMessage(id: ID!, input: MessageInput): Message
  }
`)

const fakeDatabase = {
  messages: {},
}

class Message {
  constructor(id, { content, author }) {
    this.id = id
    this.content = content
    this.author = author
  }

  static find(id) {
    const data = fakeDatabase.messages[id]
    return data ? new Message(id, data) : null
  }

  update({ content, author }) { // Partially update by default
    const data = fakeDatabase.messages[this.id]
    if (content) data.content = content
    if (author) data.author = author

    return this
  }
}

const root = {
  getMessage: ({ id }) => {
    const message = Message.find(id)
    if (!message) throw new Error(`message ${id} is not found`)

    return message
  },
  createMessage: ({ input }) => {
    const newId = genId() // TODO: prevent collision
    return new Message(newId, fakeDatabase.messages[newId] = input)
  },
  updateMessage: ({ id, input }) => {
    const message = Message.find(id)
    if (!message) throw new Error(`message ${id} is not found`)

    return message.update(input)
  }
}

module.exports = {
  schema,
  root,
}

/*
 * Helpers
 */
function genId () {
  return crypto.randomBytes(14).toString('hex')
}
