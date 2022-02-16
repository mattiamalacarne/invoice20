import React from "react";

const ProductListRow = ({onClick, product}) => {
    return (
        <tr style={{cursor: "pointer"}} onClick={() => {onClick(product)}} key={product.id}>
            <td>{product.productName}</td>
            <td>{product.productPrice} €</td>
            <td>{product.productDesc}</td>
        </tr>
    )
}

export default ProductListRow