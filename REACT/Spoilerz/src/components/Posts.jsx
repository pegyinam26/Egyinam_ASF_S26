import Replies from "./Replies.jsx";



const Posts = ({kitty}) => {
    let {src, alt, date, content} = kitty
    return(
        <div style={{border: "maroon 2px solid"}}>
            <img src={src} alt={alt}/>
            <p>Date:{date}</p>
            <p>POST CONTENT:{content}</p>

            <div>
                <button>like</button>
                <button>delete</button>
            </div>
            <div>
                {<button>Reply</button>}
            </div>
            {/*<div>*/}
            {/*    <Replies />*/}
            {/*    <Replies />*/}
            {/*    <Replies />*/}
            {/*</div>*/}

        </div>


    )
}

export default Posts;