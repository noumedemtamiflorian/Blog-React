import { Link } from "react-router-dom"

const Post = ({ id, title, description }) => {
    return (
        <div className="row">
            <div className="col-sm">
                <div className="card my-4" style={{ width: "18rem" }}>
                    <div className="card-body">
                        <h3 className="card-title">{title}</h3>
                        <p className="card-text">{description}</p>
                        <Link to={"/post/" + id} >Lire l'article</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Post;