import {
  gql,
  createHttpLink,
  ApolloClient,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

export const apiKey = process.env.REACT_APP_LINEAR_API_KEY;
const httpLink = createHttpLink({ uri: 'https://api.linear.app/graphql' });
const authLink = setContext((_, { headers }) => {
  return { headers: { ...headers, authorization: apiKey } };
});
export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// ----------------------------------------
// QUERY
export const fetchIssueDetails = gql`
  query FindIssueDetails($issueId: String!) {
    issue(id: $issueId) {
      id
      title
      priority
      labels {
        nodes {
          id
          name
        }
      }
      creator {
        name
      }
      completedAt
      project {
        id
        name
      }
    }
  }
`;

export const fetchProjectDetails = gql`
  query FindProjectDetails {
    projects {
      nodes {
        id
        name
        members {
          nodes {
            email
            name
          }
        }
        creator {
          name
        }
      }
    }
  }
`;

export const fetchLabels = gql`
  query FindIssueLabels {
    issueLabels {
      nodes {
        name
        id
      }
    }
  }
`;

// ----------------------------------------
// MUTATIONS
export const createIssue = gql`
  mutation CreateIssue($issueCreateInput: IssueCreateInput!) {
    issueCreate(input: $issueCreateInput) {
      issue {
        title
        estimate
        description
        priority
        team {
          id
        }
        labels {
          nodes {
            id
          }
        }
      }
    }
  }
`;

export const updateLabel = gql`
  mutation IssueLabelMutation($issueLabelCreateInput: IssueLabelCreateInput!) {
    issueLabelCreate(input: $issueLabelCreateInput) {
      issueLabel {
        name
      }
    }
  }
`;
