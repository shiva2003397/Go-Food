import React, { Children } from "react";
import { useContext } from "react";
import { useReducer } from "react";
import { createContext } from "react";


//Creating the context API
const CartStateContext = createContext();
const CartDispatchContext = createContext();

function reducer(state, action) {
    switch (action.type) {
        case "ADD":
            return [...state, { id: action.id, name: action.name, price: action.price, size: action.size, qty: action.qty, img: action.img }];
        case "REMOVE":
            let newArr = [...state]
            newArr.splice(action.index, 1)
            return newArr;
        case "UPDATE":
            let arr = [...state]
            arr.find((food, index) => {
                if (food.id === action.id) {
                    // console.log(food.qty, parseInt(action.qty), action.price + food.price)
                    if(food.size === action.size) {
                        let x = parseInt(action.qty);
                        let y = parseInt(food.qty);
                        arr[index] = { ...food, qty: x + y , price: action.price + food.price }
                    }
                }
            })
            return arr
        case "DROP" :
            return []
        default:
            console.log("Error in reducer");
    }
}

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, []);

    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);