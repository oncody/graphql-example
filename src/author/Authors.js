import authors from "../data/database.js";
import Author from "./Author.js";
import PageInfo from "../PageInfo.js";
import AuthorEdge from "./AuthorEdge.js";

const MAX_LIMIT = 2;

export default class Authors {
    constructor(first, after) {
        let limit = MAX_LIMIT;

        if(first > 0 && first < MAX_LIMIT) {
            limit = first;
        }

        let startingIndex = 0;
        if (after != null) {
            let idRelativeToAfter = authors.findIndex(author => author.id == after);
            if(idRelativeToAfter < 0) {
                return;
            }

            startingIndex = idRelativeToAfter + 1;
        }

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