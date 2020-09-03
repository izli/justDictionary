export function parseDictData(allDictDataArray, searchWord) {
  let tempArray = buildDictionaryResponse(allDictDataArray, searchWord);
  return tempArray;
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
    console.log('Return null maybe, item', item);
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
  console.log('origE', origE);
  console.log('parseElement', sseqElement);
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
    debugger;
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
    // debugger;
    let both = subSseqElement.map((pseqElem) => parseAllPseq(pseqElem));
    return both;
  }
}

function parseAllPseq(pseqElem) {
  console.log('pseqElem', pseqElem);
  // debugger;
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
  debugger; //Tarvitaanko tätä koodia?
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
  // debugger;
  let example = '';
  if (endElement[0] === 'bs') {
    let desc = endElement[1].sense.dt[0][1];
    if (endElement[1].sense.dt.length > 1) {
      example = endElement[1].sense.dt[1][1].t;
    }
    return { desc, example };
  }

  let desc = endElement[1].dt[0][1];
  console.log('desc', desc);
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
