import React, { useState } from 'react';
import { GetWords } from './GetWord.js';
import { CreateHeader } from './CreateHeader.js';
import './App.css';

function App() {
  // const [responseArray, setResponseArray] = useState([]);

  return (
    <div className="App">
      <CreateHeader />
      <GetWords
        searchTerm={'design'}
        // setResponseArray={setResponseArray}
      ></GetWords>
    </div>
  );
}

export default App;
