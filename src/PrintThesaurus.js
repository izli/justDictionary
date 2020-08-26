import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const createStyles = makeStyles(() => ({
  descListItem: {
    display: 'flex',
    color: 'green',
    flexDirection: 'column',
  },
  descContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  allDesc: { color: 'blue' },
}));

export function PrintThesaurus(props) {
  const myStyles = createStyles();

  if (props.data.length > 0) {
    let allDesc = [];
    for (let i = 0; i < props.data[0].values.length; i++) {
      let allSyns = [];
      for (let j = 0; j < props.data[0].values[i].syns.length; j++) {
        allSyns.push(
          <Typography component={'span'} variant="body2">
            the second row {props.data[0].values[i].syns[j]}
          </Typography>
        );
      }
      console.log('all syns', { allSyns });
      allDesc.push(
        <Typography
          component={'span'}
          variant="body1"
          className={myStyles.descListItem}
        >
          Description {i}: {props.data[0].values[i].desc}
          <div>{allSyns}</div>
        </Typography>
      );
    }

    return (
      <div className={myStyles.descContainer}>
        <div>First desc: {props.data[0].values[0].desc}</div>
        <div className={myStyles.allDesc}>All descriptions {allDesc}</div>
      </div>
    );
  }
  return <div>Nothing here</div>;
}
