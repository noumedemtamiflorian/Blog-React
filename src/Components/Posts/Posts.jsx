import Post from "./Post";

const Posts = ({ posts }) => {
    return (
        posts.map((value, index) => {
            return <Post key={index} description={value.description} categorie={value.categorie} id={value.id} title={value.title} />
        })
    )
}
export default Posts;