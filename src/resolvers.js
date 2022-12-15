import Authors from "./types/author/Authors.js";

let root = {
    hello: () => {
        return 'Hello world!';
    },
    authors: ({first, after}) => {
        return new Authors(first, after);
    },

};

export default root;