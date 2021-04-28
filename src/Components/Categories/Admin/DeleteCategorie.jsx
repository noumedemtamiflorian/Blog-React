import { Component } from 'react'
import axios from "axios"
import { Redirect } from 'react-router';

class DeleteCategorie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id
        axios.delete("https://127.0.0.1:8000/api/categories/" + id)
            .then(res => {
                this.setState({
                    redirect: true
                })
            })
            .catch(error => { })
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to="/admin/categories" />
        }
        return (
            <div className="d-flex justify-content-center mt-5">
                <div>
                    <button className="btn btn-primary" type="button">
                        <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                        <span className="sr-only">Suppresion en cours...</span>
                    </button>
                    <button className="btn btn-primary" type="button">
                        <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                        Suppresion en cours...
                    </button>
                </div>
            </div>
        )
    }
}

export default DeleteCategorie;