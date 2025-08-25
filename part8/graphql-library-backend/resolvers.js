const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
  Author: {
    bookCount: async (root) => {
      // const booksByAuthor = await Book.find({ author: root._id }) //causes the n+1 problem
      // return booksByAuthor.length

      return root._bookCountMap[root._id.toString()] || 0 // Lookup the count in the precomputed map
    },
  },
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const query = {}
      if (args.author) {
        const authorByName = await Author.findOne({ name: args.author })
        if (!authorByName) return []
        query.author = authorByName._id
      }

      if (args.genre) {
        query.genres = args.genre
      }
      return await Book.find(query).populate('author')
    },
    allAuthors: async () => {
      console.log('Author.find')
      const authors = await Author.find({})
      //group books by author, then count all documents in each group
      const authorsWithBookCounts = await Book.aggregate([
        { $group: { _id: '$author', count: { $sum: 1 } } },
      ])
      //convert to "id": {count} format
      const bookCountsMap = {}
      authorsWithBookCounts.forEach((a) => {
        bookCountsMap[a._id.toString()] = a.count
      })

      return authors.map((author) => ({
        ...author.toObject(), // convert Mongoose doc to plain object
        _bookCountMap: bookCountsMap,
      }))
    },
    me: (root, args, context) => {
      return context.currentUser
    },
  },

  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }
      try {
        const bookWithSameTitle = await Book.findOne({ title: args.title })
        if (bookWithSameTitle) {
          throw new GraphQLError('Title must be unique', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.title,
            },
          })
        }
        let author = await Author.findOne({ name: args.author })
        if (!author) {
          console.log('author name not found')
          author = new Author({ name: args.author })
          await author.save()
        }
        const book = new Book({ ...args, author: author._id })
        await book.save()
        pubsub.publish('BOOK_ADDED', { bookAdded: book })
        return book.populate('author')
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error,
          },
        })
      }
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }
      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }
      author.born = args.setBornTo

      try {
        await author.save()
      } catch (error) {
        throw new GraphQLError('Saving birth year failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error,
          },
        })
      }
      return author
    },
    createUser: async (root, args) => {
      const user = new User({ ...args })

      return user.save().catch((error) => {
        throw new GraphQLError('Creating the user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
            error,
          },
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterableIterator('BOOK_ADDED'),
    },
  },
}

module.exports = resolvers
