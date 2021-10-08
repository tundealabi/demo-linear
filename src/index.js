import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { ApolloProvider, useQuery, gql, useMutation } from '@apollo/client';
import { client, combineArrays, mapPriority } from './utils';
import { parseCsv, readCsvFile } from './csvparser';

const App = () => {
  const [file, setFile] = useState(null);
  const [rows, setRows] = useState([]);
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
        estimate
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

  const mutateRow = gql`
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

  const { data, loading, error } = useQuery(query, {
    variables: { issueId: 'ZC-85' },
  });
  console.log('data', data);
  const [
    createLinearIssue,
    { data: mutationData, loading: loadingMutation, error: mutationError },
  ] = useMutation(mutateRow);

  const [apiKey, setApiKey] = useState(
    'lin_api_t53C3CQvnvNuh6GD2uZ4z5Pc5pBRwfncjIah5TOm'
  );
  const handleChange = (e) => {
    console.dir(e.target);
    const reader = new FileReader();
    reader.addEventListener('load', function (e) {
      setFile(parseCsv(e.target.result));
    });
    reader.readAsBinaryString(e.target.files[0]);
  };

  const handleSubmit = () => {
    console.log('file', file);
    const { body, header } = file;
    body.forEach((row) => {
      console.log('res', combineArrays(header, row));
      const { Title, Description, Estimate, Labels, Priority } = combineArrays(
        header,
        row
      );
      createLinearIssue({
        variables: {
          issueCreateInput: {
            estimate: parseInt(Estimate),
            title: Title,
            description: Description,
            teamId: '129c3574-f0ed-48cf-bc1c-ed37f21d5889',
            priority: mapPriority(Priority),
          },
        },
      });
      // setRows((prevState) => [...prevState, combineArrays(header, row)]);
    });
    console.log('rows', rows);
  };

  return (
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
  );
};

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
