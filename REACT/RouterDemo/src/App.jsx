import Home from "./pages/homepage.jsx";
import About from "./pages/about.jsx";
import Contact from "./pages/contact.jsx";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";


const App = () => {
  return (
      <>
          <Router>
            <div>
                <div>
                    <ul>
                        <li><Link to="/home">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                    {/*/!*<h1 style={{border: "purple 5x solid"}}>I am the App Component</h1>*!/*/}
                    {/*<Home />*/}
                    {/*<Contact />*/}
                    {/*<About />*/}
                    <Routes>
                        <Route path="/home" element={<Home/>} />
                        <Route path="/about" element={<About/>} />
                        <Route path="/contact" element={<Contact/>} />
                    </Routes>

                </div>
            </div>
          </Router>
      </>

  )
}

export default App;