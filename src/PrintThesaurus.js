import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const createStyles = makeStyles(() => ({
  description: {
    display: 'flex',
    color: 'green',
    flexDirection: 'row',
    paddingLeft: '8px',
  },
  descContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  allDesc: { color: 'blue' },

  synItem: {
    display: 'flex',
    paddingLeft: '8px',
    paddingRight: '8px',
  },
  synList: {
    flexDirection: 'row',
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: '16px',
  },
}));

export function PrintThesaurus(props) {
  const myStyles = createStyles();

  if (props.data.length > 0) {
    let allDesc = [];
    for (let i = 0; i < props.data[0].values.length; i++) {
      let allSyns = [];
      for (let j = 0; j < props.data[0].values[i].syns.length; j++) {
        allSyns.push(
          <Typography variant="body2" className={myStyles.synItem}>
            {props.data[0].values[i].syns[j]}
          </Typography>
        );
      }
      console.log('all syns', { allSyns });
      allDesc.push(
        <div>
          <Typography
            component={'span'}
            variant="body1"
            className={myStyles.description}
          >
            Description {i}: {props.data[0].values[i].desc}
          </Typography>
          <div className={myStyles.synList}>{allSyns}</div>
        </div>
      );
    }

    return (
      <div className={myStyles.descContainer}>
        <Typography variant="h5">Type: {props.data[0].type}</Typography>
        <div className={myStyles.allDesc}>{allDesc}</div>
      </div>
    );
  }
  return <div>Nothing here</div>;
}

//LOOP FOR NOUNS - row 42->
/*
    FLAT()q
    const allDesc = props.data[0].values.map((element1) => 
        
        const allSyns = element1.syns.map((element2) => 
            <Typography variant="body2" className={myStyles.synItem}>
                {props.data[0].values[i].syns[j]}
            </Typography>)

        <div className={myStyles.descContainer}>
          <Typography
            component={'span'}
            variant="body1"
            className={myStyles.descText}
          >
            Description {i}: {props.data[0].values[i].desc}
          </Typography>
          <Typography>Example: {props.data[0].values[i].example}</Typography>
          <div>
            <Typography variant="body1" className={myStyles.subHeader}>
              Synonyms
            </Typography>
            <div className={myStyles.synList}>{allSyns}</div>
          </div>
        </div>
        
        )
    */
