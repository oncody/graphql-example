import Authors from "./author/Authors.js";

let root = {
    hello: () => {
        return 'Hello world!';
    },
    authors: ({first, after}) => {
        return new Authors(first, after);
    },

};

export default root;