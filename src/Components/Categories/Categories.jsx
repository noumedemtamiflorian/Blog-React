import axios from 'axios';
import { Component } from 'react'
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import Posts from '../Posts/Posts';
class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            categories: [],
            id: this.props.match.params.id,
            categorie: { title: '' }
        }
    }
    componentDidMount() {
        const id = this.state.id;
        axios.get("https://localhost:8000/api/categories/" + id)
            .then(res => {
                console.log("dd", res.data);
                this.setState({
                    categorie: res.data
                })
            }).catch()
        axios.get("https://localhost:8000/api/articles?categorie=" + id)
            .then(res => {
                let donnes = res.data['hydra:member']
                this.setState({
                    posts: donnes
                })
            }).catch()
        axios.get("https://127.0.0.1:8000/api/categories")
            .then(res => {
                console.log(res.data);
                let donnes = res.data['hydra:member']
                this.setState({
                    categories: donnes
                })
            }).catch()
    }

    render() {
        return (
            <div>
                <Header />
                <h1 className="text-center"> Article pour la categorie {this.state.categorie.title}</h1>
                <main className="row">
                    <article className="col-sm-7 col-md-8 col-lg-9 col-xl-10">
                        <Posts posts={this.state.posts} />
                    </article>
                    <div id="categories" className="col-sm-5 col-md-4  col-lg-3 col-xl-2">
                        <h1 className="text-center">Categories</h1>
                        <div className="list-group mr-4">
                            {
                                this.state.categories.map(({ title, id }, index) => {
                                    return <Link key={id} to={"/posts/categorie/" + id}><span id={id}
                                        className={"list-group-item list-group-item-action"}>{title}</span></Link>
                                })
                            }
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}
export default Categories;