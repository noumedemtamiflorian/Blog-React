import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (

        <header className="d-flex justify-content-between align-items-end my-3 mx-4">
            <Link to="/"> <h1 className="text-warning" >Blog</h1></Link>
            <nav>
                <ul className="list-unstyled d-flex">
                    <li className="mr-4"><Link to="/">Articles</Link></li>
                </ul>
            </nav>
        </header>
    );
}
export default Header;