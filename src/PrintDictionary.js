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
  tempContainerVal: {
    marginTop: '32px',
    marginBottom: '32px',
  },
  tempContainerSub: {
    marginTop: '32px',
    marginBottom: '32px',
  },
  tempContainerSubSub: {
    marginTop: '32px',
    marginBottom: '32px',
  },
  tempContainer3Sub: {
    marginTop: '32px',
    marginBottom: '32px',
  },
}));

export function PrintDictionary(props) {
  const myStyles = createStyles();

  for (let typeVal = 0; typeVal < props.data.length; typeVal++) {
    if (
      Array.isArray(props.data[typeVal].values[0]) === false &&
      props.data[typeVal].values.length === 1
    ) {
      let isFirst = handleSn(props.data[typeVal].values, 0);
      return (
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
      // debugger;
      let allValuesArrays = props.data[typeVal].values;
      let allRes = valuesHasArrays(allValuesArrays, myStyles);
      return <div>{allRes}</div>;
    }
  }
}

function valuesHasArrays(allValuesArrays, myStyles) {
  // debugger;
  let valResAr = [];
  for (
    let valuesLevel = 0;
    valuesLevel < allValuesArrays.length;
    valuesLevel++
  ) {
    if (Array.isArray(allValuesArrays[valuesLevel])) {
      let subLevelArray = allValuesArrays[valuesLevel];
      let subArRes = handleSubArrays(subLevelArray, myStyles);
      valResAr.push(
        <div className={myStyles.tempContainerVal}>{subArRes}</div>
      );
    } else {
      //No subArrays
      let isFirst = handleSn(allValuesArrays, valuesLevel);
      valResAr.push(
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
  return valResAr;
}

function handleSubArrays(subLevelArray, myStyles) {
  let subArRes = [];
  for (let subLevel = 0; subLevel < subLevelArray.length; subLevel++) {
    if (Array.isArray(subLevelArray[subLevel])) {
      let subSubLevelArray = subLevelArray[subLevel];
      let subSubRes = handleSubSubArrays(subSubLevelArray, myStyles);
      subArRes.push(
        <div className={myStyles.tempContainerSub}>{subSubRes}</div>
      );
    } else {
      //No subArrays
      let isFirst = handleSn(subLevelArray, subLevel);
      subArRes.push(
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
  return subArRes;
}

function handleSubSubArrays(subSubLevelArray, myStyles) {
  let subSubResAr = [];
  for (
    let subsubLevel = 0;
    subsubLevel < subSubLevelArray.length;
    subsubLevel++
  ) {
    if (Array.isArray(subSubLevelArray[subsubLevel])) {
      let sub3LevelArray = subSubLevelArray[subsubLevel];
      let sub3Res = handle3SubArrays(sub3LevelArray, myStyles);
      subSubResAr.push(
        <div className={myStyles.tempContainerSubSub}>{sub3Res}</div>
      );
    } else {
      let isFirst = handleSn(subSubLevelArray, subsubLevel);
      subSubResAr.push(
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
  return subSubResAr;
}

function handle3SubArrays(sub3LevelArray, myStyles) {
  let sub3ArResAr = [];
  for (let sub3Level = 0; sub3Level < sub3LevelArray.length; sub3Level++) {
    if (Array.isArray(sub3LevelArray[sub3Level])) {
      console.log('TOO DEEP!');
      return <div>TOO DEEP</div>;
    } else {
      let isFirst = handleSn(sub3LevelArray, sub3Level);
      sub3ArResAr.push(
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
  return sub3ArResAr;
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
