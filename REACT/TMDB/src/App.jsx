
import AppRoutes from "./Components/AppRoutes.jsx";
import NavBar from "./Components/NavBar.jsx";
import {BrowserRouter as Router} from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () =>{
    return(
        <>
            <Router>
                <NavBar/>
                <AppRoutes/>
            </Router>
        </>
    )
}

export default App;