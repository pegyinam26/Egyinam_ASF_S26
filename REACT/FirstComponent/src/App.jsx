import AnimalLover from "./components/AnimalLover.jsx";
import {animals, doggy} from "./utils/data.js";

//components
const App= () => {
  return (
      <>
          <AnimalLover />
        <h1>My Component</h1>
        <AnimalLover
            data={"Keno loves animals well!!!"}
            data2={"Pierro loves cruising!!!"}
            data3={false}
            animalArray = {animals}
        />
      </>
  )
}

export default App;