import App from "./App";
import { render } from "react-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { StyleContextProvider } from "./context/StyleContext";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql/",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          searchAnime: {
            // Don't cache separate results based on
            // any of this field's arguments.
            keyArgs: false,
            // Concatenate the incoming list items with
            // the existing list items.
            merge(existing = [], incoming) {
              return [...existing, ...incoming];
            },
          },
        },
      },
    },
  }),
  credentials: "include",
});

render(
  <ApolloProvider client={client}>
    <StyleContextProvider>
      <App />
    </StyleContextProvider>
  </ApolloProvider>,
  document.getElementById("root")
);
