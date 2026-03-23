export const area = (width: number, length: number):number =>{
    return width*length
}

export const perimeter = (width: number, length: number):number => {
    return (width*2)+(length*2)
}

export const FAKE_DATA=[
    {category:"lunch"},
    {category:"dinner"},
    {category:"breakfast"},
]
//filter returns a new array that contains data
export const filteredCategories=FAKE_DATA.filter(data=>{
    let userChosenOption="breakfast"
    let {category} = data;
    return category === userChosenOption
})

console.log(filteredCategories)