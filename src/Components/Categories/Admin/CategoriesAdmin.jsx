import axios from 'axios';
import { Component } from 'react'
import { Link } from 'react-router-dom';
import HeaderAdmin from '../../Header/HeaderAdmin';
class CategoriesAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [{}]
        }
    }
    componentDidMount() {
        axios.get("https://127.0.0.1:8000/api/categories")
            .then(res => {
                this.setState({
                    categories: res.data['hydra:member']
                })
            })
            .catch()
    }
    render() {
        return (
            <div>
                <HeaderAdmin />
                <div className="container">
                    <div className="d-flex justify-content-end mb-5">
                        <Link to="/admin/categorie/add"><span className="btn btn-primary">Ajouter Une Categories</span></Link>
                    </div>
                    <table className="table table-borderless text-center table-hover table-striped ">
                        <thead>
                            <tr>
                                <th>Numero</th>
                                <th>Title</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.categories.map(({ id, title }, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{title}</td>
                                            <td className="d-flex">
                                                <Link to={`/admin/categorie/${id}/edit`}><span className="btn btn-primary mr-4">Modifier</span> </Link>
                                                <Link to={`/admin/categorie/${id}/delete`}><span className="btn btn-danger">Supprimer</span> </Link>
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
export default CategoriesAdmin;