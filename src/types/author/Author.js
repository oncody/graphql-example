import authors from "../../data/database.js";
import AuthorBooks from "./book/AuthorBooks.js";

export default class Author {
    constructor(id) {
        this.author = authors[id];
        this.id = this.author.id;
    }

    name() {
        return this.author.name;
    }

    booksConnection(first, after) {
        return new AuthorBooks(this, first, after);
    }
}