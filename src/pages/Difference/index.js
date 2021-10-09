import { useState } from 'react';
import { parseCsv } from '../../utils/csvparser';
import { combineArrays } from '../../utils/helpers';

const Diff = () => {
  const [sourceFile, setsourceFile] = useState(null);
  const [sourceFilePresent, setsourceFilePresent] = useState(false);
  const [diffFile, setdiffFile] = useState(null);
  const [diffFilePresent, setdiffFilePresent] = useState(false);
  const [teamId, setTeamId] = useState('2b95fea9-a09c-4189-b694-0301fa99e674');
  const [sourceFileDetails, setsourceFileDetails] = useState([]);
  const [diffFileDetails, setdiffFileDetails] = useState([]);

  const [sourceFileSubmitted, setsourceFileSubmitted] = useState(false);
  const [diffFileSubmitted, setdiffFileSubmitted] = useState(false);

  const submitSourceCSVHandler = () => {
    const { body, header } = sourceFile;
    const NewObject = body.map(item => {
      const modifiedItem = combineArrays(header, item);

      // modifiedItem.Title = `${modifiedItem.ID} - ${
      //   modifiedItem.Title ? modifiedItem.Title.trim() : 'NO TITLE'
      // }`;

      return modifiedItem;
    });
    console.log('source', NewObject[0]);
    setsourceFileDetails(NewObject);
    setsourceFileSubmitted(true);
  };

  const handleSourceChange = e => {
    setsourceFilePresent(
      typeof e.target.files[0] !== 'undefined' ? true : false,
    );
    const reader = new FileReader();
    reader.addEventListener('load', function (e) {
      setsourceFile(parseCsv(e.target.result));
    });
    reader.readAsBinaryString(e.target.files[0]);
  };

  const submitdiffCSVHandler = () => {
    const { body, header } = diffFile;
    const NewObject = body.map(item => {
      const modifiedItem = combineArrays(header, item);

      modifiedItem.Title = `${modifiedItem.ID} - ${
        modifiedItem.Title ? modifiedItem.Title.trim() : 'NO TITLE'
      }`;

      return modifiedItem;
    });
    console.log('diff', NewObject[4]);
    setdiffFileDetails(NewObject);
    setdiffFileSubmitted(true);
  };

  const handlediffChange = e => {
    setdiffFilePresent(typeof e.target.files[0] !== 'undefined' ? true : false);
    const reader = new FileReader();
    reader.addEventListener('load', function (e) {
      setdiffFile(parseCsv(e.target.result));
    });
    reader.readAsBinaryString(e.target.files[0]);
  };

  const differentiateHandler = () => {
    // sourceFileDetails diffFileDetails
    const comparer = otherArray => {
      return current => {
        return (
          otherArray.filter(function (other) {
            return other.Title === current.Title;
          }).length === 0
        );
      };
    };

    var onlyInA = sourceFileDetails.filter(comparer(diffFileDetails));
    var onlyInB = diffFileDetails.filter(comparer(sourceFileDetails));

    const difference = onlyInB.filter(
      n => !onlyInA.map(b => b.Title).includes(n.Title),
    );

    const removeIDRegex = /^(ZC-\d{5}.*-.)/gim;
    const formattedDifference = difference.map(item => {
      item.Title = item.Title.replace(removeIDRegex, '');
      return item;
    });

    // TODO
    // please refactor me !!!!

    console.log(formattedDifference);
  };

  return (
    <div className="App">
      <h1>CSV Uploader</h1>
      <a href="https://api.linear.app/graphql">
        <h2>For Linear App api</h2>
        <h2>For Linear App api | Differentiate</h2>
      </a>

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

      <br />
      <br />

      <div>
        <label>
          Source CSV FILE {` `}
          <input type="file" accept=".csv" onChange={handleSourceChange} />
        </label>

        <button
          type="submit"
          onClick={submitSourceCSVHandler}
          disabled={!sourceFilePresent}
        >
          Submit Source
        </button>
      </div>

      <br />

      <div>
        <label>
          Diff CSV FILE {` `}
          <input type="file" accept=".csv" onChange={handlediffChange} />
        </label>

        <button
          type="submit"
          onClick={submitdiffCSVHandler}
          disabled={!diffFilePresent}
        >
          Submit Source
        </button>
      </div>

      <br />

      <button
        type="submit"
        onClick={differentiateHandler}
        disabled={!sourceFileSubmitted && !diffFileSubmitted}
      >
        Submit Source
      </button>

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

export default Diff;
