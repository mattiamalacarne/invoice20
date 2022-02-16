import React from "react";

const ClientListRow = ({onClick, client}) => {
    return (
        <tr style={{cursor: "pointer"}} onClick={() => {onClick(client)}} key={client.id}>
            <td>{client.name} {client.surname}</td>
            <td>{client.ragSociale}</td>
            <td>{client.mail}</td>
            <td>{client.piva}</td>
        </tr>
    )
}

export default ClientListRow