import { Switch, BrowserRouter, Route } from 'react-router-dom'
import App from '../App'
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import Show from './Posts/Show'
import AddPost from './Posts/Admin/AddPost'
import Posts from './Posts/Admin/Posts'
import UpdatePost from './Posts/Admin/UpdatePost'
import DeletePost from './Posts/Admin/DeletePost'
import Categories from './Categories/Categories'
const Main = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/"><App /></Route>
                <Route exact path="/posts/:id"><Show /></Route>
                <Route path="/posts/categorie/:id" component={Categories}></Route>

                {/* Route d'administration  pour les articles */}
                <Route exact path="/admin">< Posts /></Route>
                <Route path="/admin/post/add">< AddPost /></Route>
                <Route path="/admin/post/:id/edit" component={UpdatePost}></Route>
                <Route path="/admin/post/:id/delete" component={DeletePost}></Route>
            </Switch>
        </BrowserRouter>
    )
}
export default Main;