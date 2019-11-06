const {
   GraphQLObjectType,
   GraphQLString,
   GraphQLInt,
   GraphQLList,
   GraphQLSchema,
   GraphQLID,
   GraphQLNonNull
} = require('graphql');

const Book = require('../models/book');
const Author = require('../models/author');

const BookType = new GraphQLObjectType({
   name: 'Book',
   fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      genre: { type: GraphQLString },
      author: {
         type: AuthorType,
         resolve(parent, args) {
            const { authorId } = parent;
            return Author.findById(authorId);
            // return authors.find(a => a.id === authorId);
         }
      }
   })
});

const AuthorType = new GraphQLObjectType({
   name: 'Author',
   fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      age: { type: GraphQLInt },
      books: {
         type: new GraphQLList(BookType),
         resolve(parent, args) {
            const { id } = parent;
            return Book.find({ authorId: id });
            // return books.filter(b => b.authorId === id);
         }
      }
   })
});

const RootQuery = new GraphQLObjectType({
   name: 'RootQuery',
   fields: {
      book: {
         type: BookType,
         args: {
            id: { type: GraphQLID }
         },
         resolve(parent, args) {
            const { id } = args;
            return Book.findById(id);
            // return books.find(b => b.id === id);
         }
      },
      author: {
         type: AuthorType,
         args: {
            id: { type: GraphQLID }
         },
         resolve(parent, args) {
            const { id } = args;
            return Author.findById(id);
            // return authors.find(b => b.id === id);
         }
      },
      books: {
         type: GraphQLList(BookType),
         resolve: () => Book.find({})
      },
      authors: {
         type: GraphQLList(AuthorType),
         resolve: () => Author.find({})
      }
   }
});

const Mutation = new GraphQLObjectType({
   name: 'Mutation',
   fields: {
      addAuthor: {
         type: AuthorType,
         args: {
            name: { type: new GraphQLNonNull(GraphQLString) },
            age: { type: new GraphQLNonNull(GraphQLInt) }
         },
         resolve(parent, args) {
            console.log(parent);
            const { name, age } = args;
            const author = new Author({
               name,
               age
            });
            return author.save();
         }
      },
      addBook: {
         type: BookType,
         args: {
            name: { type: new GraphQLNonNull(GraphQLString) },
            genre: { type: new GraphQLNonNull(GraphQLString) },
            authorId: { type: new GraphQLNonNull(GraphQLID) }
         },
         resolve(parent, args) {
            console.log(parent);
            const { name, genre, authorId } = args;
            const book = new Book({
               name,
               genre,
               authorId
            });
            return book.save();
         }
      }
   }
});

module.exports = new GraphQLSchema({
   query: RootQuery,
   mutation: Mutation
});
