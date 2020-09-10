export function cleanParsedData(data) {
  //   debugger;
  let newData = data.filter((element) => {
    return element !== undefined;
  });
  for (let i = 0; i < newData.length; i++) {
    if (newData[i].values.length === 1) {
      for (let j = 0; j < newData[i].values[0].length; j++) {
        newData[i].values.push(newData[i].values[0][j]);
      }
      newData[i].values.shift();
    }
  }
  return newData;
}

export function removeUndefined(data) {
  //   debugger;
  let firstLevels = data.length;
  for (let i = 0; i < firstLevels; i++) {
    let secondLevels = data[i].values.length;

    for (let j = 0; j < secondLevels; j++) {
      //Might not be needed
      if (data[i].values[0] === undefined) {
        data[i].values.shift();
      }
      let thirdLevels = data[i].values[j].length;

      for (let k = 0; k < thirdLevels; k++) {
        // console.log('print third level k', data[i].values[j][k]);
        //Might not be needed
        if (data[i].values[j][0] === undefined) {
          data[i].values[j].shift();
        }

        let fourthLevels = data[i].values[j][k].length;

        for (let l = 0; l < fourthLevels; l++) {
          //remove first undefined
          if (data[i].values[j][k][0] === undefined) {
            data[i].values[j][k].shift();
          }
        }
      }
    }
  }
  return data;
}

// export function removeFormatting(data) {
//   console.log(data);
//   if (data.length > 0) {
//     data.map((mainElement) => handleNextLevel(mainElement.values));
//   }
//   return data;
// }

// function handleNextLevel(parentArray) {
//   if (Array.isArray(parentArray) && parentArray.length > 0) {
//     parentArray.map((childElement) => handleNextLevel(childElement));
//   }

//   if (parentArray.desc !== undefined) {
//     console.log('Parent Array', parentArray.desc);
//     let acceptable = '({bc})|({wi})|{/wi}';
//     let regex = new RegExp(acceptable, 'g');
//     parentArray.desc = parentArray.desc.replace(regex, '');
//   }
// }
