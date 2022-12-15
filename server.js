let express = require('express');
let { graphqlHTTP } = require('express-graphql');
let { buildSchema } = require('graphql');

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
    edges: [AuthorsEdge]
  }
  
  type AuthorsEdge {
    cursor: Int!
    node: Author
  }
  
  type Author {
    id: Int
    name: String
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

let authors = [
  {
    id: 0,
    name: 'author0'
  },
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
];

let author0books = [
  {
    id: 4,
    title: 'author0book0'
  },
  {
    id: 5,
    title: 'author0book1'
  },
  {
    id: 6,
    title: 'author0book2'
  },
  {
    id: 7,
    title: 'author0book3'
  },
];

let author1books = [
  {
    id: 8,
    title: 'author1book0'
  },
  {
    id: 9,
    title: 'author1book1'
  },
  {
    id: 10,
    title: 'author1book2'
  },
  {
    id: 11,
    title: 'author1book3'
  },
];

let author2books = [
  {
    id: 12,
    title: 'author2book0'
  },
  {
    id: 13,
    title: 'author2book1'
  },
  {
    id: 14,
    title: 'author2book2'
  },
  {
    id: 15,
    title: 'author2book3'
  },
];

let author3books = [
  {
    id: 16,
    title: 'author3book0'
  },
  {
    id: 17,
    title: 'author3book1'
  },
  {
    id: 18,
    title: 'author3book2'
  },
  {
    id: 19,
    title: 'author3book3'
  },
];

const LIMIT = 2;

let root = {
  hello: () => {
    return 'Hello world!';
  },
  authors: ({first, after}) => {
    let limit = LIMIT;

    if(first > 0 && first < LIMIT) {
      limit = first;
    }

    let startingIndex = (after != null) ? after + 1 : 0;

    let authorsEdges = [];
    let endCursor = 0;

    for(let i = startingIndex; i < startingIndex + limit; i++) {


      if (i >= authors.length) {
        break;
      }

      let authorNode = authors[i];

      let authorsEdge = {
        cursor: authorNode.id,
        node: authorNode
      }

      endCursor = authorNode.id;
      authorsEdges.push(authorsEdge);
    }

    let pageInfo = {
      hasNextPage: (startingIndex + limit) < authors.length,
      endCursor: endCursor,
    };

    let authorsConnection = {
      pageInfo: pageInfo,
      edges: authorsEdges,
    }

    return authorsConnection;
  },
};

let app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');