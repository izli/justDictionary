import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

export function PrintDictionary(props) {
  if (props.data.length > 0) {
    let dictText = [];
    let temp = props.data;
    // debugger;
    return (
      <div>
        <Typography>Dictionary printing ok</Typography>
        <pre>{JSON.stringify(props.data, null, 2)}</pre>
      </div>
    );
  }
  return <div>Nothing here!</div>;
}
