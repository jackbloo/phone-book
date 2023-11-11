import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { offsetLimitPagination } from "@apollo/client/utilities";

const httpLink = new HttpLink({
  uri: "https://wpe-hiring.tokopedia.net/graphql",
});
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        feed: offsetLimitPagination(),
      },
    },
  },
});
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});
export default apolloClient;
