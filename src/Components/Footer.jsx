import React from 'react';
import { Link } from "react-router-dom";

function Footer() {
    const date = new Date();
    const curyear = date.getFullYear();

    return (
        <div>
            <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                <div className="col-md-4 d-flex align-items-center">
                    <Link to="/" class="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1"></Link>
                    <span className="text-muted">© {curyear} GoFood, Inc</span>
                </div>
            </footer>
        </div>
    )
}

export default Footer;
