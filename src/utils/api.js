import {
  gql,
  createHttpLink,
  ApolloClient,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({ uri: 'https://api.linear.app/graphql' });
const authLink = setContext((_, { headers }) => {
  const ApiKey = sessionStorage.getItem('ApiKey');
  return { headers: { ...headers, authorization: ApiKey } };
});
export const client = () => {
  const ApiKey = sessionStorage.getItem('ApiKey');
  if (!ApiKey) {
    // throw new Error('NO API KEY');
    return 'No Key';
  }

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};

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
