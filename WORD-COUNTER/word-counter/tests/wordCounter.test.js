
// test('Jest is working', () => {
//   expect(1+1).toBe(2);
// });

//first red-green test phase passes as it returns 0 for an empty string
const wordCounter = require('../src/wordCounter');

describe("wordCounter", () => { 
  describe("Basic Counting", () => { 
        test('returns 0 for an empty string', () => {
          expect(wordCounter("")).toBe(0);
        });
        
        //second red-green test phase passes as it returns 1 for a single word
        test('returns 1 for a single word', () => {
          expect(wordCounter("hello")).toBe(1);
        });
        
        //third red-green test phase passes as it returns 2 for two words
        test('returns 2 for two words', () =>{
          expect(wordCounter("hello world")).toBe(2);
        });
  });
  describe("WhiteSpace handling", () => { 
        //fourth red-green test phase
        test('ignores leading spaces', () => {
          expect(wordCounter(" hello")).toBe(1);
        });
        test('ignores trailing spaces', () => {
          expect(wordCounter("hello ")).toBe(1);
        });
        test('handles multiple interior spaces as one operator', () => {
          expect(wordCounter("hello  world")).toBe(2);
        })
        //fifth red-green test phase
        test('returns 0 for whitespace-only string', () => {
          expect(wordCounter("   ")).toBe(0);
        });
        
        test('returns 0 for whitespace with tabs/newlines', () => {
          expect(wordCounter(" \n\t  ")).toBe(0);
        });
  });
  describe("Invalid inputs", () => { 
        // Notice how we’re grouping several related checks (non-string inputs) inside one test.
        // This keeps the suite shorter and shows a “category” of behavior all at once.
        // In larger projects, you might split them into separate tests for more detailed error reporting.
        // For teaching and quick feedback, grouping them here is perfectly fine.
        test('handles non-string input gracefully', () => {
          expect(wordCounter(123)).toBe(0);
          expect(wordCounter(null)).toBe(0);
          expect(wordCounter(undefined)).toBe(0);
          expect(wordCounter({})).toBe(0);
        });
        
        //sixth red-green test phase, ignoring all punctuation strings
        test('removes all punctuations in punctuation-only strings', () => {
          expect(wordCounter("!!??.,,;:")).toBe(0);
        });
        
        test('removes all punctuations in punctuation-worded strings where punctuations are not attached to the words',() => {
          expect(wordCounter("Hello !, World !! _")).toBe(2);
        });
  });

});


