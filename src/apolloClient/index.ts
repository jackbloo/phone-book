import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
const httpLink = new HttpLink({
  uri: "https://wpe-hiring.tokopedia.net/graphql",
});
const cache = new InMemoryCache();
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});
export default apolloClient;
