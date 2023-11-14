import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { getAPIUrl } from "../utils/url";

const httpLink = new HttpLink({
  uri: getAPIUrl(),
});
const cache = new InMemoryCache();
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});
export default apolloClient;
