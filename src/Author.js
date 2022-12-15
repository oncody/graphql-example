import authors from "./database.js";

export default class Author {
    constructor(id) {
        this.author = authors[id];
        this.id = this.author.id;
    }

    name() {
        return this.author.name;
    }
}