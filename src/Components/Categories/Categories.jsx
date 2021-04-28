import axios from 'axios';
import { Component } from 'react'
import { Pagination } from "antd"
import Header from '../Header/Header';
import Posts from '../Posts/Posts';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';

class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            categories: [],
            id: this.props.match.params.id,
            categorie: { title: '' },
            eltPage: 9,
            pageCurrent: 1,
            data: []
        }
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
    componentDidMount() {
        const id = this.state.id;
        axios.get("https://localhost:8000/api/categories/" + id)
            .then(res => {
                this.setState({
                    categorie: res.data,
                    posts: res.data.articles.slice(0, this.state.eltPage),
                    data: res.data.articles
                })
            }).catch()
        axios.get("https://127.0.0.1:8000/api/categories")
            .then(res => {
                let donnes = res.data['hydra:member']
                this.setState({
                    categories: donnes
                })
                console.log(donnes);
            }).catch()
    }

    render() {
        return (
            <div>
                <Header />
                <h1 className="text-center"> Articles pour la categorie {this.state.categorie.title}</h1>
                <main className="row">
                    <article className="col-10  m-auto">
                        <Posts posts={this.state.posts} />
                    </article>
                    <div id="categories" className="col-sm-5 col-md-4  col-lg-3 col-xl-2">
                        <h1 className="text-center">Categories</h1>
                        <div className="list-group mr-4">
                            {
                                this.state.categories.map(({ title, id }, index) => {
                                    return <Link key={id} to={"/posts/categorie/" + id}><span id={id} className="list-group-item list-group-item-action">{title}</span></Link>
                                })
                            }
                        </div>
                    </div>
                </main>
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
export default Categories;