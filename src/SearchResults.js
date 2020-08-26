import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { parseData } from './parseData';
import { PrintThesaurus } from './PrintThesaurus';
//import { findByLabelText } from '@testing-library/react';

const createStyles = makeStyles(() => ({
  container: {
    display: 'flex',
  },
  subContainer: {
    flexBasis: '0',
    flexGrow: '1',
    width: '100%',
    display: 'flex',
    paddingLeft: '1em',
    paddingRight: '1em',
  },
}));

export function useGetThesaurus(searchWord, setAllDataArray) {
  useEffect(() => {
    if (searchWord.length > 0) {
      fetch(
        `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${searchWord}?key=${process.env.REACT_APP_KEY_THESAURUS}`
      )
        .then((response) => response.json())
        .then((data) => {
          setAllDataArray(data);
        });
    }
  }, [searchWord, setAllDataArray]);
  return;
}

export function SearchResults(props) {
  const myStyles = createStyles();
  const [results, setResults] = useState([]);

  useGetThesaurus(props.searchWord, setResults);

  const data = parseData(results);
  console.log('data: ', data);

  return (
    <div className={myStyles.container}>
      <div className={myStyles.subContainer}>
        <PrintThesaurus data={data} />
      </div>

      <div className={myStyles.subContainer}>
        dictionary: {JSON.stringify(data)}
      </div>
    </div>
  );
  // return <Typography variant="body1">This is the thesaurus div</Typography>;
}
