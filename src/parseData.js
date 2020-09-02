export function parseThesData(allDataArray) {
  let array2 = allDataArray.map((element1) => ({
    type: element1.fl,
    values: element1.def[0].sseq.map((element2) => ({
      desc: element2[0][1].dt[0][1],
      example: element2[0][1].dt[1][1][0].t,
      syns: element2[0][1].syn_list[0].map((syn1) => syn1.wd),
      rel: element2[0][1].rel_list,
    })),
  }));

  return array2;
}

export function parseDictData(allDictDataArray, searchWord) {
  // debugger;
  let tempArray = buildDictionaryResponse(allDictDataArray, searchWord);
  return tempArray;
}

export function buildDictionaryResponse(data, searchWord) {
  return data.map((item) => dictParseItem(item, searchWord));
}

function dictParseItem(item, searchWord) {
  let regPattern = '^' + searchWord + ':?\\b';
  let reg = new RegExp(regPattern, 'g');
  if (item.meta.id.search(reg) > -1) {
    return {
      definitions: item.def[0].sseq.map((definition) =>
        dictParseDefinitionText(definition)
      ),
      explanations: item.def[0].sseq.map((definition) =>
        dictParseExplanationText(definition)
      ),
    };
  } else return;
}

function dictParseDefinitionText(definition) {
  // debugger;
  let tempDef = definition[0][1].dt[0][1];
  return tempDef;
}

function dictParseExplanationText(definition) {
  // debugger;
  if (definition[0][1].dt.length > 1) {
    let tempExp = definition[0][1].dt[1][1][0].t;
    let tempT = tempExp.t;
    // debugger;
    return tempExp;
  }
  return;
}
/*
SYNS
  data[0].values[0].syns[0].wd
  "arrangement"

RELS
  data[0].values[0].rel[0][0].wd
  produces: "collusion"

  data[0].values[0].rel[0][1].wd
  produces: "conspiracy"

  etc.

  if (array2.length > 0) {
    console.log('array1: ', array1);
    console.log('array2: ', array2);
    onSetParsedArray(array2);
  }
  */
//   return (
//     <div>
//       <div>you searched for: {props.searchWord}</div>
//       <div>all data array length: {array2.length}</div>
//       <ul>
//         {array2.map((item) => {
//           return <li key="abc">{item.length}</li>;
//         })}
//       </ul>
//     </div>
//   );
