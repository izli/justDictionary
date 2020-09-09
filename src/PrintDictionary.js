import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

export function PrintDictionary(props) {
  let allJSX = [];
  //   let returnValue = wholeForLoop(props.data);

  for (let type = 0; type < props.data.length; type++) {
    if (
      Array.isArray(props.data[type].values[0]) === false &&
      props.data[type].values.length === 1
    ) {
      allJSX.push(
        <div>
          <Typography>desc: {props.data[type].values[0].desc}</Typography>
          {props.data[type].values[0].example.length > 0 && (
            <Typography>
              example: {props.data[type].values[0].example}
            </Typography>
          )}
        </div>
      );
    } else {
      let allValuesArrays = props.data[type].values;
      let temp = valuesHasArrays(allValuesArrays, allJSX);
    }
  }

  return (
    <div>
      <div>{allJSX}</div>
      <pre>{JSON.stringify(props.data, null, 2)}</pre>
    </div>
  );
}

function valuesHasArrays(allValuesArrays, allJSX) {
  for (
    let valuesLevel = 0;
    valuesLevel < allValuesArrays.length;
    valuesLevel++
  ) {
    if (Array.isArray(allValuesArrays[valuesLevel])) {
      let subLevelArray = allValuesArrays[valuesLevel];
      let temp = handleSubArrays(subLevelArray, allJSX);
    } else {
      //No subArrays
      allJSX.push(
        <div>
          <Typography>desc: {allValuesArrays[valuesLevel].desc}</Typography>
          {allValuesArrays[valuesLevel].example.length > 0 && (
            <Typography>
              example: {allValuesArrays[valuesLevel].example}
            </Typography>
          )}
        </div>
      );
    }
  }
}

function handleSubArrays(subLevelArray, allJSX) {
  for (let subLevel = 0; subLevel < subLevelArray.length; subLevel++) {
    if (Array.isArray(subLevelArray[subLevel])) {
      let subSubLevelArray = subLevelArray[subLevel];
      let temp = handleSubSubArrays(subSubLevelArray, allJSX);
    } else {
      //No subArrays
      allJSX.push(
        <div>
          <Typography>desc: {subLevelArray[subLevel].desc}</Typography>
          {subLevelArray[subLevel].example.length > 0 && (
            <Typography>example: {subLevelArray[subLevel].example}</Typography>
          )}
        </div>
      );
    }
  }
}

function handleSubSubArrays(subSubLevelArray, allJSX) {
  for (
    let subsubLevel = 0;
    subsubLevel < subSubLevelArray.length;
    subsubLevel++
  ) {
    if (Array.isArray(subSubLevelArray[subsubLevel])) {
      let sub3LevelArray = subSubLevelArray[subsubLevel];
      let temp = handle3SubArrays(sub3LevelArray, allJSX);
    } else {
      allJSX.push(
        <div>
          <Typography>desc: {subSubLevelArray[subsubLevel].desc}</Typography>
          {subSubLevelArray[subsubLevel].example.length > 0 && (
            <Typography>
              example: {subSubLevelArray[subsubLevel].example}
            </Typography>
          )}
        </div>
      );
    }
  }
}

function handle3SubArrays(sub3LevelArray, allJSX) {
  for (let sub3Level = 0; sub3Level < sub3LevelArray.length; sub3Level++) {
    if (Array.isArray(sub3LevelArray[sub3Level])) {
      let sub4LevelArray = sub3LevelArray[sub3Level];
      //   let temp = handle3SubArrays(sub3LevelArray, allJSX);
    } else {
      allJSX.push(
        <div>
          <Typography>desc: {sub3LevelArray[sub3Level].desc}</Typography>
          {sub3LevelArray[sub3Level].example.length > 0 && (
            <Typography>
              example: {sub3LevelArray[sub3Level].example}
            </Typography>
          )}
        </div>
      );
    }
  }
}
