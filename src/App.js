import './App.css';
import { useState } from 'react';
import { combineArrays, mapPriority } from './utils/helpers';
import { parseCsv } from './utils/csvparser';
import {
  // fetchIssueDetails,
  createIssue,
} from './utils/api';
import {
  useMutation,
  //  useQuery
} from '@apollo/client';

const App = () => {
  const [file, setFile] = useState(null);
  // const [apiKey, setApiKey] = useState(
  //   'lin_api_t53C3CQvnvNuh6GD2uZ4z5Pc5pBRwfncjIah5TOm',
  // );
  const [teamId, setTeamId] = useState('129c3574-f0ed-48cf-bc1c-ed37f21d5889');
  // const [issueId, setissueId] = useState('');

  // const {
  //   data: fetchdata,
  //   loading: fetchloading,
  //   // error : fetcherror
  // } = useQuery(fetchIssueDetails, {
  //   variables: { issueId },
  // });
  const [
    createLinearIssue,
    {
      data: mutatedata,
      loading: mutateloading,
      // error: mutateerror
    },
  ] = useMutation(createIssue);

  const CreateNewIssue = details => {
    const { Title, Description, Estimate, Priority } = details;

    createLinearIssue({
      variables: {
        issueCreateInput: {
          estimate: parseInt(Estimate),
          title: Title,
          description: Description,
          teamId,
          priority: mapPriority(Priority),
        },
      },
    });
    console.log(mutatedata, mutateloading);
  };
  // const FindIssueById = issueId => {
  //   const { data, loading, error } = useQuery(fetchIssueDetails, {
  //     variables: { issueId },
  //   });
  // };

  // --------------------------------------------------------------------
  const submitCSVHandler = () => {
    const { body, header } = file;
    body.forEach(row => {
      const currentRow = combineArrays(header, row);
      console.log(currentRow);
      CreateNewIssue(currentRow);
    });
  };

  const handleChange = e => {
    console.dir(e.target);
    const reader = new FileReader();
    reader.addEventListener('load', function (e) {
      setFile(parseCsv(e.target.result));
    });
    reader.readAsBinaryString(e.target.files[0]);
  };

  // const searchForIssueHandler = () => {
  //   const { data, loading } = FindIssueById(issueId);
  //   console.log(loading, data);
  // };

  return (
    <div className="App">
      <h1>CSV Uploader</h1>
      <a href="https://api.linear.app/graphql">
        <h2>For Linear App api</h2>
      </a>
      <input type="file" accept=".csv" onChange={handleChange} />
      <input
        type="text"
        placeholder="Enter Team id"
        value={teamId}
        onChange={e => setTeamId(e.target.value)}
      />
      {/* <input
        type="text"
        placeholder="Enter API Key"
        value={apiKey}
        onChange={e => setApiKey(e.target.value)}
      /> */}
      <button type="submit" onClick={submitCSVHandler}>
        Submit
      </button>

      <hr />

      {/* <input
        type="text"
        placeholder="Enter Team id"
        value={issueId}
        onChange={e => setissueId(e.target.value)}
      />
      <button type="submit" onClick={searchForIssueHandler}>
        search for Details
      </button> */}
    </div>
  );
};

export default App;
