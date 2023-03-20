import React from "react";
import { useRef, useEffect } from "react";
import { useState } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";
import "../index.css";

function Card(props) {

    // console.log(props);

    const iteam = props.iteam;
    const priceRef = useRef();

    //It contains the dispatch function
    let dispatch = useDispatchCart();
    //useCart has the value of the state
    let cartData = useCart();

    const options = props.options;
    const priceOptions = Object.keys(options);

    const [Quantity, setQuantity] = useState(1);
    const [size, setSize] = useState("");

    let finalPrice = Quantity * parseInt(options[size]);   //This is where Price is changing

    async function handleAddtoCart() {
        let food = [];

        // console.log(iteam._id);

        for (var i = 0; i < cartData.length; i++) {
            // console.log(cartData[i].id);
            if (cartData[i].id === iteam._id) {
                if(cartData[i].size === size) {
                    food = cartData[i];
                    break;
                }
            }
        }

        console.log(food);

        if (food.length !== 0) {
            console.log("Updating");
            await dispatch({ type: "UPDATE", id: food.id , size : size , price: finalPrice , qty: Quantity });
        }
        else {
            console.log("2");
            await dispatch({ type: "ADD", id: iteam._id, name: iteam.name, qty: Quantity, size: size, img: iteam.img, price: finalPrice });
        }

        // console.log(cartData);
    }

    //priceRef.current is the reference to size options
    //priceRef.current.value is the starting value of the size by deafult
    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])

    // console.log(priceRef.current);

    return (
        <div style={{"color" : "Black"}}>
            <div>
                <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "500px" }}>
                    <img className="card-img-top" src={iteam.img} style={{ height: "200px", objectFit: "fill" }} />
                    <div className="card-body" style={{ "textAlign": "center" }}>
                        <h5 className="card-title">{iteam.name}</h5>
                        <p className="card-text"></p>
                        <div className="container w-100">

                            {/* Code for the dropdown for Quantity*/}
                            <select className="m-2 h-100 bg-success rounded" onChange={(e) => setQuantity(e.target.value)} >
                                {
                                    Array.from(Array(6), function (element, index) {
                                        return (
                                            <option key={index + 1} value={index + 1} > {index + 1} </option>
                                        )
                                    })
                                }
                            </select>

                            <select className="m-2 h-100 bg-success rounded" onChange={(e) => setSize(e.target.value)} ref={priceRef}>
                                {
                                    priceOptions.map(function (data) {
                                        return (
                                            <option key={data} value={data}>
                                                {data}
                                            </option>
                                        )
                                    })
                                }
                            </select>


                            <div className="d-inline h-100 fs-5">
                                ₹{finalPrice}/-
                            </div>


                            <hr>
                            </hr>

                            <button className={'btn btn-success justify-center ms-2'} onClick={handleAddtoCart}>Add to Cart</button>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card;