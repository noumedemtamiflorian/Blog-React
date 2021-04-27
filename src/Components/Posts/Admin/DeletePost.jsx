import { Component } from 'react'
import axios from "axios"
import { Redirect } from 'react-router';

class DeletePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id
        axios.delete("https://127.0.0.1:8000/api/articles/" + id)
            .then(res => {
                this.setState({
                    redirect: true
                })
            })
            .catch(error => { })
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to="/admin" />
        }
        return <h1>Suppression de l'article en cours</h1>
    }
}

export default DeletePost;