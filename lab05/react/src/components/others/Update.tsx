import {useState} from "react";

export function Update() {
    const [product, setProduct] = useState({
        name: "Tomato",
        price: 50
    })
    return (
        <div>
            <div>{product.name} costs {product.price} now.</div>
            <button
                onClick={() => {
                setProduct(prevProduct => ({ ...prevProduct, price: 100 }))
                }
            }>
                Change price.
            </button>
        </div>
    )
}