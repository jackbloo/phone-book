import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { getAPIUrl } from "../utils/url";
import fetch from "cross-fetch";
loadDevMessages();
loadErrorMessages();
const httpLink = new HttpLink({
  uri: getAPIUrl(),
  fetch,
});
const cache = new InMemoryCache();
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});
export default apolloClient;
