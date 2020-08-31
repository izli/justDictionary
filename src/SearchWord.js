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

function userEntersText(event, setTextValue) {
  setTextValue(event.target.value);
}

function searchWord(onSetSearchWord, textValue, setTextValue) {
  // console.log('this is the textvalue: ', textValue);
  onSetSearchWord(textValue);
}

export function SearchWord(props) {
  const myStyles = createStyles();
  const [textValue, setTextValue] = useState('');
  return (
    <div className={myStyles.searchWordContainer}>
      <TextField
        onChange={(event) => userEntersText(event, setTextValue)}
        value={textValue}
      ></TextField>
      <Button
        color="primary"
        variant="contained"
        className={myStyles.buttonStyle}
        onClick={() =>
          searchWord(props.onSetSearchWord, textValue, setTextValue)
        }
      >
        Search word
      </Button>
    </div>
  );
}
