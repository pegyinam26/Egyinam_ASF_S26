//FUNCTION FOR FIRST TEST
// function wordCounter(input){  -----------------
//   if(input === "") return 0; ----------------
//   return NaN;------------------
// }------------------

//FUNCTION FOR SECOND TEST
// function wordCounter(input){------------------
//   if(input === "") return 0;------------------
//   return 1;------------------
// }------------------

//FUNCTION FOR THIRD TEST
// function wordCounter(input){------------------
//   if(input === "") return 0;------------------
//   //using single space as the delimiter
//   //chains the results to the length method
//   return input.split(" ").length;------------------
// }------------------

//FUNCTION FOR FOURTH TEST
/*function wordCounter(input){------------------*/
  // First, we "trim" the string. trim() removes spaces from the start and end.
  // Example: "   hello " becomes "hello".
  // If, after trimming, the string is completely empty, that means there are no words.
  // In that case, just return 0 right away.
  /*if(input.trim() === "") return 0;------------------*/
  // Now we actually count the words.
  // Step 1: trim() again to remove outside spaces, just to be safe.
  // Step 2: split(/\s+/) breaks the string into pieces wherever there's whitespace.
  //   - \s means "any whitespace character" (space, tab, or newline).
  //   - + means "one or more in a row", so multiple spaces are treated as a single separator.
  // Example: "hello   world" becomes ["hello", "world"].

  /*const words = input.trim().split(/\s+/);------------------*/
  // Finally, count how many items are in the array.
  // Each item represents one word, so the length of the array is our word count.
/*   return words.length;------------------*/
/* }------------------*/

// This makes the function available to other files in Node.js.
// Without this line, tests (or other files) cannot use wordCounter.



//FUNCTION FOR FIFTH TEST
/*function wordCounter(input) {------------------*/
//   // 1) Defensive check: if it's not a string, treat it as containing 0 words.
/*   if (typeof input !== "string") return 0; ------------------*/
//
//   // 2) If, after trimming, nothing is left, it's 0 words.
/*   if (input.trim() === "") return 0; ------------------*/
//
//   // 3) Split on any run of whitespace (spaces, tabs, newlines) and count tokens.
/*   const words = input.trim().split(/\s+/); ------------------*/
/*   return words.length; ------------------*/
/* } ------------------*/

//FUNCTION FOR FIFTH TEST
/*function wordCounter(input) {------------------*/
/*   if (typeof input !== "string") return 0; ------------------*/
/*   if (input.trim() === "") return 0; ------------------*/
/*   if (input.replaceAll(/[^\w]|_/g,"") === "") return 0; ------------------*/
//   /*
//   // The regex /[^\w\]|_/g matches any character that is:
//   // 1. Not a word character (\w is [A-Za-z0-9_]).
//   // 2. OR is an underscore (_).
//   // The 'g' flag ensures all occurrences are replaced (global match).
//
//    */
/*   const words = input.trim().split(/\s+/); ------------------*/
/*   return words.length; ------------------*/
/* } ------------------*/

//FUNCTION FOR SIXTH TEST
function wordCounter(input) {
  if (typeof input !== "string") return 0;
  if (input.trim() === "") return 0;
  const trimmedInput = input.replaceAll(/[^\w\s]|_/g,"");
  if (trimmedInput === "") return 0;
  /*
  // The regex /[^\w\]|_/g matches any character that is:
  // 1. Not a word character (\w is [A-Za-z0-9_]).
  // 2. OR is an underscore (_).
  // The 'g' flag ensures all occurrences are replaced (global match).

   */
  const words = trimmedInput.trim().split(/\s+/).filter(word => word.length > 0);
  //filter(word => word.length > 0) removes empty values as in any "word" in words with length greater than zero is filtered out
  return words.length;
}
module.exports = wordCounter;
