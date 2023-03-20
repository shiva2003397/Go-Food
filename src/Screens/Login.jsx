import React from 'react';
import { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import Navbar from '../Components/Navbar';

function Login() {

    let navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    })


    function handleChange(event) {
        const name = event.target.name;
        const prevcredentials = credentials;
        const newvalue = event.target.value;

        if (name === "email") {
            setCredentials({
                email: newvalue,
                password: prevcredentials.password,
            })
        }
        else {
            setCredentials({
                email: prevcredentials.email,
                password: newvalue,
            })
        }
    }


    //Connecting our backend from the frontend
    async function handleSubmit(event) {

        event.preventDefault();

        console.log(credentials);

        // We are hitting the end-point in the backend
        const response = await fetch("http://localhost:5000/api/loginuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });

        const json = await response.json()
        console.log(json);


        // Note that despite the method being named json(), the result is not JSON 
        // but is instead the result of taking JSON as input and parsing it to produce a JavaScript object.

        if (!json.success) {
            alert("Enter Valid Credentials!");
        }

        if(json.success) {

            //Storing the authToken in our local storage!
            // alert(credentials.email);
            localStorage.setItem("userEmail" , credentials.email);
            localStorage.setItem("authToken" , json.authToken);
            console.log(localStorage.getItem("authToken"));
            navigate("/");
        }
    }

    return (
        <div style={{backgroundImage: 'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', height: '100vh', backgroundSize: 'cover' }}>
          <div>
            <Navbar />
          </div>
          <div className='container'>
            <form className='w-50 m-auto mt-5 border bg-dark border-success rounded' onSubmit={handleSubmit}>
              <div className="m-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" name='email' value={credentials.email} onChange={handleChange} aria-describedby="emailHelp" />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone.</div>
              </div>
              <div className="m-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" value={credentials.password} onChange={handleChange} name='password' />
              </div>
              <button type="submit" className="m-3 btn btn-success">Submit</button>
              <Link to="/createuser" className="m-3 mx-1 btn btn-danger">New User</Link>
            </form>
    
          </div>
        </div>
    )
}

export default Login;
