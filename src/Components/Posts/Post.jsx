import { Link } from "react-router-dom"

const Post = ({ id, title, image, description }) => {
    return (
        <div className="row">
            <div className="col-sm">
                <div className="card my-4" style={{ width: "18rem" }}>
                    <div>
                        {
                            (image === ''||  image === null || typeof(image) === 'undefined' )?
                            <img src='/image/pexels-andy-vu-3244513.jpg' alt="" style={{width: '100%' }} />
                            :
                            <img src={image} alt="" style={{width: '100%' }} />
                        }
                        <h3 className="card-title my-4 ml-2">{title}</h3>
                        <p className="card-text my-4 ml-2">{description}</p>
                        <p className="text-center"><Link to={"/post/" + id} ><span className="text-white btn btn-primary"> Lire l'article</span></Link></p>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Post;