import axios from "axios";
import React from "react"
import { Redirect } from "react-router";
import HeaderAdmin from "../../Header/HeaderAdmin";

class UpdatePost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            post: {
                title: '',
                description: '',
                content: '',
                image: '',
                categorie: ''
            },
            categories: [{}],
            file: null,
            redirect: false
            , id: this.props.match.params.id,
            idCategorie: null
        }
    }

    componentDidMount() {
        const id = this.state.id
        axios.get('https://127.0.0.1:8000/api/articles/' + id)
            .then(res => {
                console.log(res.data);
                this.setState({ post: res.data, idCategorie: res.data.categorie })
            }).then(error => {
            })
        axios.get("https://127.0.0.1:8000/api/categories")
            .then(res => {
                this.setState({
                    categories: res.data['hydra:member']
                })
            })
            .catch()
    }
    handleChange = event => {
        let postTemp = this.state.post
        if (event.target.name === "image") {
            postTemp[event.target.name] = event.target.files[0]
            this.setState({ file: URL.createObjectURL(event.target.files[0]) })
        } else {
            postTemp[event.target.name] = event.target.value
        }
        this.setState({
            post: postTemp
        })
    }

    handleSubmit = (event) => {
        const id = this.state.id
        axios.put("https://127.0.0.1:8000/api/articles/" + id, this.state.post)
            .then(res => {
                this.setState({
                    redirect: true
                })
            })
            .catch(error => {
            })
        event.preventDefault()
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to="/admin" />
        }
        return (
            <div>
                <HeaderAdmin />
                <div className="row">
                    <div className="col-6 mx-auto">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="title">Titre</label>
                                <input type="text" name="title" id="title" value={this.state.post.title} onChange={this.handleChange} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <input type="text" name="description" id="description" value={this.state.post.description} onChange={this.handleChange} className="form-control" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="categorie">Categorie</label>
                                <select className="form-control" name="categorie" id="categorie" onChange={this.handleChange}>
                                    {
                                        this.state.categories.map((value, index) => {
                                            return (<option key={index} selected={value['@id'] === this.state.idCategorie ? true : false} value={value['@id']}>{value.title}</option>)
                                        })
                                    }
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="image" >Image</label>
                                <input className="form-control" type="file" name="image" id="image" onChange={this.handleChange} />
                            </div>
                            {
                                this.state.file !== null ?
                                    <img src={this.state.file} alt="" style={{ width: '20%' }} /> :
                                    <img src={this.state.post.image} alt="" style={{ width: '20%' }} />
                            }
                            <div className="form-group">
                                <label htmlFor="content">Contenu</label>
                                <textarea className="form-control" name="content" id="content" value={this.state.post.content} onChange={this.handleChange} rows={10}>
                                </textarea>
                            </div>
                            <button type="submit" className="btn btn-primary">Enregistrer</button>
                        </form>
                    </div>
                </div>
            </div>

        )
    }
}
export default UpdatePost;