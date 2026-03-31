//components
const AnimalLover = animalArray =>{

    let result = animalArray.map(data =>{
        return <li>{data}</li>
    }
    )
    return(
        <ul>
            {result}
        </ul>
    )
}

export default AnimalLover;