import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import { Typography, makeStyles } from '@material-ui/core';
import {
  createMuiTheme,
  ThemeProvider,
  responsiveFontSizes,
} from '@material-ui/core/styles';

let typoTheme = createMuiTheme();
typoTheme = responsiveFontSizes(typoTheme);

let themeUI = createMuiTheme({
  display: 'flex',
  typography: {
    fontFamily: 'Raleway',
    color: 'black',
  },
});

const createStyles = makeStyles(() => ({
  byTypeContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '32px',
    width: '100%',
  },
  allValuesAr: {
    display: 'flex',
    flexDirection: 'column',
  },
  typeClass: {
    display: 'flex',
    fontFamily: 'Merriweather',
    fontWeight: '600',
    fontSize: '24px',
    marginTop: '16px',
    minWidth: '8em',
  },
  level2Container: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '0.5em',
  },
  descExContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    marginBottom: '16px',
  },
  descSnContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  descLevel1: {
    display: 'flex',
    marginTop: '16px',
    fontWeight: '500',
    flex: '1',
  },
  descLevel2: {
    display: 'flex',
    flex: '1',
  },
  exampleLv1: {
    display: 'flex',
    fontFamily: 'Lato',
    fontWeight: '300',
    color: 'grey',
    width: '100%',
    paddingLeft: '2.5em',
  },
  exampleLv2: {
    display: 'flex',
    paddingLeft: '4.5em',
    fontFamily: 'Lato',
    fontWeight: '300',
    color: 'grey',
    width: '100%',
  },
  snFirst: {
    display: 'flex',
    marginTop: '16px',
    fontWeight: '500',
    width: '2em',
  },
  sn: { display: 'flex', fontWeight: '500', width: '2em', paddingLeft: '2em' },
}));

export function PrintDictionary(props) {
  const myStyles = createStyles();
  let allValuesArray = [];
  for (let typeVal = 0; typeVal < props.data.length; typeVal++) {
    if (
      Array.isArray(props.data[typeVal].values[0]) === false &&
      props.data[typeVal].values.length === 1
    ) {
      //No subarrays
      let isFirst = checkIsFirst(props.data[typeVal].values, 0);
      let divToPush = pushContains(
        props.data[typeVal].values,
        0,
        isFirst,
        myStyles
      );
      allValuesArray.push(divToPush);
      return <div className={myStyles.allValuesAr}>{allValuesArray}</div>;
    } else {
      let allRes = recursiveHandling(props.data[typeVal].values, myStyles);
      let type = props.data[typeVal].type;
      type = type.charAt(0).toUpperCase() + type.slice(1);
      allValuesArray.push(
        <ThemeProvider theme={typoTheme}>
          <ThemeProvider theme={themeUI}>
            <div className={myStyles.byTypeContainer}>
              <Typography className={myStyles.typeClass}>
                Type: {type}
              </Typography>
              <div className={myStyles.level2Container}>{allRes}</div>
            </div>
          </ThemeProvider>
        </ThemeProvider>
      );
    }
  }
  return <div className={myStyles.allValuesAr}>{allValuesArray}</div>;
}

function recursiveHandling(array, myStyles) {
  let resultArray = [];
  for (let i = 0; i < array.length; i++) {
    let isFirst = checkIsFirst(array, i);
    if (Array.isArray(array[i])) {
      let subArray = array[i];
      let subArrayRes = recursiveHandling(subArray, myStyles);

      if (isFirst) {
        resultArray.push(
          <div className={myStyles.containerVal}>{subArrayRes}</div>
        );
      } else {
        resultArray.push(subArrayRes);
      }
    } else {
      //No subArrays
      if (isFirst) {
        let divToPush = pushContains(array, i, isFirst, myStyles);
        resultArray.push(divToPush);
      } else {
        let divToPush = pushContains(array, i, isFirst, myStyles);
        resultArray.push(divToPush);
      }
    }
  }
  return resultArray;
}

function pushContains(array, i, isFirst, myStyles) {
  return (
    <div className={myStyles.descExContainer}>
      <div className={myStyles.descSnContainer}>
        <Typography
          variant={isFirst ? 'body1' : 'body2'}
          className={isFirst ? myStyles.snFirst : myStyles.sn}
        >
          {array[i].sn}
        </Typography>
        <Typography
          // variant="body1"
          variant={isFirst ? 'body1' : 'body2'}
          className={isFirst ? myStyles.descLevel1 : myStyles.descLevel2}
        >
          {array[i].desc}
        </Typography>
      </div>
      {array[i].example.length > 0 && (
        <Typography
          variant="body2"
          className={isFirst ? myStyles.exampleLv1 : myStyles.exampleLv2}
        >
          {array[i].example}
        </Typography>
      )}
    </div>
  );
}

function checkIsFirst(array, position) {
  let acceptable = 'a|^\\d$';
  let regex = new RegExp(acceptable, 'g');
  if (array[position] === undefined || array[position].sn === undefined) {
    return false;
  } else if (array[position].sn.match(regex)) {
    return true;
  }
  return false;
}
