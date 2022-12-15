# graphql-example
Testing out graphql

npm install
node server.js

In a web browser navigate to: http://localhost:4000/graphql

Use the following query:
query {
authors(first:1, after:1) {
pageInfo {
hasNextPage
endCursor
}
edges {
cursor
node {
id
name
booksConnection(first:1, after: 12) {
pageInfo {
hasNextPage
endCursor
}
edges {
cursor
node {
id
title
author {
id
name
}
}
}
}
}
}
}
}
