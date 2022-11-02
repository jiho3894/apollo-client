import { ApolloProvider } from "@apollo/client";
import ReactDOM from "react-dom/client";
import App from "./App";
import { client } from "./client";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
