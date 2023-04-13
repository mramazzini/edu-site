const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const { authMiddleware } = require("./utils/auth");
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");
const { createServer } = require("http");
const { makeExecutableSchema } = require("graphql-tools");

const { execute, subscribe } = require("graphql");
const { SubscriptionServer } = require("subscriptions-transport-ws");
const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
  playground: true,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build"))); //Change to client/build on deployment
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  });
} else {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/public", "index.html"));
  });
}
const ws = createServer(app);

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });
  db.once("open", () => {
    ws.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}/`
      );

      // Create a WebSocket server for subscriptions
      new SubscriptionServer(
        {
          execute,
          subscribe,
          schema: makeExecutableSchema({ typeDefs, resolvers }),
          onConnect: server.onConnect,
          onDisconnect: server.onDisconnect,
        },
        {
          server: ws,
          path: server.graphqlPath,
        }
      );
    });
  });
};

// Call the async function to start the server
startApolloServer(typeDefs, resolvers);
//Hi
