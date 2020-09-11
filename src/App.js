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
      <SearchButton setSearchWord={setSearchWord} />
      <SearchResults searchWord={searchWord} />
    </div>
  );
}

export default App;
