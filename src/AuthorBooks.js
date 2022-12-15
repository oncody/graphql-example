import authors from "./database.js";
import PageInfo from "./PageInfo.js";
import AuthorBookEdge from "./AuthorBookEdge.js";
import Book from "./Book.js";

const MAX_LIMIT = 2;

export default class AuthorBooks {
    constructor(author, {first, after}) {
        this.author = author;

        let limit = MAX_LIMIT;

        if(first > 0 && first < MAX_LIMIT) {
            limit = first;
        }

        let books = authors[author.id].books;

        let startingIndex = 0;
        if (after != null) {
            let idRelativeToAfter = books.findIndex(book => book.id == after);
            if(idRelativeToAfter < 0) {
                return;
            }

            startingIndex = idRelativeToAfter + 1;
        }

        this.edges = [];
        let endCursor = 0;

        for(let i = startingIndex; i < startingIndex + limit; i++) {
            if (i >= books.length) {
                break;
            }

            let book = new Book(author, i);
            let authorBookEdge = new AuthorBookEdge(book.id, book);
            endCursor = book.id;
            this.edges.push(authorBookEdge);
        }

        let hasNextPage = (startingIndex + limit) < books.length;
        this.pageInfo = new PageInfo(hasNextPage, endCursor);
    }
}