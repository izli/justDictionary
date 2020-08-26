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
    flexWrap: 'wrap',
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
  const dataTemp =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Section 1.10.32 of de Finibus Bonorum et Malorum, written by Cicero in 45 BC Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?';
  //JSON.stringify(data);
  console.log('data: ', data);

  return (
    <div className={myStyles.container}>
      <div className={myStyles.subContainer}>
        <PrintThesaurus data={data} />
      </div>

      <div className={myStyles.subContainer}>dictionary: {dataTemp}</div>
    </div>
  );
  // return <Typography variant="body1">This is the thesaurus div</Typography>;

  /* 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Section 1.10.32 of de Finibus Bonorum et Malorum, written by Cicero in 45 BC Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?';*/
}
