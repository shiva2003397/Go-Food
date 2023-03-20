import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import { useState } from "react";
import Modal from "../Modal";
import Cart from "../Screens/Cart";
import { useDispatchCart, useCart } from "../Components/ContextReducer";

function Navbar() {

    const [cartVeiw , setCartVeiw] = useState(false);

    const navigate = useNavigate();
    function handlelogout() {
        localStorage.removeItem("authToken")
        navigate("/login")
    }

    let data = useCart();

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-success position-sticky"
                style={{ boxShadow: "0px 10px 20px black", filter: 'blur(20)', position: "fixed", zIndex: "10", width: "100%" }}>
                <div className="container-fluid">
                    <Link className="navbar-brand fs-1 fst-italic" to="/">GoFood</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link fs-5 mx-3 active" aria-current="page" to="/">Home</Link>  {/* index.css - nav-link color white */}
                            </li>
                            {(localStorage.getItem("authToken")) ?
                                <li className="nav-item">
                                    <Link className="nav-link fs-5 mx-3 active" aria-current="page" to="/myOrder" >My Orders</Link>  {/* index.css - nav-link color white */}
                                </li> : ""}
                        </ul>
                        {(!localStorage.getItem("authToken")) ?
                            <form className="d-flex">
                                <Link className="btn bg-white text-success mx-1 " to="/login">Login</Link>
                                <Link className="btn bg-white text-success mx-1" to="/createuser">Signup</Link>
                            </form> :

                            <div>
                                <div className="btn bg-white text-success mx-2" onClick={() => setCartVeiw(true)}>
                                    My Cart {" "}
                                    <Badge pill bg="danger" >
                                        {
                                            data.length !== 0 ? data.length : ""
                                        }
                                    </Badge>
                                </div>
                                {cartVeiw ? <Modal onClose={() => setCartVeiw(false)}> <Cart /> </Modal> : null}
                                <button className="btn bg-white text-danger" onClick={handlelogout}>Logout</button>
                            </div>
                        }
                    </div>
                </div>
            </nav >
        </div >
    )
}


export default Navbar