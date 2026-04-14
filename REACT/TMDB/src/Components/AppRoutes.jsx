import {Routes, Route, Navigate} from "react-router-dom";
import LandingPage from "../Pages/LandingPage.jsx";
import ErrorsPage from "../Pages/ErrorsPage.jsx";
import ResultsPage from "../Pages/ResultsPage.jsx";



const AppRoutes = () => {

    return(
        <Routes>
            <Route path="/" element={<Navigate to="/LandingPage"/>}/>
            <Route path="/LandingPage" element={<LandingPage/>}/>
            <Route path="/ErrorsPage" element={<ErrorsPage/>}/>
            <Route path="/ResultsPage" element={<ResultsPage/>}/>
        </Routes>
    )
}

export default AppRoutes;