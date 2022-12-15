import authors from "./database.js";

export default class Book {
    constructor(author, authorBookIndex) {
        this.author = author;
        this.book = authors[this.author.id].books[authorBookIndex];
        this.id = this.book.id;

    }

    title() {
        return this.book.title;
    }
}