import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';

export function useGetWord(props) {
  const [temp, setTemp] = useState([]);

  useEffect(() => {
    fetch(
      `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${props.searchTerm}?key=${process.env.REACT_APP_KEY_THESAURUS}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTemp(data[0]);
      });
  }, [props.searchTerm]);

  return temp;
}

export function GetWords(props) {
  const wordArray = useGetWord(props.searchTerm);
  console.log(wordArray);
  return <Typography variant="h1">hello</Typography>;
}
