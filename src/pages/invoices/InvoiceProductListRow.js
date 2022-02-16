import { Button } from "react-bootstrap"

const InvoiceProductListRow = ({product, delProduct}) => {
    return (
        <tr>
            <td>{product.product.productName}</td>
            <td>{product.product.productPrice} €</td>
            <td>{product.quantity}</td>
            <td>{product.price} €</td>
            <td>{product.total} €</td>
            <td><Button onClick = {() => delProduct(product)}>Delete</Button></td>
        </tr>
    )
} 

export default InvoiceProductListRow