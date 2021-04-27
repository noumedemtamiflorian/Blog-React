import axios from "axios";
import React from "react"
import { Redirect } from "react-router";
import HeaderAdmin from "../../Header/HeaderAdmin";

class UpdateCategorie extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categorie: {
                title: ''
            },
            redirect: false
            , id: this.props.match.params.id
        }
    }

    componentDidMount() {
        const id = this.state.id
        axios.get('https://127.0.0.1:8000/api/categories/' + id)
            .then(res => {
                this.setState({ categorie: res.data })
            }).then(error => {
            })
    }
    handleChange = event => {
        let categorieTemp = this.state.categorie
        categorieTemp[event.target.name] = event.target.value
        this.setState({
            categorie: categorieTemp
        })
    }

    handleSubmit = (event) => {
        const id = this.state.id
        axios.put("https://127.0.0.1:8000/api/categories/" + id, this.state.categorie)
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
            return <Redirect to="/admin/categories" />
        }
        return (
            <div>
                <HeaderAdmin />
                <div className="row">
                    <div className="col-6 mx-auto">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="title">Titre</label>
                                <input type="text" name="title" id="title" value={this.state.categorie.title} onChange={this.handleChange} className="form-control" />
                            </div>
                            <button type="submit" className="btn btn-primary">Modifier</button>
                        </form>
                    </div>
                </div>
            </div>

        )
    }
}
export default UpdateCategorie;