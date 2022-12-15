import authors from "./authors.js";

const LIMIT = 2;

let root = {
    hello: () => {
        return 'Hello world!';
    },
    human(obj, args, context, info) {
        return context.db.loadHumanByID(args.id).then(
            userData => new Human(userData)
        )
    },
    authors: ({first, after}) => {
        let authorLimit = LIMIT;

        if(first > 0 && first < LIMIT) {
            authorLimit = first;
        }

        let authorStartingIndex = (after != null) ? after + 1 : 0;

        let authorsEdges = [];
        let endCursor = 0;

        for(let i = authorStartingIndex; i < authorStartingIndex + authorLimit; i++) {
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
            hasNextPage: (authorStartingIndex + authorLimit) < authors.length,
            endCursor: endCursor,
        };

        let authorsConnection = {
            pageInfo: pageInfo,
            edges: authorsEdges,
        }

        return authorsConnection;
    },

};

export default root;