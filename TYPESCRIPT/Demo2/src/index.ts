// //I have a comment here
// let dog:string = "woof"
// console.log(dog)
//
// let num: number;
// let num2: number = 3;
//
// let isMarried: boolean = false;
//
// //function
// //think about parameter data types and return values
//
// const fullname =(fname: string, lname: string): string => {
//     return `${fname} ${lname}`
// }
//
// console.log(fullname("Peter","Egyinam"))
//
// //console.log(fullname(1,"Egyinam"))
//
// //Arrays
//
// let names: string[] = ["Atlas","Ranger","Bug"]
// let newNames: Array<string> = ["ben","johnny","sue"]
// let nums: number[] = [1,2,3]
// let newNums: Array<number> = [2,3,4]
//
// console.log(names, newNames, nums, newNums)

//we are going to import due it being exported from the helpers.ts file
import {area,perimeter, filteredCategories} from "./helpers"


let result: number = area(4,5)
let result2: number = perimeter(6,7)

console.log("Area:", result)
console.log("Perimeter:", result2)
console.log(filteredCategories)