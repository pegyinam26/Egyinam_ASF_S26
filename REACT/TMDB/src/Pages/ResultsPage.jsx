import {useEffect, useState} from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


const Results = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_TOKEN}`
                }
            };

            fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
                .then(res => res.json())
                .then(parsedResponse => {
                    console.log(parsedResponse.results)
                    setMovies(parsedResponse.results)
                })
                .catch(err => console.error(err));
        }, [])

    let displayMovies = movies.map(el =>{
        return(
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                    <Card.Title>{el.title}</Card.Title>
                    <Card.Text>
                       Plot: {el.overview}
                    </Card.Text>
                    <Card.Text>
                       Average Vote Count: {el.vote_average}
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
        )
    })

    return (
        <>
            <h2>Results Page</h2>
            {/*when this loads, we want to see ALL now playing movies */}
            {/*need http request for movies*/}
            {/*build cards from imported components*/}

            {displayMovies}

        </>
    )
}

export default Results;