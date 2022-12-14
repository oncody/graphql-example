var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

var schema = buildSchema(`
  
  type PageInfo {
    hasNextPage: Boolean!
    endCursor: String
  }
  
  type AuthorsConnection {
    pageInfo: PageInfo!
    edges: [AuthorsEdge]
  }
  
  type AuthorsEdge {
    cursor: String!
    node: Author
  }
  
  type Author {
    id: Int
    name: String
    booksConnection(
      first: Int
      after: String
    ) : AuthorBooksConnection
  }
  
  type AuthorBooksConnection {
    pageInfo: PageInfo!
    edges: [AuthorBooksEdge]
  }
  
  type AuthorBooksEdge {
    cursor: String!
    node: Book
  }
  
  type Book {
    id: Int
    title: String
    author: Author
  }
  
`);

var authors = [
  {
    id: 1,
    name: 'author1'
  },
  {
    id: 2,
    name: 'author2'
  },
  {
    id: 3,
    name: 'author3'
  },
  {
    id: 4,
    name: 'author4'
  },
];

var author1books = [
  {
    id: 1,
    title: 'author1book1'
  },
  {
    id: 2,
    title: 'author1book2'
  },
  {
    id: 3,
    title: 'author1book3'
  },
  {
    id: 4,
    title: 'author1book4'
  },
];

var author2books = [
  {
    id: 5,
    title: 'author2book1'
  },
  {
    id: 6,
    title: 'author2book2'
  },
  {
    id: 7,
    title: 'author2book3'
  },
  {
    id: 8,
    title: 'author2book4'
  },
];

var author3books = [
  {
    id: 9,
    title: 'author3book1'
  },
  {
    id: 10,
    title: 'author3book2'
  },
  {
    id: 11,
    title: 'author3book3'
  },
  {
    id: 12,
    title: 'author3book4'
  },
];

var author4books = [
  {
    id: 13,
    title: 'author4book1'
  },
  {
    id: 14,
    title: 'author4book2'
  },
  {
    id: 15,
    title: 'author4book3'
  },
  {
    id: 16,
    title: 'author4book4'
  },
];

var root = {
  authors: (first, after) => {
    return {
      id: 1
    }
  }
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');