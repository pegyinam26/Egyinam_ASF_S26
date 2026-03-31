import {NavBar} from "./components/NavBar.jsx";
import BlogPage from "./pages/BlogPage";

const App = () => {
  return (
      <>
        <NavBar />
        <h1 style={{border: "purple 5x solid"}}>I am the App Component</h1>
          <BlogPage />
      </>

  )
}

export default App;