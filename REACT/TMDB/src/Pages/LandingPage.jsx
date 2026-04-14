import {useNavigate} from "react-router";

const Landing = () => {
    const navigate = useNavigate();
    return (
        <>
            <h2>Landing Page</h2>
            <button onClick={()=> navigate("/ResultsPage")}>Now Playing</button>
        </>
    )
}

export default Landing;