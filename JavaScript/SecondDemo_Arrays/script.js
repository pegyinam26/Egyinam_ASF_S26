let txt = "banana"
console.log(txt)
txt.length
console.log(txt.length)
let txt1 = "    I like oranges.                                   "
console.log(txt1)
console.log(txt1.length)
console.log(txt1.trim())

let words = 'I love talking to animals.';
let result = words.slice(7, 14);//start at index 7 and go to index 14 and capture up to index 13
console.log(result)

let test = "This is a Bunch of rAndom WoRds!"
let result1 = test.toLowerCase()
let result2 = test.toUpperCase()
console.log(result1 + " " + result2)

let result3 = test.substring(10, 15)
console.log(result3)

//working on ARRAYS
let animals = ["dog", "cat", "mouse"]
console.log(animals)

//4 ways to alter an array by adding/deleting first elements
//append means = add to end
//prepend means = add to beginning

animals.push("cat2")
console.log(animals)

//to get rid of last element use pop()
animals.pop()
let result5 = animals.pop()
console.log(result5)
animals.push("mouse")
//unshift and shift on Arrays
animals.unshift("cat2")
console.log(animals)
animals.shift()
console.log(animals)

//new array
let houses = ["doghouse", "scratching post","cage"]
//animals.push(houses)
//console.log(animals)

//using spread operator to fetch just the elements
let newArray = [...animals,...houses]
console.log(newArray)

//iterating through an array
//forEach()
newArray.forEach(
    //uses a predicate called data, can be any name
    function(data){
    console.log(data + "'s")
})

//iterate an array another way is map()
//difference between forEach() and map(), map() return a NEW array!!!
let colors = ["red", "green", "blue"]
let result6=colors.map(function(data){
    return data + "'s "
})
console.log(result6)
console.log(result6.length)

for(let i=0; i< result6.length;i++){
    console.log(result6[i])
}

result6.slice(1, result6.length-1)
console.log(result6)

//filtering aka filter()
//returns a new array only the matching conditions
let word = ["cat", "house" , "mouse","grouse"]
let result7 = word.filter(function(kitty){
        return kitty.length > 4
    }
)
console.log(result7)

result7 = word.filter(function(kitty){
        return kitty.slice(1, kitty.length)==="ouse"
    }
)
console.log(result7)