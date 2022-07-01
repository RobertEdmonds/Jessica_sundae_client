import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

function NavBar(){
    // const [isActive, setIsActive] = useState(true)
    return(
        <div className="navBar">
            <NavLink
                to="/"
                exact
                className="titleStyle"
            >
                Jessica's Sundaes
            </NavLink>
            <NavLink
                to="/customer_favorite"
                exact
                className="link"
                activeStyle={{
                background: "white",
                }}
            >
            Customer Favorite
            </NavLink>
            <NavLink
                to="/shakes"
                exact
                className="link"
                activeStyle={{
                    background: "white",
                }}
            >
            Shakes
            </NavLink>
            <NavLink
                to="/sundaes"
                exact
                className="link"
                activeStyle={{
                    background: "white",
                }}
            >
            Sundaes 
            </NavLink>
            <NavLink
                to="/"
                exact
                className="link"
                activeStyle={{
                background: "white",
                }}
            >
            Home
            </NavLink>
        </div>
    )
}

export default NavBar;
