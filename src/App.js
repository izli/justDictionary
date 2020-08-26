import React, { useState } from 'react';
import { SearchResults } from './SearchResults.js';
import { SearchWord } from './SearchWord.js';
import './App.css';

function App() {
  const [searchWord, setSearchWord] = useState('');

  function onSetSearchWord(textValue) {
    setSearchWord(textValue);
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
