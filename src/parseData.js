export function parseThesData(allThesDataArray, searchWord) {
  let parsedThesData = buildThesaurusResponse(allThesDataArray, searchWord);
  return parsedThesData;
}

function buildThesaurusResponse(data, searchWord) {
  return data.map((item) => ({
    type: item.fl,
    values: item.def[0].sseq.map((value) => thesParseValues(value)),
  }));
}

function thesParseValues(value) {
  return {
    desc: thesParseDescription(value),
    example: thesParseExample(value),
    syns: thesParseSyns(value),
    rels: thesParseRelated(value),
  };
}

function thesParseDescription(value) {
  return value[0][1].dt[0][1];
}

function thesParseExample(value) {
  if (value[0][1].dt.length > 1) {
    return value[0][1].dt[1][1][0].t;
  }
}

function thesParseSyns(value) {
  return value[0][1].syn_list[0].map((syn) => syn.wd);
}

function thesParseRelated(value) {
  return value[0][1].rel_list;
}

export function parseDictData(allDictDataArray, searchWord) {
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
      type: item.fl,
      values: dictParseValues(item),
    };
  } else return;
}

function dictParseValues(item) {
  return item.def.map((element1) => dictParseDefs(element1));
}

function dictParseDefs(element) {
  // debugger;
  let tempDef = element.sseq.map((element3) => dictParseDesc(element3));
  return tempDef;
}

function dictParseDesc(element) {
  let desc = element[0][1].dt[0][1];
  let example = '';
  if (element[0][1].dt.length > 1) {
    example = element[0][1].dt[1][1][0].t;
  }

  return { desc, example };
}
