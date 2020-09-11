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
    // marginTop: '16px',
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
  subContainer: {
    marginBottom: '32px',
  },
  subSubContainer: {
    marginBottom: '32px',
  },
  // sub3Container: {
  //   marginBottom: '32px',
  // },
}));

export function PrintDictionary(props) {
  const myStyles = createStyles();
  let allValuesArray = [];
  debugger;
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
      // let allRes = valuesHasArrays(props.data[typeVal].values, myStyles);
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
    // debugger;
  }
  // debugger;
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
      //No subArrays
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

// function valuesHasArrays(allValuesArrays, myStyles) {
//   // debugger;
//   let valResAr = [];
//   for (
//     let valuesLevel = 0;
//     valuesLevel < allValuesArrays.length;
//     valuesLevel++
//   ) {
//     if (Array.isArray(allValuesArrays[valuesLevel])) {
//       let subLevelArray = allValuesArrays[valuesLevel];
//       let subArRes = handleSubArrays(subLevelArray, myStyles);
//       valResAr.push(<div className={myStyles.containerVal}>{subArRes}</div>);
//     } else {
//       //No subArrays
//       let isFirst = handleSn(allValuesArrays, valuesLevel);
//       valResAr.push(
//         <div className={myStyles.descExContainer}>
//           <Typography
//             className={isFirst ? myStyles.descLevel1 : myStyles.descLevel2}
//           >
//             {allValuesArrays[valuesLevel].desc}
//           </Typography>
//           {allValuesArrays[valuesLevel].example.length > 0 && (
//             <Typography
//               className={isFirst ? myStyles.exampleLv1 : myStyles.exampleLv2}
//             >
//               {allValuesArrays[valuesLevel].example}
//             </Typography>
//           )}
//         </div>
//       );
//     }
//   }
//   // debugger;
//   return valResAr;
// }

// function handleSubArrays(subLevelArray, myStyles) {
//   let subArRes = [];
//   for (let subLevel = 0; subLevel < subLevelArray.length; subLevel++) {
//     if (Array.isArray(subLevelArray[subLevel])) {
//       let subSubLevelArray = subLevelArray[subLevel];
//       let subSubRes = handleSubSubArrays(subSubLevelArray, myStyles);
//       subArRes.push(<div className={myStyles.subContainer}>{subSubRes}</div>);
//     } else {
//       //No subArrays
//       let isFirst = handleSn(subLevelArray, subLevel);
//       subArRes.push(
//         <div className={myStyles.descExContainer}>
//           <Typography
//             className={isFirst ? myStyles.descLevel1 : myStyles.descLevel2}
//           >
//             {subLevelArray[subLevel].desc}
//           </Typography>
//           {subLevelArray[subLevel].example.length > 0 && (
//             <Typography
//               className={isFirst ? myStyles.exampleLv1 : myStyles.exampleLv2}
//             >
//               {subLevelArray[subLevel].example}
//             </Typography>
//           )}
//         </div>
//       );
//     }
//   }
//   // debugger;
//   return subArRes;
// }

// function handleSubSubArrays(subSubLevelArray, myStyles) {
//   let subSubResAr = [];
//   for (
//     let subsubLevel = 0;
//     subsubLevel < subSubLevelArray.length;
//     subsubLevel++
//   ) {
//     if (Array.isArray(subSubLevelArray[subsubLevel])) {
//       let sub3LevelArray = subSubLevelArray[subsubLevel];
//       let sub3Res = handle3SubArrays(sub3LevelArray, myStyles);
//       subSubResAr.push(
//         <div className={myStyles.subSubContainer}>{sub3Res}</div>
//       );
//     } else {
//       let isFirst = handleSn(subSubLevelArray, subsubLevel);
//       subSubResAr.push(
//         <div className={myStyles.descExContainer}>
//           <Typography
//             className={isFirst ? myStyles.descLevel1 : myStyles.descLevel2}
//           >
//             {subSubLevelArray[subsubLevel].desc}
//           </Typography>
//           {subSubLevelArray[subsubLevel].example.length > 0 && (
//             <Typography
//               className={isFirst ? myStyles.exampleLv1 : myStyles.exampleLv2}
//             >
//               {subSubLevelArray[subsubLevel].example}
//             </Typography>
//           )}
//         </div>
//       );
//     }
//   }
//   // debugger;
//   return subSubResAr;
// }

// function handle3SubArrays(sub3LevelArray, myStyles) {
//   let sub3ArResAr = [];
//   for (let sub3Level = 0; sub3Level < sub3LevelArray.length; sub3Level++) {
//     if (Array.isArray(sub3LevelArray[sub3Level])) {
//       console.log('TOO DEEP!');
//       debugger;
//       return <div>TOO DEEP</div>;
//     } else {
//       let isFirst = handleSn(sub3LevelArray, sub3Level);
//       sub3ArResAr.push(
//         <div className={myStyles.descExContainer}>
//           <Typography
//             className={isFirst ? myStyles.descLevel1 : myStyles.descLevel2}
//           >
//             {sub3LevelArray[sub3Level].desc}
//           </Typography>
//           {sub3LevelArray[sub3Level].example.length > 1 && (
//             <Typography
//               className={isFirst ? myStyles.exampleLv1 : myStyles.exampleLv2}
//             >
//               {sub3LevelArray[sub3Level].example}
//             </Typography>
//           )}
//         </div>
//       );
//     }
//   }
//   return sub3ArResAr;
// }

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
