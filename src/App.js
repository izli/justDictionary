import React, { useState } from 'react';
import { SearchResults } from './SearchResults.js';
import { SearchWord } from './SearchWord.js';

function App() {
  const [searchWord, setSearchWord] = useState('');

  function onSetSearchWord(textValue) {
    setSearchWord(textValue);
    // setSearchWord('design'); //remove this when not needed anymore
  }

  return (
    <div className="App">
      {/* <CreateHeader /> */}
      <SearchWord onSetSearchWord={onSetSearchWord} />
      <SearchResults searchWord={searchWord} />
    </div>
  );
}

export default App;
