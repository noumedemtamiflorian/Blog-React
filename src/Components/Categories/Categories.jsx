import { Component } from 'react'
class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            id: this.props.match.params.id
        }
    }
    render() {
        return (
            <div>

            </div>
        )
    }
}
export default Categories;