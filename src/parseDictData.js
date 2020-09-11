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
    let sn = endElement[1].sense.sn;
    let desc = handleDesc(endElement[1].sense.dt);
    // let desc = endElement[1].sense.dt[0][1];
    if (endElement[1].sense.dt.length > 1) {
      example = endElement[1].sense.dt[1][1].t;
    }
    return { desc, example, sn };
  }

  // let desc = endElement[1].dt[0][1];
  let desc = handleDesc(endElement[1].dt);
  let syns = handleSynonyms(endElement[1].dt);
  let sn = endElement[1].sn;
  if (endElement[1].dt.length > 1) {
    example = endElement[1].dt[1][1].map((endExElement) =>
      mapAllExamples(endExElement)
    );
  }
  return { desc, example, sn, syns };
}

function mapAllExamples(endExElement) {
  let origText = endExElement.t;
  let italicsRule = '{it}.*?}|{wi}.*?}';
  let regItalics = new RegExp(italicsRule, 'g');
  let notAccRule = '({bc})|({wi})|{/wi}|{sx.*?}|{it|/it}';
  let notAccReg = new RegExp(notAccRule, 'g');
  if (origText !== undefined) {
    let matchArr = origText.match(regItalics);
    if (matchArr.length > 0) {
      //Handle italics
      for (let i = 0; i < matchArr.length; i++) {
        let word = matchArr[i];
        let notOkReg = '({bc})|({wi})|{/wi}|{sx.*?}|{it|/it}';
        let regex = new RegExp(notOkReg, 'g');
        word = word.replace(regex, '');
        // word = word.italics(); INCLUDE THIS if you want <i>word</i>
        let parsedWord = origText.replace(regItalics, word);
        parsedWord = parsedWord.charAt(0).toUpperCase() + parsedWord.slice(1);
        return parsedWord;
      }
    }
    origText = origText.replace(notAccReg, '');
    origText = origText.charAt(0).toUpperCase() + origText.slice(1);
  } else {
    origText = '';
    return origText;
  }
}

function handleDesc(element) {
  let text = element[0][1];
  let notAcceptable = '({bc})|({wi})|{/wi}|{sx.*?}';
  let regex = new RegExp(notAcceptable, 'g');
  text = text.replace(regex, '');
  let italicizeBeginning = '({it}';
  let italicizeEnd = '{/it})';
  text = text.replace(italicizeBeginning, '[');
  text = text.replace(italicizeEnd, ']');
  text = text.charAt(0).toUpperCase() + text.slice(1);
  return text;
}

function handleSynonyms(element) {
  let notAcceptable = '{sx.*?}';
  let regex = new RegExp(notAcceptable, 'g');
  let text = element[0][1];
  let syns = text.match(regex);
  if (syns !== null) {
    let synReplace = '({sx\\|)|(\\|\\|})';
    let regex2 = new RegExp(synReplace, 'g');
    syns = syns.map((syn) => syn.replace(regex2, ''));
  } else {
    syns = [];
  }
  return syns;
}
