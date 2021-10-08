import {
  gql,
  createHttpLink,
  ApolloClient,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

export const apiKey = 'lin_api_lXEAjnY1X4TTwTAcEIo4C5uEHgy2PKWXZgxBAI6g';
const httpLink = createHttpLink({ uri: 'https://api.linear.app/graphql' });
const authLink = setContext((_, { headers }) => {
  return { headers: { ...headers, authorization: apiKey } };
});
export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export const fetchIssueDetails = gql`
  query Query($issueId: String!) {
    issue(id: $issueId) {
      id
      title
      priority
      estimate
    }
  }
`;

export const createIssue = gql`
  mutation EstimateMutation($issueCreateInput: IssueCreateInput!) {
    issueCreate(input: $issueCreateInput) {
      issue {
        title
        estimate
        description
        priority
        team {
          id
        }
      }
    }
  }
`;
