export const formatText = (text) => {
  let arrOfLines = [];

  let arrOfWords = text
    .replace(/\n+/g, "\n")
    .replace(/ +/g, " ")
    .trim()
    .split(" ")
    .map((word) => word.trim());

  for (let i = 0; i < arrOfWords.length; i++) {
    let word = arrOfWords[i];
    let lastLineIndex = arrOfLines.length - 1;
    let lastLine = arrOfLines[lastLineIndex];

    if (lastLine && `${lastLine} ${word}`.length <= 80) {
      let lineBreakIndex = word.indexOf("\n");

      if (lineBreakIndex !== -1) {
        const charBeforeLineBreak = word[lineBreakIndex - 1];
        // if the character before the \n is not in "?!.", it means that
        // \n is in the middle of two words and we need to get rid of it
        // like in 'is\na'
        if (!"?!.".includes(charBeforeLineBreak)) {
          word = word.replace(/\n/, " ");
        } else {
          let [wordBeforeLineBreak, wordAfterLineBreak] = word.split("\n");
          arrOfLines[lastLineIndex] = `${lastLine} ${wordBeforeLineBreak}`;
          // the word after the \n should be in a new line for a new paragraph
          arrOfLines.push(`\n${wordAfterLineBreak}`);
          continue;
        }
      }
      arrOfLines[lastLineIndex] = `${lastLine} ${word}`;
    } else {
      arrOfLines.push(`${word}`);
    }
  }

  return arrOfLines.join("\n").replace(/ +/g, " ");
};
