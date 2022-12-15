import {buildSchema} from "graphql";

let schema = buildSchema(`
  type Query {
    hello: String
    authors(first: Int, after: Int): AuthorsConnection
  }

  type PageInfo {
    hasNextPage: Boolean!
    endCursor: Int
  }
  
  type AuthorsConnection {
    pageInfo: PageInfo!
    edges: [AuthorEdge]
  }
  
  type AuthorEdge {
    cursor: Int!
    node: Author
  }
  
  type Author {
    id: Int
    name: String
    booksConnection(
      first: Int
      after: Int
    ) : AuthorBooksConnection
  }
  
  type AuthorBooksConnection {
    pageInfo: PageInfo!
    edges: [AuthorBooksEdge]
  }
  
  type AuthorBooksEdge {
    cursor: Int!
    node: Book
  }
  
  type Book {
    id: Int
    title: String
    author: Author
  }
  
`);

export default schema;