//Valid Inputs test-empty string
// function isPalindrome(text) {
//     return text !== "";
// }

//Valid Inputs test-non string inputs
// function isPalindrome(text) {
//     if (text === "") return false;
//     if (typeof text !== "string") return false;
//     return true;
// }


//Outlier handling - punctuations and spaces removal in non-string inputs
// function isPalindrome(text) {
//     if (text === "") return false;
//     if (typeof text !== "string") return false;
//     const newtext = text.replaceAll(/[^\w\s+]|_/g,"");
//     if (newtext.trim() === "") return false;
//     return true;
// }

//Outlier handling - removing punctuations and spaces in non-palindrome strings or sentences and in palindrome strings and sentences, ensuring case-insensitivity in the process
function isPalindrome(text) {
    if (text === "") return false;
    if (typeof text !== "string") return false;
    const newtext = text.replaceAll(/[^\w\s+]|_/g,'');
    if (newtext.trim() === "") return false;

    //check for palindrome after cleaning
    const polishedText = newtext.trim().toLowerCase().replaceAll(/[^a-z0-9]|_[^\w\s+]/g, '');
    const reversedPolishedText = polishedText.split('').reverse().join('');
    if(polishedText !== reversedPolishedText) return false;
    return true;
}

module.exports = isPalindrome;