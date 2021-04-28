import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { Pagination } from "antd"
import './App.css';
import 'antd/dist/antd.css';
import Header from './Components/Header/Header';
import Posts from './Components/Posts/Posts';
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      categories: [],
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
    // Consommation De l'API REST avec la methode GET numero 1
    axios.get("https://localhost:8000/api/articles")
      .then(res => {
        let donnes = res.data['hydra:member']
        this.setState({
          posts: donnes.slice(0,this.state.eltPage),
          data: donnes
        })
      }).catch()
    axios.get("https://127.0.0.1:8000/api/categories")
      .then(res => {
        let donnes = res.data['hydra:member']
        donnes = donnes.filter((value)=>{
          return value.articles.length>1
        })
        this.setState({
          categories: donnes
        })
      }).catch()
  }


  render() {
    return (
      <div>
        <Header />
        <main className="row">
          <article className="col-sm-7 col-md-8 col-lg-9 col-xl-10">
            <Posts posts={this.state.posts} />
          </article>
          <div id="categories" className="col-sm-5 col-md-4  col-lg-3 col-xl-2">
            <h1 className="text-center">Categories</h1>
            <div className="list-group mr-4">
              {
                this.state.categories.map(({ title, id  }) => {
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

export default App;
