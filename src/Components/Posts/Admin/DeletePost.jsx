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
        return (
            <div className="container w-100 h-100" style={{ height: '100%' }}>
                <div className=" mx-auto" style={{ height: '200px', width: '200px', marginTop: '25%'}}>
                    <img src="/image/audio.svg" alt="" className="bg-danger" style={{width: "100%", borderRadius: '10px 10px'}} />
                </div>

            </div>
        )
    }
}

export default DeletePost;