import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Info from "./pages/Info";
import Dashboard from "./pages/Dashboard";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Auth from "./components/utils/auth";
import "./styles/App.css";
import { WebSocketLink } from "@apollo/client/link/ws";
import { split } from "@apollo/client/link/core";
import { getMainDefinition } from "@apollo/client/utilities";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
let httpLink;
let wsURL;
// Construct our main GraphQL API endpoint
if (process.env.NODE_ENV === "production") {
  httpLink = createHttpLink({
    uri: "https://mern-edu-site.herokuapp.com/graphql",
    //uri: "/graphql",
  });
  wsURL = "ws://mern-edu-site.herokuapp.com/graphql";
} else {
  httpLink = createHttpLink({
    uri: "http://localhost:3001/graphql",
    //uri: "/graphql",
  });
  wsURL = "ws://localhost:3001/graphql";
}
// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});
const wsLink = new WebSocketLink({
  uri: wsURL,
  options: {
    reconnect: true,
    connectionParams: {
      authToken: localStorage.getItem("id_token"),
    },
  },
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  authLink.concat(httpLink)
);
const client = new ApolloClient({
  defaultOptions: {
    mutate: {
      // Set `omitTypename` to `true` to automatically remove `__typename` from mutation requests
      // This option is available in Apollo Client v3.4.0 or later
      omitTypename: true,
    },
  },
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link,
  cache: new InMemoryCache({
    addTypename: false,
  }),
});

// surround a component with the `RequireAuth` tag to require authentication to access the route
function RequireAuth({ children }) {
  return Auth.loggedIn() === true ? children : <Navigate to="/login" replace />;
}
function App() {
  const [currentForm, setCurrentForm] = useState("Login");

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

  return (
    <ApolloProvider client={client}>
      <div className="container">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route
              path="/dashboard"
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
            />
            <Route path="/info" element={<Info />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
