import React from 'react';
// import { v4 as uuidv4 } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const createStyles = makeStyles(() => ({
  typeContainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: '8px',
  },
  allDesc: { color: 'blue' },

  descContainer: {},
  descText: {
    display: 'flex',
    color: 'green',
    flexDirection: 'row',
  },

  synList: {
    flexDirection: 'row',
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: '16px',
  },
  synItem: {
    display: 'flex',
    paddingRight: '8px',
  },
  subHeader: {
    color: 'orange',
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
      allDesc.push(
        <div className={myStyles.descContainer}>
          <Typography
            component={'span'}
            variant="body1"
            className={myStyles.descText}
          >
            Description {i + 1}: {props.data[0].values[i].desc}
          </Typography>
          <Typography>Example: {props.data[0].values[i].example}</Typography>
          <div>
            <Typography variant="body1" className={myStyles.subHeader}>
              Synonyms
            </Typography>
            <div className={myStyles.synList}>{allSyns}</div>
          </div>
        </div>
      );
    }

    //LOOP FOR VERBS

    return (
      <div className={myStyles.typeContainer}>
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
