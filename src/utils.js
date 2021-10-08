import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'https://api.linear.app/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  // const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: 'lin_api_t53C3CQvnvNuh6GD2uZ4z5Pc5pBRwfncjIah5TOm',
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export const combineArrays = (header, body) => {
  const result = {};
  header.forEach((key, i) => (result[key] = body[i]));
  //   console.log(result);
  return result;
};

export const mapPriority = (input) => {
  const priorityMap = {
    Urgent: 1,
    High: 2,
    Medium: 3,
    Low: 4,
    'No priority': 0,
  };
  return priorityMap[input] || 0;
};
