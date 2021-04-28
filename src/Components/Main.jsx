import { Switch, BrowserRouter, Route } from 'react-router-dom'
import App from '../App'
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import Show from './Posts/Show'
import AddPost from './Posts/Admin/AddPost'
import Posts from './Posts/Admin/Posts'
import UpdatePost from './Posts/Admin/UpdatePost'
import DeletePost from './Posts/Admin/DeletePost'
import Categories from './Categories/Categories'
import AddCategorie from './Categories/Admin/AddCategorie'
import CategoriesAdmin from './Categories/Admin/CategoriesAdmin'
import UpdateCategorie from './Categories/Admin/UpdateCategorie'
import DeleteCategorie from './Categories/Admin/DeleteCategorie'

const Main = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/"><App /></Route>
                <Route exact path="/post/:id"><Show /></Route>
                <Route path="/posts/categorie/:id" component={Categories}></Route>

                {/* Route d'administration  pour les articles */}
                <Route exact path="/admin">< Posts /></Route>
                <Route path="/admin/post/add">< AddPost /></Route>
                <Route path="/admin/post/:id/edit" component={UpdatePost}></Route>
                <Route path="/admin/post/:id/delete" component={DeletePost}></Route>


                <Route exact path="/admin/categories"><CategoriesAdmin /> </Route>
                <Route path="/admin/categorie/add">< AddCategorie /></Route>
                <Route path="/admin/categorie/:id/edit" component={UpdateCategorie}></Route>
                <Route path="/admin/categorie/:id/delete" component={DeleteCategorie}></Route>
            </Switch>
        </BrowserRouter >
    )
}
export default Main;