import App from "./App";
import { render } from "react-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { StyleContextProvider } from "./context/StyleContext";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

render(
  <ApolloProvider client={client}>
    <StyleContextProvider>
      <App />
    </StyleContextProvider>
  </ApolloProvider>,
  document.getElementById("root")
);
