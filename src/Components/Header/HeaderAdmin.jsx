import React from "react";
import { Link } from "react-router-dom";

const HeaderAdmin = () => {
    return (

        <header className="d-flex justify-content-between align-items-center my-3 mx-4">
            <Link to="/"> <h1 className="text-warning" >Administration</h1></Link>
            <nav>
                <ul className="list-unstyled d-flex">
                    <li className="mr-4"><Link to="/admin">Articles</Link></li>
                    <li className="mr-4"><Link to="/admin/categories">Categories</Link></li>
                    <li><Link to="/">Se deconnecter</Link></li>
                </ul>
            </nav>
        </header>
    );
}
export default HeaderAdmin;