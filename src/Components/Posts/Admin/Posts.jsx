import axios from 'axios';
import { Component } from 'react'
import { Link } from 'react-router-dom';
import HeaderAdmin from '../../Header/HeaderAdmin';
class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logements: [{}]
        }
    }
    componentDidMount() {
        axios.get("https://127.0.0.1:8000/api/articles")
            .then(res => {
                this.setState({
                    logements: res.data['hydra:member']
                })
            })
            .catch()
    }
    render() {
        return (
            <div>
                <HeaderAdmin/>
                <div className="container">
                    <table className="table table-borderless text-center table-hover table-striped ">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.logements.map(({ id, title, description }, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{title}</td>
                                            <td>{description}</td>
                                            <td className="d-flex">
                                                <Link to={`/admin/post/${id}/edit`}><span className="btn btn-primary mr-4">Modifier</span> </Link>
                                                <Link to={`/admin/post/${id}/delete`}><span className="btn btn-danger">Supprimer</span> </Link>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div >
            </div>

        )
    }

}
export default Posts;