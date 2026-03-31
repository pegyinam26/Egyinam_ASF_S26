import {useState} from "react"

//user types in input
//clicks a button to see password
//clicks button to hide password


const App = () =>{
  //useState returns an array of two elements
  //first element is the actual variable with an initial value
  //second element is function that changes state
  const [inputType, setInputType] = useState(false)

  const handleClick=(event) =>{
    event.preventDefault();
    let result= !inputType
    setInputType(result)
    console.log("Clicked!!!")
  }

  return(
      <>
      <h1> I am the App Comp of State</h1>
        <form action="">
          <label htmlFor="">Password:
            <input type={inputType ? "text" : "password"}/>
          </label>
          <button onClick={handleClick}>Show/Hide</button>
        </form>
      </>
  )
}

export default App;