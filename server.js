var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

var schema = buildSchema(`
  
  type PageInfo {
    hasPreviousPage: Boolean!
    hasNextPage: Boolean!
    startCursor: String
    endCursor: String
  }
  
  type Author {
    id: Int
    name: String
    booksConnection(
      first: Int
      after: String
      last: Int
      before: String
    ) : AuthorBooksConnection
  }
  
  type Book {
    id: Int
    title: String
    author: Author
  }
  
  type AuthorBooksConnection {
    pageInfo: PageInfo!
    edges: [AuthorBooksEdge]
  }
  
  type AuthorBooksEdge {
    cursor: String!
    node: Book
  }
  
  type AuthorsConnection {
    pageInfo: PageInfo!
    edges: [AuthorsEdge]
  }
  
  type AuthorsEdge {
    cursor: String!
    node: Author
  }
`);

var root = {
  // authors: () => {
  //   return null;
  // }
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');