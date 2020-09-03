export function parseThesData(allThesDataArray, searchWord) {
  let parsedThesData = buildThesaurusResponse(allThesDataArray, searchWord);
  return parsedThesData;
}

function buildThesaurusResponse(data, searchWord) {
  return data.map((item) => useCorrectItems(item, searchWord));
}

function useCorrectItems(item, searchWord) {
  let regPattern = '^' + searchWord + '(:\\d+)?$';
  let reg = new RegExp(regPattern, 'g');
  if (item.meta.id.search(reg) > -1) {
    return {
      type: item.fl,
      values: item.def[0].sseq.map((value) => thesParseValues(value, item)),
    };
  } else return;
}

function thesParseValues(value, item) {
  return {
    desc: thesParseDescription(value),
    example: thesParseExample(value),
    syns: thesParseSyns(value, item),
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

function thesParseSyns(value, item) {
  // console.log('ID', item.meta.id);
  // console.log('value', value);
  // console.log('syn list', value[0][1]);
  if ('syn_list' in value[0][1]) {
    return value[0][1].syn_list[0].map((syn) => syn.wd);
  } else return;
}

function thesParseRelated(value) {
  if ('rel_list' in value[0][1]) {
    return value[0][1].rel_list;
  } else return;
}
