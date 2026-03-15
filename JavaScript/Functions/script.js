//arguments are values passed to a function
//parameters are variables that accept values passed to them


// => fat arrows
//let nameOfFunction = (param1, param2, etc) => {
//            return something
// }

//calling an anonymous function we use Immediately Invoked Function Expression - IIFE

let kittyCat = function(stuff, addMoreStuff){
    //do something
}
kittyCat()

let square = function(num){
    return num*num
}

console.log(square(5))

//using fat arrows

let square2 = (num)=>{
    return num*num
}

console.log(square2(6))

//if there is only one parameter, you don't need the parenthesis

let square3 = num=>num*num
console.log(square3(8))

let canYouDrink = (age = false, favDrink="Coors light") =>{
    let result9 = age ? "Congrats!!" : "Sucker!!!"
    return `You like ${favDrink}, ${result9}`
}

console.log(canYouDrink(true))
console.log(canYouDrink(undefined, "Diet Coke"))