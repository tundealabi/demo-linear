import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

function App() {
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

  // const client = new ApolloClient({
  //   link: authLink.concat(httpLink),
  //   cache: new InMemoryCache(),
  // });

  // const client = ...

  // const queryClient = () => {
  //   client
  //     .query({
  //       query: gql`
  //         query GetRates {
  //           rates(currency: "USD") {
  //             currency
  //           }
  //         }
  //       `,
  //     })
  //     .then((result) => console.log(result));
  // };

  const query = gql`
    query Query($issueId: String!) {
      issue(id: $issueId) {
        id
        title
        priority
      }
    }
  `;

  // const createSingleIssue = ({
  //   title,
  //   description,
  //   estimate,
  //   priority,
  //   labels,
  // }) => {
  //   client.mutate({
  //     mutation: gql`
  //       mutation EstimateMutation($issueCreateInput: IssueCreateInput!) {
  //         issueCreate(input: $issueCreateInput) {
  //           issue {
  //             estimate
  //             title
  //             description
  //             team {
  //               id
  //             }
  //           }
  //         }
  //       }
  //     `,
  //     variables: {
  //       issueCreateInput: {
  //         estimate: 2,
  //         title: 'Create Channel',
  //         description: 'RTC functionality',
  //         teamId: '129c3574-f0ed-48cf-bc1c-ed37f21d5889',
  //       },
  //     },
  //   });
  // };
  const { data, loading, error } = useQuery(query, {
    variables: { issueId: 'ZC-85' },
  });
  const [apiKey, setApiKey] = useState(
    'lin_api_t53C3CQvnvNuh6GD2uZ4z5Pc5pBRwfncjIah5TOm'
  );
  const handleChange = (e) => {
    console.log(e.target);
  };

  const handleSubmit = () => {
    console.log('submit');
  };
  useEffect(() => {
    console.log('data', data);
  }, []);

  return (
    <ApolloProvider>
      <div className="App">
        <h1>CSV Uploader</h1>
        <input type="file" accept=".csv" onChange={handleChange} />
        <input
          type="text"
          placeholder="Enter API Key"
          onChange={(e) => setApiKey(e.target.value)}
        />
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </ApolloProvider>
  );
}

export default App;
