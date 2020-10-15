import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { parseDictData } from './parseDictData';
import { PrintDictionary } from './PrintDictionary';
//import { findByLabelText } from '@testing-library/react';
import {
  cleanParsedData,
  removeUndefined,
  removeFormatting,
} from './cleanParsedData';

const createStyles = makeStyles(() => ({
  resultContainer: {
    display: 'flex',
    marginTop: '2em',
    justifyContent: 'center',
    width: '60%',
    fontFamily: 'Raleway',
  },
  dictResults: {
    width: '60em',
    display: 'flex',
  },
}));

export function SearchResults(props) {
  const myStyles = createStyles();
  const [dictResults, setDictResults] = useState([]);

  useGetDictionary(props.searchWord, setDictResults);
  //handle "no such word" situations

  if (dictResults.length > 0) {
    if (dictResults[0].meta === undefined) {
      return (
        <div className={myStyles.resultContainer}>
          Try another word please, or check the spelling
        </div>
      );
    }
    try {
      let dictData = parseDictData(dictResults, props.searchWord);
      dictData = cleanParsedData(dictData);
      dictData = removeUndefined(dictData);
      // dictData = removeFormatting(dictData);

      //JSON.stringify(data);
      console.log('dictData: ', dictData);

      return (
        <div className={myStyles.resultContainer}>
          <PrintDictionary data={dictData}></PrintDictionary>
        </div>
      );
    } catch (error) {
      return (
        <div className={myStyles.resultContainer}>
          Data structure of this word is not yet supported. Please try another
          word, e.g. "design" or "umpire"{' '}
        </div>
      );
    }
  } else {
    return (
      <div className={myStyles.resultContainer}>Nothing in dictionary</div>
    );
  }
}

function useGetDictionary(searchWord, setDictResults) {
  useEffect(() => {
    if (searchWord.length > 0) {
      fetch(
        `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${searchWord}?key=${process.env.REACT_APP_KEY_DICTIONARY}`
      )
        .then((response) => response.json())
        .then((data) => {
          setDictResults(data);
        });
    }
  }, [searchWord, setDictResults]);
  return;
}
