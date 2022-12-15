import authors from "./database.js";
import Author from "./Author.js";
import PageInfo from "./PageInfo.js";
import AuthorEdge from "./AuthorEdge.js";

const LIMIT = 2;

export default class Authors {
    constructor(first, after) {
        let limit = LIMIT;

        if(first > 0 && first < LIMIT) {
            limit = first;
        }

        let startingIndex = (after != null) ? after + 1 : 0;

        this.edges = [];
        let endCursor = 0;

        for(let i = startingIndex; i < startingIndex + limit; i++) {
            if (i >= authors.length) {
                break;
            }

            let author = new Author(i);
            let authorEdge = new AuthorEdge(author.id, author);
            endCursor = author.id;
            this.edges.push(authorEdge);
        }

        let hasNextPage = (startingIndex + limit) < authors.length;
        this.pageInfo = new PageInfo(hasNextPage, endCursor);
    }
}