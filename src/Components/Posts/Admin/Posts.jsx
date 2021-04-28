import 'antd/dist/antd.css';
import { Pagination } from "antd";
import axios from 'axios';
import { Component } from 'react'
import { Link } from 'react-router-dom';
import HeaderAdmin from '../../Header/HeaderAdmin';
class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [{}],
            eltPage: 9,
            pageCurrent: 1,
            data: []
        }
    }
    componentDidMount() {
        axios.get("https://127.0.0.1:8000/api/articles")
            .then(res => {
                let donnes = res.data['hydra:member']
                this.setState({
                    posts: donnes.slice(0, this.state.eltPage),
                    data: donnes
                })
            })
            .catch()
    }
    handleChange = value => {
        const { eltPage } = this.state;
        const indexOfLastLog = value * eltPage;
        const indexOfFirstLog = indexOfLastLog - eltPage;
        let data = this.state.data
        this.setState({
            currentPage: value,
            posts: data.slice(indexOfFirstLog, indexOfLastLog)
        });
    };
    render() {
        return (
            <div>
                <HeaderAdmin />
                <div className="container">
                    <div className="d-flex justify-content-end mb-5">
                        <Link to="/admin/post/add"><span className="btn btn-primary">Ajouter Un Article</span></Link>
                    </div>
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
                                this.state.posts.map(({ id, title, description }, index) => {
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
                <footer className="pagination_div">
                    <Pagination
                        defaultCurrent={this.state.pageCurrent}
                        defaultPageSize={this.state.eltPage} //default size of page
                        pageSize={this.state.eltPage}
                        onChange={this.handleChange}
                        total={/*loadingOk && */this.state.data.length > 0 && this.state.data.length} //total number of card data available
                    />
                </footer>
            </div>

        )
    }

}
export default Posts;