import BlogHeader from "../components/BlogHeader.jsx";
import PostContainer from "../components/PostContainer.jsx";
import {CURRENT_POSTS} from "../utils/FakeData.js";

const BlogPage = () => {
    const theStyles = {
        border: "2px green solid",
        margin: "5px auto"
    }
    return(
        <div style={{border: "white 10x solid"}}>
            <h1 style={theStyles}>I am the Blog Page</h1>
            <BlogHeader />
            <PostContainer doggy={CURRENT_POSTS} />
        </div>
    )
}

export default BlogPage;