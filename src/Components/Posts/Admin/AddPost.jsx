import axios from "axios";
import React from "react"
import { Redirect } from "react-router";
import HeaderAdmin from "../../Header/HeaderAdmin";

class AddPost extends React.Component {
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
        }
    }
    componentDidMount() {
        axios.get("https://127.0.0.1:8000/api/categories")
            .then(res => {
                let postTemp = this.state.post
                postTemp.categorie = res.data['hydra:member'][0]['@id']
                this.setState({
                    categories: res.data['hydra:member'],
                    post: postTemp
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

    RegisterData(post) {
        axios.post("https://127.0.0.1:8000/api/articles", post)
            .then(res => {
                this.setState({
                    redirect: true
                })
             })
            .catch(error => { })
    }
    handleSubmit = (event) => {
        if (this.state.file !== null) {
            const formData = new FormData();
            formData.append('file', this.state.post.image);
            formData.append('upload_preset', 'f9dkjbxa')
            axios.post('https://api.cloudinary.com/v1_1/noumedemtamiflorian/image/upload', formData)
                .then(res => {
                    let postTemp = this.state.post
                    postTemp.image = res.data.url
                    this.setState({
                        post: postTemp
                    })
                    this.RegisterData(this.state.post)
                }).catch(erreur => { 
                    console.log(erreur);
                });
        }
        else {
            this.RegisterData(this.state.post)
        }
        console.log(this.state.post);
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
                                <input required type="text" name="title" id="title" value={this.state.post.title} onChange={this.handleChange} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <input required type="text" name="description" id="description" value={this.state.post.description} onChange={this.handleChange} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="categorie">Categorie</label>
                                <select className="form-control" name="categorie" id="categorie" onChange={this.handleChange}>
                                    {
                                        this.state.categories.map((value, index) => {
                                            return (<option key={index} value={value['@id']}>{value.title}</option>)
                                        })
                                    }
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="image" >Image</label>
                                <input className="form-control" type="file" name="image" id="image" onChange={this.handleChange} />
                            </div>
                            {
                                this.state.file !== null &&
                                <img src={this.state.file} alt="" style={{ width: '20%' }} />
                            }
                            <div className="form-group">
                                <label htmlFor="content">Contenu</label>
                                <textarea required className="form-control" name="content" rows="8" value={this.state.post.content} onChange={this.handleChange}>

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
export default AddPost;