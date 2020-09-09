export function parseDictData(allDictDataArray, searchWord) {
  let parsedArray = buildDictionaryResponse(allDictDataArray, searchWord);

  return parsedArray;
}

export function buildDictionaryResponse(data, searchWord) {
  return data.map((item) => dictParseItem(item, searchWord));
}

function dictParseItem(item, searchWord) {
  let regPattern = '^' + searchWord + '(:\\d+)?$';
  let reg = new RegExp(regPattern, 'g');
  if (item.meta.id.search(reg) > -1) {
    return {
      type: item.fl,
      values: dictParseDefs(item),
    };
  } else {
    return;
  }
}

function dictParseDefs(item) {
  return item.def.map((itemElement) => dictParseSSEQ(itemElement));
}

function dictParseSSEQ(itemElement) {
  let tempDef = itemElement.sseq.map((sseqElement) =>
    dictParseSSEQElem(sseqElement, itemElement)
  );
  return tempDef;
}

function dictParseSSEQElem(sseqElement, origE) {
  if (sseqElement.length > 1) {
    let tempBoth = sseqElement.map((subSseqElement) =>
      parseSubSSEQElem(subSseqElement)
    );
    return tempBoth;
  } else {
    let both = parseSenseElement(sseqElement[0]);
    return both;
  }
}

function parseSubSSEQElem(subSseqElement) {
  if (subSseqElement[0] === 'bs') {
    return parseSenseElement(subSseqElement);
  }

  if (subSseqElement[0] === 'pseq') {
    let both = subSseqElement.map((pseqElem) => parseAllPseq(pseqElem));
    return both;
  }
  if (subSseqElement[0] === 'sense') {
    let both = parseSenseElement(subSseqElement);
    return both;
  } else {
    let both = subSseqElement.map((pseqElem) => parseAllPseq(pseqElem));
    return both;
  }
}

function parseAllPseq(pseqElem) {
  if (pseqElem === 'pseq') {
    return;
  }
  if (pseqElem[0][0] === 'sense') {
    return pseqElem.map((pseqEndElem) => parseSenseElement(pseqEndElem));
  }

  if (Array.isArray(pseqElem) === true) {
    let both = pseqElem[1].map((longElement) => dictParseLong(longElement));
    return both;
  } else {
    let both = parseSenseElement(pseqElem);
    return both;
  }
}
function dictParseLong(longElement) {
  // debugger; //Tarvitaanko tätä koodia?
  if (longElement[0] === 'sense') {
    let result = parseSenseElement(longElement);
    return result;
  } else {
    let both = longElement[1].map((longDescExpElem) =>
      parseSenseElement(longDescExpElem)
    );
    return both;
  }
}

function parseSenseElement(endElement) {
  let example = '';
  if (endElement[0] === 'bs') {
    let desc = endElement[1].sense.dt[0][1];
    if (endElement[1].sense.dt.length > 1) {
      example = endElement[1].sense.dt[1][1].t;
    }
    return { desc, example };
  }

  let desc = endElement[1].dt[0][1];
  if (endElement[1].dt.length > 1) {
    example = endElement[1].dt[1][1].map((endExElement) =>
      mapAllExamples(endExElement)
    );
  }
  return { desc, example };
}

function mapAllExamples(endExElement) {
  return endExElement.t;
}

export function removeUndefined(data) {
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
