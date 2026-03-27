// test('Jest is working', () => {
//   expect( 1 + 1).toBe(2);
// });

//first red-green test phase
const isPalindrome= require('../src/isPalindrome');

describe("isPalindrome", () => {
    describe("Valid Inputs -> empty string", () => {
        //first red-green test phase
        test('returns false for an empty string', () =>{
            expect(isPalindrome("")).toBe(false);
        });
        //second red-green test phase
        test("Valid Inputs -> non-string inputs",() => {
            expect(isPalindrome(123)).toBe(false);
            expect(isPalindrome({})).toBe(false);
            expect(isPalindrome(true)).toBe(false);
            expect(isPalindrome([])).toBe(false);
            expect(isPalindrome(null)).toBe(false);
            expect(isPalindrome(undefined)).toBe(false);
        })
    });
    describe("Outlier handling", () => {
        //third red-green test phase
        test('removes all punctuations and spaces in non-strings', () => {
            expect(isPalindrome("!!??.,,;: \n\t")).toBe(false);
        });
        //fourth red-green test phase
        test('removes all punctuations and spaces in non-palindrome strings or sentences', () => {
            expect(isPalindrome("!!!Apple??,,,\n")).toBe(false);
        });
        //fifth red-green test phase
        test('removes all punctuations and spaces in palindrome strings or sentences', () => {
            expect(isPalindrome("!!!Bob RaceCar bob??,,,\n")).toBe(true);
        });
    });
    describe("Final Checks", () => {
        test('final checks-finish longest word', ()=> {
            expect(isPalindrome("saippuakivikauppias")).toBe(true);
        });
        test('final checks-from latin', ()=> {
            expect(isPalindrome("Sator arepo tenet opera rotas")).toBe(true);
        });
        test('final checks-from latin', ()=> {
            expect(isPalindrome("Do nine men interpret? “Nine men,” I nod.")).toBe(true);
        });
        test('final checks-very long example', ()=> {
            expect(isPalindrome("Dennis, Nell, Edna, Leon, Nedra, Anita, Rolf, Nora, Alice, Carol, Leo, Jane, Reed, Dena, Dale, Basil, Rae, Penny, Lana, Dave, Denny, Lena, Ida, Bernadette, Ben, Ray, Lila, Nina, Jo, Ira, Mara, Sara, Mario, Jan, Ina, Lily, Arne, Bette, Dan, Reba, Diane, Lynn, Ed, Eva, Dana, Lynne, Pearl, Isabel, Ada, Ned, Dee, Rena, Joel, Lora, Cecil, Aaron, Flora, Tina, Arden, Noel, and Ellen sinned.")).toBe(true);
        });

    });

});