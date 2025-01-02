import {Product} from "./Product";

export function Cart() {

    return (<div style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        margin: "2rem auto",
        alignItems: "center",
    }}>
        <Product name={"Apple"}/>
        <Product name={"Banana"}/>
        <Product name={"Pear"}/>
        <Product name={"Grape"}/>
        <Product name={"Strawberry"}/>
    </div>)
}