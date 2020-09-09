import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { parseDictData } from './parseDictData';
import { PrintDictionary } from './PrintDictionary';
//import { findByLabelText } from '@testing-library/react';
import { cleanParsedData, removeUndefined } from './cleanParsedData';

const createStyles = makeStyles(() => ({
  resultContainer: {
    display: 'flex',
    marginTop: '2em',
  },
  subContainer: {
    flexBasis: '0',
    flexGrow: '1',
    width: '100%',
    display: 'flex',
    paddingLeft: '1em',
    paddingRight: '1em',
    flexWrap: 'wrap',
  },
}));

export function useGetDictionary(searchWord, setDictResults) {
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

export function SearchResults(props) {
  const myStyles = createStyles();
  const [dictResults, setDictResults] = useState([]);

  useGetDictionary(props.searchWord, setDictResults);
  if (dictResults.length > 0) {
    let dictData = parseDictData(dictResults, props.searchWord);
    dictData = cleanParsedData(dictData);
    dictData = removeUndefined(dictData);

    //JSON.stringify(data);
    console.log('dictData: ', dictData);

    return (
      <div className={myStyles.resultContainer}>
        <PrintDictionary data={dictData}></PrintDictionary>
      </div>
    );
  } else {
    return (
      <div className={myStyles.resultContainer}>Nothing in dictionary</div>
    );
  }
  // return <Typography variant="body1">This is the thesaurus div</Typography>;

  /* 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Section 1.10.32 of de Finibus Bonorum et Malorum, written by Cicero in 45 BC Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?';*/
}
