type ProductProps = {
    name: string;
}

export function Product({name}: ProductProps) {
    return <div>{name}</div>
}