import React, { useEffect, useState } from 'react';

import { parseData } from './parseData';

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
  const [results, setResults] = useState([]);
  console.log('test');
  useGetThesaurus(props.searchWord, setResults);
  const data = parseData(results);
  return (
    <div>
      <div>data thesaurus: {JSON.stringify(data)}</div>
      <div>dictionary: {JSON.stringify(data)}</div>
    </div>
  );
  // return <Typography variant="body1">This is the thesaurus div</Typography>;
}
