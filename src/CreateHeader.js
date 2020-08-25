import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles, withTheme } from '@material-ui/core/styles';

const CreateStyles = makeStyles(() => ({
  headerBg: {
    height: '3em',
    backgroundColor: '#002f6c',
    width: '100%',
    color: 'white',
  },
  root: {
    '& .MuiInputBase-root': {
      color: 'white',
    },
    '& .MuiInput-underline:before': {
      borderBottom: '2px solid white',
    },
    '& .MuiInput-underline:after': {
      borderBottom: '2px solid yellow',
    },
    '& .MuiInput-underline:hover:before': {
      borderBottom: '2px solid green',
    },
  },
}));

export function CreateHeader() {
  const myStyles = CreateStyles();
  return (
    <div className={myStyles.headerBg}>
      <div>
        <TextField classes={{ root: myStyles.root }}></TextField>
      </div>
    </div>
  );
}
