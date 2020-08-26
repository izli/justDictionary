export function parseData(allDataArray) {
  //let array1 = allDataArray;
  console.log(allDataArray);
  let array2 = allDataArray.map((element1) => ({
    type: element1.fl,
    values: element1.def[0].sseq.map((element2) => ({
      desc: element2[0][1].dt[0][1],
      syns: element2[0][1].syn_list[0].map((syn1) => syn1),
      rel: element2[0][1].rel_list,
    })),
  }));

  return array2;
  /*
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
}
