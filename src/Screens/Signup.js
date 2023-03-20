import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";

function Signup() {

    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",
        geolocation: ""
    })


    function handleChange(event) {
        const name = event.target.name;
        const prevcredentials = credentials;
        const newvalue = event.target.value;

        if (name === "name") {
            setCredentials({
                name: newvalue,
                email: prevcredentials.email,
                password: prevcredentials.password,
                geolocation: prevcredentials.geolocation
            })
        }
        else if (name === "email") {
            setCredentials({
                name: prevcredentials.name,
                email: newvalue,
                password: prevcredentials.password,
                geolocation: prevcredentials.geolocation
            })
        }
        else if (name === "password") {
            setCredentials({
                name: prevcredentials.name,
                email: prevcredentials.email,
                password: newvalue,
                geolocation: prevcredentials.geolocation
            })
        }
        else {
            setCredentials({
                name: prevcredentials.name,
                email: prevcredentials.email,
                password: prevcredentials.password,
                geolocation: newvalue
            })
        }
    }


    //Connecting our backend from the frontend
    async function handleSubmit(event) {

        event.preventDefault();

        // console.log(credentials);

        // We are hitting the end-point in the backend
        const response = await fetch("http://localhost:5000/api/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation })
        });

        const json = await response.json()
        console.log(json);


        // Note that despite the method being named json(), the result is not JSON 
        // but is instead the result of taking JSON as input and parsing it to produce a JavaScript object.


        if (!json.success) {
            if (json.emailinUse) {
                alert("Email is Already in use , Try to Login with it!");
            }
            else {
                alert("Enter Valid Credentials!");
            }
        }
    }


    return (

        <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', backgroundSize: 'cover', height: '100vh' }}>
            <div>
                <Navbar />
            </div>
            <div className="container">
                <form className='w-50 m-auto mt-5 border bg-dark border-success rounded' onSubmit={handleSubmit}>
                    <div className="form-group m-3">
                        <label htmlfor="name">Name</label>
                        <input type="text" className="form-control" placeholder="Enter Your Name" name="name" value={credentials.name} onChange={handleChange} />
                    </div>
                    <div className="form-group m-3">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name="email" value={credentials.email} onChange={handleChange} />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group m-3">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name="password" value={credentials.password} onChange={handleChange} />
                    </div>
                    <div className="form-group m-3">
                        <label htmlFor="exampleInputPassword1">Location</label>
                        <input type="text" className="form-control" placeholder="Enter your Location" name="geolocation" value={credentials.geolocation} onChange={handleChange} />
                    </div>
                    <button type="submit" className="m-3 btn btn-success">Submit</button>
                    <Link to="/login" className="m-3 mx-1 btn btn-danger">Already a User</Link>
                </form>
            </div>
        </div>
    )
}

export default Signup;