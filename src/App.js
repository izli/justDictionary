import React, { useState } from 'react';
import { SearchResults } from './SearchResults.js';
import { SearchButton } from './SearchButton.js';
// import { createMuiTheme } from 'material-ui/core/styles';
// import { MuiThemeProvider } from 'material-ui/styles';

// const theme = createMuiTheme({
//   typography: {
//     subtitle1: {
//       fontSize: 12,
//     },
//     body1: {
//       fontWeight: 500,
//     },
//     button: {
//       fontStyle: 'italic',
//     },
//   },
// });

function App() {
  const [searchWord, setSearchWord] = useState('');

  // function onSetSearchWord(textValue) {
  //   setSearchWord(textValue);
  //   // setSearchWord('design'); //remove this when not needed anymore
  // }

  return (
    <div className="App">
      {/* <CreateHeader /> */}
      <SearchButton setSearchWord={setSearchWord} />
      <SearchResults searchWord={searchWord} />
    </div>
  );
}

export default App;
