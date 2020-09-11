import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import { Typography, makeStyles } from '@material-ui/core';

const createStyles = makeStyles(() => ({
  byTypeContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '32px',
  },
  allValuesAr: {
    display: 'flex',
    flexDirection: 'column',
  },
  typeClass: {
    display: 'flex',
    paddingRight: '64px',
    fontFamily: 'Merriweather',
    fontWeight: '600',
    fontSize: '24px',
  },
  level2Container: {
    display: 'flex',
    flexDirection: 'column',
  },
  descExContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    marginBottom: '16px',
  },
  descLevel1: {
    display: 'flex',
    color: 'black',
    fontFamily: 'Raleway',
    fontSize: '16px',
  },
  descLevel2: {
    display: 'flex',
    color: 'black',
    fontSize: '14px',
    fontFamily: 'Raleway',
    marginLeft: '16px',
  },
  exampleLv1: {
    display: 'flex',
    color: 'grey',
    fontFamily: 'Lato',
    fontWeight: 'light',
    fontSize: '14px',
  },
  exampleLv2: {
    display: 'flex',
    color: 'grey',
    fontFamily: 'Lato',
    fontWeight: 'light',
    fontSize: '14px',
    marginLeft: '16px',
  },
  containerVal: {
    marginBottom: '32px',
  },
}));

export function PrintDictionary(props) {
  const myStyles = createStyles();
  let allValuesArray = [];
  for (let typeVal = 0; typeVal < props.data.length; typeVal++) {
    if (
      Array.isArray(props.data[typeVal].values[0]) === false &&
      props.data[typeVal].values.length === 1
    ) {
      let isFirst = handleSn(props.data[typeVal].values, 0);
      allValuesArray.push(
        <div className={myStyles.descExContainer}>
          <Typography
            className={isFirst ? myStyles.descLevel1 : myStyles.descLevel2}
          >
            {props.data[typeVal].values[0].desc}
          </Typography>
          {props.data[typeVal].values[0].example.length > 0 && (
            <Typography
              className={isFirst ? myStyles.exampleLv1 : myStyles.exampleLv2}
            >
              {props.data[typeVal].values[0].example}
            </Typography>
          )}
        </div>
      );
      return <div className={myStyles.allValuesAr}>{allValuesArray}</div>;
    } else {
      let allRes = recursiveHandling(props.data[typeVal].values, myStyles);
      let type = props.data[typeVal].type;
      type = type.charAt(0).toUpperCase() + type.slice(1);
      allValuesArray.push(
        <div className={myStyles.byTypeContainer}>
          <Typography className={myStyles.typeClass}>Type: {type}</Typography>
          <div className={myStyles.level2Container}>{allRes}</div>
        </div>
      );
    }
  }
  return <div className={myStyles.allValuesAr}>{allValuesArray}</div>;
}

function recursiveHandling(array, myStyles) {
  let resultArray = [];
  for (let i = 0; i < array.length; i++) {
    if (Array.isArray(array[i])) {
      let subArray = array[i];
      let subArrayRes = recursiveHandling(subArray, myStyles);
      resultArray.push(
        <div className={myStyles.containerVal}>{subArrayRes}</div>
      );
    } else {
      let isFirst = handleSn(array, i);
      resultArray.push(
        <div className={myStyles.descExContainer}>
          <Typography
            className={isFirst ? myStyles.descLevel1 : myStyles.descLevel2}
          >
            {array[i].desc}
          </Typography>
          {array[i].example.length > 0 && (
            <Typography
              className={isFirst ? myStyles.exampleLv1 : myStyles.exampleLv2}
            >
              {array[i].example}
            </Typography>
          )}
        </div>
      );
    }
  }
  return resultArray;
}

function handleSn(array, position) {
  let acceptable = 'a|^\\d$';
  let regex = new RegExp(acceptable, 'g');
  if (array[position] === undefined || array[position].sn === undefined) {
    return false;
  } else if (array[position].sn.match(regex)) {
    return true;
  }
  return false;
}
