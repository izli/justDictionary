import React, { useState } from 'react';
import { SearchResults } from './SearchResults.js';
import { SearchButton } from './SearchButton.js';
import { makeStyles } from '@material-ui/core/styles';

const createStyles = makeStyles(() => ({
  classApp: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    display: 'flex',
    marginTop: '2em',
    marginBottom: '2em',
    justifyContent: 'center',
    width: '60%',
    fontFamily: 'Monteserrat',
    fontSize: '16px',
  },
}));
function App() {
  const myStyles = createStyles();
  const [searchWord, setSearchWord] = useState('');

  // function onSetSearchWord(textValue) {
  //   setSearchWord(textValue);
  //   // setSearchWord('design'); //remove this when not needed anymore
  // }

  return (
    <div className={myStyles.classApp}>
      {/* <CreateHeader /> */}
      <div className={myStyles.header}>
        This is a dictionary app using Merriam-Webster's api. Their data
        structure is somewhat complicated so unfortunately not all words work
        yet.
      </div>
      <SearchButton setSearchWord={setSearchWord} />
      <SearchResults searchWord={searchWord} />
    </div>
  );
}

export default App;
