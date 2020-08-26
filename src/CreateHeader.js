import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const createStyles = makeStyles(() => ({
  headerBg: {
    height: '3em',
    backgroundColor: '#002f6c',
    width: '100%',
    color: 'white',
  },
}));

export function CreateHeader() {
  const myStyles = createStyles();
  return <div className={myStyles.headerBg}></div>;
}
