import './App.css';
import { useState } from 'react';
import {
  combineArrays,
  labelArrGenerate,
  mapPriority,
  estimateResolver,
} from './utils/helpers';
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
  const [filePresent, setFilePresent] = useState(false);
  const [wrongNameCount, setwrongNameCount] = useState(0);
  const [appendId, setappendId] = useState(true);
  const [DidNotGo, setDidNotGo] = useState([]);

  // const [apiKey, setApiKey] = useState('');
  const [teamId, setTeamId] = useState('2b95fea9-a09c-4189-b694-0301fa99e674');
  // const [issueId, setissueId] = useState('');

  // const {
  //   data: fetchdata,
  //   loading: fetchloading,
  //   // error : fetcherror
  // } = useQuery(fetchIssueDetails, {variables: { issueId }});
  // const FindIssueById = issueId => {
  //   const { data, loading, error } = useQuery(fetchIssueDetails, {
  //     variables: { issueId },
  //   });
  // };
  // const searchForIssueHandler = () => {
  //   const { data, loading } = FindIssueById(issueId);
  //   console.log(loading, data);
  // };

  const [
    createLinearIssue,
    {
      data: mutatedata,
      // loading: mutateloading,
      error: mutateerror,
    },
  ] = useMutation(createIssue);

  const CreateNewIssue = details => {
    const title = `${appendId && details.ID ? `${details.ID} - ` : ``}${details.Title ? details.Title.trim() : 'NO TITLE'
      }`;

    const description = details.Description
      ? details.Description.trim()
      : 'NO TITLE';

    const Priority = details.Priority ? details.Priority : 'No Priority';
    const Estimate = details.Estimate ? details.Estimate : 0;
    const Label = details.Label ? details.Label : [''];

    // console.log(`title: ${title}, description: ${description}}`);

    // console.table({
    //   NewPriority: mapPriority(Priority),
    //   OldPriority: Priority,
    //   NewEstimate: estimateResolver(Estimate),
    //   OldEstimate: Estimate,
    // });

    createLinearIssue({
      variables: {
        issueCreateInput: {
          title,
          description,
          teamId,
          priority: mapPriority(Priority),
          estimate: estimateResolver(Estimate),
          labelIds: labelArrGenerate(Label),
        },
      },
    });

    // console.log(mutatedata);
    if (mutateerror) {
      // setDidNotGo([...DidNotGo, details.ID]);
      console.error(`${details.ID} : ${mutateerror}`);
    }
  };

  // --------------------------------------------------------------------
  const submitCSVHandler = () => {
    const { body, header } = file;
    // console.log(body.length);

    let currentIndex = 0;
    const rowIntervals = setInterval(() => {
      pushRow(currentIndex);
      currentIndex++;
      if (currentIndex >= body.length)
        clearInterval(rowIntervals);
    }, 10)

    const pushRow = (index) => {

      console.log(index)

      const currentRow = combineArrays(header, body[index]);
      const { Title, Description } = currentRow;

      if (!mutateerror) {
        if (Title || Description) {
          // setTimeout(CreateNewIssue(currentRow), 1000);
          CreateNewIssue(currentRow);
        } else {
          setwrongNameCount(wrongNameCount + 1);
        }
      } else {
        console.error(mutateerror, `INDEX ${index}`);
      }
      console.warn(DidNotGo);

      console.warn(
        `${wrongNameCount} rows did not have a title or a description`,
      );

      // const dummyData = Array(5).fill(combineArrays(header, body[0])).map((u, i) => i);
      // // console.log(dummyData.length);
      // dummyData.forEach(row => {
      //   const currentRow = combineArrays(header, row);
      //   console.log(currentRow);
      //   // CreateNewIssue(currentRow);
      // });
    };
  }
  const handleChange = e => {
    setFilePresent(typeof e.target.files[0] !== 'undefined' ? true : false);
    // console.dir(e.target);
    const reader = new FileReader();
    reader.addEventListener('load', function (e) {
      setFile(parseCsv(e.target.result));
    });
    reader.readAsBinaryString(e.target.files[0]);
  };

  return (
    <div className="App">
      <h1>CSV Uploader</h1>
      <a href="https://api.linear.app/graphql">
        <h2>For Linear App api</h2>
      </a>
      <label>
        CSV FILE {` `}
        <input type="file" accept=".csv" onChange={handleChange} />
      </label>

      <label>
        Append Id?
        <input
          type="checkbox"
          checked={appendId}
          onChange={e => setappendId(e.target.value)}
        />
      </label>

      <br />
      <br />

      <label>
        Team id {` `}
        <input
          type="text"
          placeholder="Enter Team id"
          value={teamId}
          onChange={e => setTeamId(e.target.value)}
        />
      </label>

      <button type="submit" onClick={submitCSVHandler} disabled={!filePresent}>
        Submit
      </button>

      <br />

      {/* <label>
        <input
          type="text"
          placeholder="Enter API Key"
          value={apiKey}
          onChange={e => setApiKey(e.target.value)}
        />
      </label> */}

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
