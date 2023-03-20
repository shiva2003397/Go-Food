import React, { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import Card from "../Components/Card";

function Home() {

    const [foodCat, setFoodCat] = useState([]);
    const [foodIteam, setFoodIteam] = useState([]);

    //Here value is storing the input in the carousel
    const [value, setValue] = useState("");

    function handleChange(event) {
        setValue(event.target.value);
    }

    const loadFoodItems = async () => {
        let response = await fetch("http://localhost:5000/api/foodData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        response = await response.json();
        console.log(response);

        setFoodCat(response[1]);
        setFoodIteam(response[0]);
    }

    useEffect(() => {
        loadFoodItems()
    }, [])


    function dispalyiteams(Category) {

        // console.log(foodIteam);

        const arr = foodIteam.filter(function (iteam) {
            const iteamName = iteam.name;

            if (iteam.CategoryName === Category && iteamName.toLowerCase().includes(value.toLocaleLowerCase())) {
                // console.log(iteam);

                return true;
            }

            return false;
        })

        // console.log(Category);
        // console.log(arr);

        // <Card />

        return (
            arr.map(function (iteam) {
                return (
                    <div className="col-sm-12 col-md-6 col-lg-4">
                        <Card options={iteam.options[0]} iteam = {iteam} />
                    </div>
                )
            })
        )
    }


    return (
        <div>


            <Navbar />


            <div>
                <div>
                    <div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel">

                        <div className="carousel-inner " id='carousel'>
                            <div class=" carousel-caption  " style={{ zIndex: "9" }}>
                                <div className=" d-flex justify-content-center">
                                    <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Type in..." aria-label="Search" value={value} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="carousel-item active" >
                                <img src="https://source.unsplash.com/random/900x700/?burger" className="d-block w-100  " style={{ filter: "brightness(30%)" }} alt="..." />
                            </div>
                            <div className="carousel-item">
                                <img src="https://source.unsplash.com/random/900x700/?pastry" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
                            </div>
                            <div className="carousel-item">
                                <img src="https://source.unsplash.com/random/900x700/?barbeque" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div>


            {/* Code for rendering different Cards */}
            <div className="container">
                {
                    foodCat !== [] ?
                        foodCat.map(function (singleCat) {
                            return (

                                //Here we are iterating over all categories and will display all iteams that
                                //matches with the given category under it.
                                <div className="row mb-3">
                                    <div key={singleCat._id} className="fs-3 m-3">
                                        {singleCat.CategoryName}
                                    </div>

                                    <hr />

                                    {foodIteam !== [] ?
                                        dispalyiteams(singleCat.CategoryName)
                                        : "No such data found"
                                    }
                                </div>
                            )
                        })
                        : ""
                }
            </div>


            <Footer />
        </div>

    )
}

export default Home;
