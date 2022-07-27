import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

function NavBar(){
    // const [isActive, setIsActive] = useState(true)
    return(
        <div className="navBar">
            <NavLink
                to="/"
                exact="true"
                className="titleStyle"
            >
                Jessica's Sundaes
            </NavLink>
            <NavLink
                to="/shakes"
                exact="true"
                className="link"
                activeStyle={{
                background: "white",
                }}
            >
            Shakes
            </NavLink>
            <NavLink
                to="/sundaes"
                exact="true"
                className="link"
                activeStyle={{
                    background: "white",
                }}
            >
            Sundaes 
            </NavLink>
            <NavLink
                to="/"
                exact="true"
                className="link"
                activestyle={{
                background: "white",
                }}
            >
            Home
            </NavLink>
        </div>
    )
}

export default NavBar;
