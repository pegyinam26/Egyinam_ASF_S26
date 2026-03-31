import Posts from "./Posts.jsx";


const PostContainer = ({doggy}) => {
    //Array.map() returns a NEW array
    let results = doggy.map((post)=>{
        return <Posts kitty={post}/>
        }
    )
    return(
        <div style={{border: "yellow 2px solid"}}>
            <h1 >Post Container</h1>
            {results}
        </div>

    )
}

export default PostContainer;