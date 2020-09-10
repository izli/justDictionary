import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import { Typography, makeStyles } from '@material-ui/core';

const createStyles = makeStyles(() => ({
  descExContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    marginTop: '16px',
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
  },
  example: {
    display: 'flex',
    color: 'grey',
    fontFamily: 'Lato',
    fontWeight: 'light',
    fontSize: '14px',
  },
  tempContainer: {
    marginTop: '24px',
    marginBottom: '24px',
  },
}));

export function PrintDictionary(props) {
  const myStyles = createStyles();
  let allJSX = [];
  //   let returnValue = wholeForLoop(props.data);

  for (let typeVal = 0; typeVal < props.data.length; typeVal++) {
    if (
      Array.isArray(props.data[typeVal].values[0]) === false &&
      props.data[typeVal].values.length === 1
    ) {
      let isFirst = handleSn(props.data[typeVal].values, 0);
      allJSX.push(
        <div className={myStyles.descExContainer}>
          <Typography
            className={isFirst ? myStyles.descLevel1 : myStyles.descLevel2}
          >
            desc typeVal: {props.data[typeVal].values[0].desc}
          </Typography>
          {props.data[typeVal].values[0].example.length > 0 && (
            <Typography className={myStyles.example}>
              example typeVal: {props.data[typeVal].values[0].example}
            </Typography>
          )}
        </div>
      );
    } else {
      let allValuesArrays = props.data[typeVal].values;
      valuesHasArrays(allValuesArrays, allJSX, myStyles);
    }
  }

  return (
    // <div>
    //   <div>{allJSX}</div>
    //   <pre>{JSON.stringify(props.data, null, 2)}</pre>
    // </div>
    <div>{allJSX}</div>
  );
}

function valuesHasArrays(allValuesArrays, allJSX, myStyles) {
  for (
    let valuesLevel = 0;
    valuesLevel < allValuesArrays.length;
    valuesLevel++
  ) {
    if (Array.isArray(allValuesArrays[valuesLevel])) {
      let subLevelArray = allValuesArrays[valuesLevel];
      // handleSubArrays(subLevelArray, allJSX, myStyles);
      allJSX.push(
        <div className={myStyles.tempContainer}>
          {handleSubArrays(subLevelArray, allJSX, myStyles)}
        </div>
      );
    } else {
      //No subArrays
      let isFirst = handleSn(allValuesArrays, valuesLevel);
      allJSX.push(
        <div className={myStyles.descExContainer}>
          <Typography
            className={isFirst ? myStyles.descLevel1 : myStyles.descLevel2}
          >
            desc Value Level: {allValuesArrays[valuesLevel].desc}
          </Typography>
          {allValuesArrays[valuesLevel].example.length > 0 && (
            <Typography className={myStyles.example}>
              example Value Level: {allValuesArrays[valuesLevel].example}
            </Typography>
          )}
        </div>
      );
    }
  }
}

function handleSubArrays(subLevelArray, allJSX, myStyles) {
  for (let subLevel = 0; subLevel < subLevelArray.length; subLevel++) {
    if (Array.isArray(subLevelArray[subLevel])) {
      let subSubLevelArray = subLevelArray[subLevel];
      // handleSubSubArrays(subSubLevelArray, allJSX, myStyles);
      allJSX.push(
        <div className={myStyles.tempContainer}>
          THIS IS TEMP TEXT
          {handleSubSubArrays(subSubLevelArray, allJSX, myStyles)}
        </div>
      );
    } else {
      //No subArrays
      let isFirst = handleSn(subLevelArray, subLevel);
      allJSX.push(
        <div className={myStyles.descExContainer}>
          <Typography
            className={isFirst ? myStyles.descLevel1 : myStyles.descLevel2}
          >
            SubLevelDesc: {subLevel} {subLevelArray[subLevel].desc}
          </Typography>
          {subLevelArray[subLevel].example.length > 0 && (
            <Typography className={myStyles.example}>
              SubLevelEx: {subLevel} {subLevelArray[subLevel].example}
            </Typography>
          )}
        </div>
      );
    }
  }
}

function handleSubSubArrays(subSubLevelArray, allJSX, myStyles) {
  for (
    let subsubLevel = 0;
    subsubLevel < subSubLevelArray.length;
    subsubLevel++
  ) {
    if (Array.isArray(subSubLevelArray[subsubLevel])) {
      let sub3LevelArray = subSubLevelArray[subsubLevel];
      // handle3SubArrays(sub3LevelArray, allJSX, myStyles);
      allJSX.push(
        <div className={myStyles.tempContainer}>
          {handle3SubArrays(sub3LevelArray, allJSX, myStyles)}
        </div>
      );
    } else {
      let isFirst = handleSn(subSubLevelArray, subsubLevel);
      allJSX.push(
        <div className={myStyles.descExContainer}>
          <Typography
            className={isFirst ? myStyles.descLevel1 : myStyles.descLevel2}
          >
            subSubLevelDesc: {subsubLevel} {subSubLevelArray[subsubLevel].desc}
          </Typography>
          {subSubLevelArray[subsubLevel].example.length > 0 && (
            <Typography className={myStyles.example}>
              subSubLevelEx: {subsubLevel}{' '}
              {subSubLevelArray[subsubLevel].example}
            </Typography>
          )}
        </div>
      );
    }
  }
}

function handle3SubArrays(sub3LevelArray, allJSX, myStyles) {
  for (let sub3Level = 0; sub3Level < sub3LevelArray.length; sub3Level++) {
    if (Array.isArray(sub3LevelArray[sub3Level])) {
      // let sub4LevelArray = sub3LevelArray[sub3Level];
      // //   let temp = handle3SubArrays(sub3LevelArray, allJSX);
      console.log('TOO DEEP!');
      allJSX.push(<div>TOO DEEP</div>);
    } else {
      let isFirst = handleSn(sub3LevelArray, sub3Level);
      allJSX.push(
        <div className={myStyles.descExContainer}>
          <Typography
            className={isFirst ? myStyles.descLevel1 : myStyles.descLevel2}
          >
            sub3Level: {sub3Level} desc {sub3LevelArray[sub3Level].desc}
          </Typography>
          {sub3LevelArray[sub3Level].example.length > 1 && (
            <Typography className={myStyles.example}>
              example sub3Level: {sub3LevelArray[sub3Level].example}
            </Typography>
          )}
        </div>
      );
    }
  }
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
