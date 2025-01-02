import {Product} from "./Product";

export function NewCart() {
    const products = ["Apple", "Banana", "Pear", "Grape", "Strawberry"];

    return (<div style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        margin: "2rem auto",
        alignItems: "center",
    }}>
        {products.map((product, index) => (
            <Product name={product} key={index} />
        ))}
    </div>)
}