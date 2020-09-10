import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

const createStyles = makeStyles(() => ({
  searchWordContainer: {
    marginTop: '2em',
    display: 'flex',
    justifyContent: 'center',
  },
  buttonStyle: {
    marginLeft: '2em',
  },
}));

// function userEntersText(event, setTextValue) {
//   setTextValue(event.target.value);
// }

// function searchWord(onSetSearchWord, textValue) {
//   // console.log('this is the textvalue: ', textValue);
//   onSetSearchWord(textValue);
// }

// function onSetSearchWord(textValue) {
//   setSearchWord(textValue);
//   // setSearchWord('design'); //remove this when not needed anymore
// }

export function SearchButton(props) {
  const myStyles = createStyles();
  const [textValue, setTextValue] = useState('');
  return (
    <div className={myStyles.searchWordContainer}>
      <TextField
        onChange={(event) => setTextValue(event.target.value)}
        value={textValue}
      ></TextField>
      <Button
        color="primary"
        variant="contained"
        className={myStyles.buttonStyle}
        onClick={() => props.setSearchWord(textValue)}
      >
        Search word
      </Button>
    </div>
  );
}
