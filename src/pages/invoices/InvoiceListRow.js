import React from "react";
import { Badge } from "react-bootstrap";
import { notBolloMax } from "../../configs/Config";

const InvoiceListRow = ({onClick, invoice}) => {
    const client = invoice.client
    //const n = parseInt(invoice.id) === "NaN" ? "-" : parseInt(invoice.id)
    const n = invoice.id[0] === "D" ? "-" : "ID"
    let stat = ""
    switch (invoice.status) {
        case "D": stat = <Badge pill bg = "secondary">Bozza</Badge>
    }

    let bollo = invoice.total <= notBolloMax ? <Badge pill bg = "danger">NO</Badge> : <Badge pill bg = "success">SI</Badge>
    
    return (
        <tr style={{cursor: "pointer"}} onClick={() => {onClick(invoice.id)}} key={invoice.id}>
            <td>{n}</td>
            <td>{client.name} {client.surname}</td>
            <td>{invoice.total} €</td>
            <td>{bollo}</td>
            <td>{stat}</td>
        </tr>
    )
}

export default InvoiceListRow