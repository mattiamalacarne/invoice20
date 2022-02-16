import React from "react";

const InvoiceListRow = ({onClick, invoice}) => {
    return (
        <tr style={{cursor: "pointer"}} onClick={() => {onClick(invoice.id)}} key={invoice.id}>
            <td>{invoice.number}</td>
            <td>{invoice.client}</td>
            <td>{invoice.value} €</td>
            <td>{invoice.bollo}</td>
            <td>{invoice.status}</td>
        </tr>
    )
}

export default InvoiceListRow