import axios from 'axios';
import { Component } from 'react'
import { Redirect } from 'react-router';
import HeaderAdmin from '../../Header/HeaderAdmin';
class AddCategorie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categorie: {
                title: ''
            },
            redirect: false
        }
    }
    handleChange = event => {
        let categorieTemp = this.state.categorie
        categorieTemp[event.target.name] = event.target.value
        this.setState({
            categorie: categorieTemp
        })
    }
    handleSubmit = event => {
        let categorie = this.state.categorie
        axios.post("https://127.0.0.1:8000/api/categories", categorie)
            .then(res => {
                this.setState({
                    redirect: true
                })
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
                <h1 className="text-center">Ajout D'une Categorie</h1>
                <div className="col-4 m-auto">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="title">Titre</label>
                            <input type="text" name="title" id="title" value={this.state.categorie.title} onChange={this.handleChange} className="form-control" />
                        </div>
                        <button type="submit" className="btn btn-primary">Enregistrer</button>
                    </form>
                </div>


            </div>
        )
    }
}
export default AddCategorie;